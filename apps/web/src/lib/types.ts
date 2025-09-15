import type { PlayerData, SceneData } from "@save-manager/typegen";
import type { useGameCompletionCounter } from "./utils/completion-counters.svelte";

export type GameSave = {
  playerData: PlayerData;
  sceneData: SceneData;
}

