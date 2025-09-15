import { getContext } from "svelte";
import type { useGameCompletionCounter } from "../../lib/utils/completion-counters.svelte";
import type { GameSave } from "../../lib/types";

export const ANALYSIS_CONTEXT_KEY = Symbol("analysis");

export interface AnalysisLayoutProps {
  gameCompletionCount: ReturnType<typeof useGameCompletionCounter>;
  saveData: GameSave;
}

export const useAnalysis = () => getContext<AnalysisLayoutProps>(ANALYSIS_CONTEXT_KEY);
