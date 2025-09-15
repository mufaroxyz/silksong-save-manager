import { useEventListener } from "runed";
import {
	analyzeSaveFileData,
	decryptedDataToText,
	decryptSaveFileStreaming,
	isWasmSupported,
	validateSaveFile,
	WasmError,
} from "./decrypt";
import { appState } from "./state.svelte";
import { useGameCompletionCounter } from "./utils/completion-counters.svelte";

interface FileInfo {
	size: string;
	hasIV: boolean;
	estimatedDecryptedSize?: string;
}

export function useSaveLoader() {
	const state = $state({
		isDecrypting: false,
		decryptedData: null as Uint8Array | null,
		error: null as string | null,
		progress: 0,
		fileInfo: null as FileInfo | null,
		decryptedText: null as string | null,
		analysisResult: null as any,
	});

	function reset() {
		state.isDecrypting = false;
		state.error = null;
		state.progress = 0;
		state.decryptedData = null;
		state.decryptedText = null;
		state.fileInfo = null;
		state.analysisResult = null;
	}

	function bindToInput(inputRef: HTMLInputElement) {
		useEventListener(inputRef, "change", async (event) => {
			const input = event.target as HTMLInputElement;
			const file = input.files?.[0];

			if (!file) return;
			if (!isWasmSupported()) {
				state.error = "WebAssembly not supported in this browser.";
				return;
			}

			state.isDecrypting = true;
			state.error = null;
			state.progress = 0;
			state.decryptedData = null;
			state.decryptedText = "";
			state.fileInfo = null;
			state.analysisResult = null;

			try {
				const validation = await validateSaveFile(file);
				if (!validation.isValid) {
					state.error = validation.error || "Invalid or corrupted save file.";
					return;
				}

				state.fileInfo = validation.info as FileInfo;

				const fileData = new Uint8Array(await file.arrayBuffer());
				state.analysisResult = await analyzeSaveFileData(fileData);

				state.decryptedData = await decryptSaveFileStreaming(file, (p) => {
					state.progress = Math.round(p * 100);
				});

				state.decryptedText = decryptedDataToText(state.decryptedData);
			} catch (err) {
				if (err instanceof WasmError) {
					state.error = err.message;
				} else {
					state.error =
						err instanceof Error ? err.message : "Failed to decrypt save file.";
				}
			} finally {
				state.isDecrypting = false;
				state.progress = 0;

				const saveFileData = state.decryptedData
					? (() => {
							try {
								return JSON.parse(decryptedDataToText(state.decryptedData));
							} catch {
								return null;
							}
						})()
					: null;

				appState.loadedSaveFile = saveFileData?.playerData;
				console.log("APPSTATE:", appState);
				console.log(
					"completioncounter",
					useGameCompletionCounter(appState.loadedSaveFile!),
				);
				// TODO: finish functionality
			}
		});
	}

	return {
		state,
		bindToInput,
		reset,
	};
}
