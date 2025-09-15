<script lang="ts">
	import { onMount } from "svelte";
	import { downloadDecryptedSave } from "../lib/decrypt";
	import { useSaveLoader } from "../lib/save-loader.svelte";

	let fileInput: HTMLInputElement;
	let saveLoader = useSaveLoader();

	onMount(() => {
		saveLoader.bindToInput(fileInput);
	});
</script>

<div class="container mx-auto max-w-3xl px-4 py-2">
	<div class="grid gap-6">
		<div class="border border-neutral-800 rounded-lg p-6 bg-neutral-900">
			<h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
				Decrypt Save File
			</h2>

			<div class="space-y-4">
				<input
					bind:this={fileInput}
					type="file"
					accept=".dat,.save,.json"
					disabled={saveLoader.state.isDecrypting}
					class="block w-full text-sm text-neutral-400
					       file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
					       file:bg-neutral-800 file:text-neutral-100 hover:file:bg-neutral-700
					       disabled:opacity-50"
				/>

				{#if saveLoader.state.isDecrypting}
					<div class="space-y-2">
						<div class="flex items-center gap-2 text-blue-400">
							<div
								class="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"
							></div>
							Decrypting save file...
						</div>
						{#if saveLoader.state.progress > 0}
							<div class="w-full bg-neutral-800 rounded-full h-2">
								<div
									class="bg-blue-600 h-2 rounded-full transition-all duration-300"
									style="width: {saveLoader.state.progress}%"
								></div>
							</div>
							<div class="text-sm text-neutral-400">
								{saveLoader.state.progress}% complete
							</div>
						{/if}
					</div>
				{/if}

				{#if saveLoader.state.fileInfo}
					<div class="bg-neutral-800 rounded-lg p-4 space-y-2">
						<h3 class="text-sm font-semibold text-neutral-300">
							File Information
						</h3>
						<div class="text-sm text-neutral-400 space-y-1">
							<div>Size: {formatFileSize(+saveLoader.state.fileInfo.size)}</div>
							<div>
								Has IV: {saveLoader.state.fileInfo.hasIV ? "Yes" : "No"}
							</div>
						</div>
					</div>
				{/if}

				{#if saveLoader.state.analysisResult}
					<div class="bg-neutral-800 rounded-lg p-4 space-y-2">
						<h3 class="text-sm font-semibold text-neutral-300">
							File Analysis
						</h3>
						<pre
							class="text-xs text-neutral-400 whitespace-pre-wrap font-mono">{saveLoader
								.state.analysisResult}</pre>
					</div>
				{/if}

				{#if saveLoader.state.error}
					<div class="bg-red-900/20 border border-red-700 rounded-lg p-4">
						<div class="flex items-center gap-2 text-red-400">
							Error: {saveLoader.state.error}
						</div>
					</div>
				{/if}

				{#if saveLoader.state.decryptedData}
					<div
						class="bg-green-900/20 border border-green-700 rounded-lg p-4 space-y-4"
					>
						<div class="flex items-center gap-2 text-green-400 mb-2">
							Save file decrypted successfully!
						</div>

						<div class="space-y-2">
							<div class="text-sm text-neutral-400">
								Decrypted size: {formatFileSize(
									saveLoader.state.decryptedData.length,
								)}
							</div>

							<button
								onclick={() =>
									downloadDecryptedSave(
										saveLoader.state.decryptedData!,
										"decrypted_save.json",
									)}
								class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors
								       flex items-center gap-2"
							>
								Download Decrypted File
							</button>
						</div>

						{#if saveLoader.state.decryptedText}
							<div class="space-y-2">
								<h3 class="text-sm font-semibold text-neutral-300">
									Preview (first 200 characters):
								</h3>
								<pre
									class="bg-neutral-800 rounded p-3 text-xs overflow-x-auto text-neutral-300 max-h-40 overflow-y-auto">
									{saveLoader.state.decryptedText.substring(0, 200)}
									{saveLoader.state.decryptedText.length > 200 ? "..." : ""}
								</pre>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
