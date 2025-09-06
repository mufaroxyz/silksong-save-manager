import type {
	analyzeSaveFile,
	decryptSaveData,
	getSaveFileInfo,
	isValidSaveFile,
	WasmSaveDecryptor,
} from "@save-manager/decrypt-wasm";

interface WasmModule {
	WasmSaveDecryptor: {
		new (key: Uint8Array): WasmSaveDecryptor;
		withDefaultKey(): WasmSaveDecryptor;
	};
	analyzeSaveFile: typeof analyzeSaveFile;
	decryptSaveData: typeof decryptSaveData;
	isValidSaveFile: typeof isValidSaveFile;
	getSaveFileInfo: typeof getSaveFileInfo;
	default: () => Promise<unknown>;
}

let wasmModule: WasmModule | null = null;
let wasmInitialized = false;

async function loadWasmOptimized() {
	if (typeof window !== "undefined") {
		// Browser: Use dynamic import with streaming compilation
		try {
			const wasmModule = await import("@save-manager/decrypt-wasm");
			await wasmModule.default();
			return wasmModule;
		} catch (error) {
			console.error("Failed to load WASM module:", error);
			throw error;
		}
	}

	// Fallback for SSR
	return await import("@save-manager/decrypt-wasm");
}

export async function initWasm() {
	if (!wasmInitialized) {
		try {
			wasmModule = await loadWasmOptimized();
			wasmInitialized = true;
			console.log("WASM module initialized successfully");
		} catch (error) {
			console.error("Failed to initialize WASM:", error);
			throw error;
		}
	}
}

export function isWasmSupported(): boolean {
	return typeof WebAssembly !== "undefined";
}

export function isWasmInitialized(): boolean {
	return wasmInitialized;
}

export async function analyzeSaveFileData(data: Uint8Array): Promise<string> {
	await initWasm();

	if (!wasmModule) {
		throw new Error("WASM module not initialized");
	}

	try {
		return wasmModule.analyzeSaveFile(data);
	} catch (error) {
		console.error("Error analyzing save file:", error);
		return `Analysis failed: ${error}`;
	}
}

export async function decryptSaveFile(
	fileData: Uint8Array,
	key?: Uint8Array,
): Promise<Uint8Array> {
	await initWasm();

	if (!wasmModule) {
		throw new Error("WASM module not initialized");
	}

	console.log(`Attempting to decrypt file of size: ${fileData.length} bytes`);
	console.log(
		"First 32 bytes:",
		Array.from(fileData.slice(0, 32))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join(" "),
	);

	try {
		if (key) {
			const decryptor = new wasmModule.WasmSaveDecryptor(key);
			return decryptor.decryptSaveFile(fileData);
		}

		return wasmModule.decryptSaveData(fileData);
	} catch (error) {
		console.error("Decryption failed:", error);
		throw new Error(`Decryption failed: ${error}`);
	}
}

// Use streaming decryption for large files (1MB+)
export async function decryptSaveFileStreaming(
	file: File,
	onProgress?: (progress: number) => void,
	key?: Uint8Array,
): Promise<Uint8Array> {
	await initWasm();

	if (!wasmModule) {
		throw new Error("WASM module not initialized");
	}

	const CHUNK_SIZE = 1024 * 1024;

	try {
		// For large files, read in chunks to avoid memory issues
		if (file.size > CHUNK_SIZE) {
			const fileData = new Uint8Array(await file.arrayBuffer());

			const decryptor = key
				? new wasmModule.WasmSaveDecryptor(key)
				: wasmModule.WasmSaveDecryptor.withDefaultKey();

			const progressCallback = (progress: number) => {
				onProgress?.(progress);
			};

			return decryptor.decryptStream(fileData, CHUNK_SIZE, progressCallback);
		}

		// For smaller files, use simple decryption
		const fileData = new Uint8Array(await file.arrayBuffer());
		const result = await decryptSaveFile(fileData, key);
		onProgress?.(1.0);
		return result;
	} catch (error) {
		console.error("Streaming decryption failed:", error);
		throw new Error(`Streaming decryption failed: ${error}`);
	}
}

export async function validateSaveFile(
	file: File,
): Promise<{ isValid: boolean; info?: unknown; error?: string }> {
	if (!isWasmSupported()) {
		return { isValid: false, error: "WebAssembly not supported" };
	}

	await initWasm();

	if (!wasmModule) {
		return { isValid: false, error: "WASM module not initialized" };
	}

	try {
		const data = new Uint8Array(await file.arrayBuffer());
		const isValid = wasmModule.isValidSaveFile(data);

		if (isValid) {
			const info = wasmModule.getSaveFileInfo(data);
			return { isValid: true, info };
		}

		return { isValid: false, error: "Invalid save file format" };
	} catch (error) {
		return { isValid: false, error: `Validation failed: ${error}` };
	}
}

export function downloadDecryptedSave(
	data: Uint8Array,
	filename = "decrypted_save.json",
) {
	try {
		const blob = new Blob([new Uint8Array(data)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Failed to download file:", error);
		throw new Error(`Download failed: ${error}`);
	}
}

export function decryptedDataToText(data: Uint8Array): string {
	try {
		const decoder = new TextDecoder("utf-8");
		return decoder.decode(data);
	} catch (error) {
		console.error("Failed to decode data as text:", error);
		// Return hex if UTF-8 decoding fails
		return Array.from(data)
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join(" ");
	}
}

export class WasmError extends Error {
	constructor(
		message: string,
		public readonly originalError?: unknown,
	) {
		super(message);
		this.name = "WasmError";
	}
}

export function handleWasmError(error: unknown): WasmError {
	if (error instanceof WasmError) {
		return error;
	}

	const message = error instanceof Error ? error.message : String(error);
	return new WasmError(`WASM operation failed: ${message}`, error);
}
