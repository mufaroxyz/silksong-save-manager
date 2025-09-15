<script lang="ts">
  import type { PlayerData, SceneData } from "@save-manager/typegen";
  import { useGameCompletionCounter } from "../../lib/utils/completion-counters.svelte";
  import { appState } from "../../lib/state.svelte";
  import { watch } from "runed";
  import { setContext } from "svelte";
  import {
    ANALYSIS_CONTEXT_KEY,
    type AnalysisLayoutProps,
  } from "./shared.svelte";

  const { children } = $props();

  let loadedContext = $derived.by(() => {
    if (
      appState.loadedSaveFile?.playerData &&
      appState.loadedSaveFile?.sceneData
    ) {
      const context = {
        gameCompletionCount: useGameCompletionCounter(
          appState.loadedSaveFile.playerData as PlayerData,
        ),
        saveData: appState.loadedSaveFile,
      } satisfies AnalysisLayoutProps;

      setContext<AnalysisLayoutProps>(ANALYSIS_CONTEXT_KEY, context);
      console.log("Set analysis context", context);

      return context;
    }

    return null;
  });
</script>

{#if loadedContext}
  {@render children()}
{:else}
  <div class="container mx-auto max-w-3xl px-4 py-2">
    <div class="border border-neutral-800 rounded-lg p-6 bg-neutral-900">
      <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
        No Save Loaded
      </h2>
    </div>
  </div>
{/if}
