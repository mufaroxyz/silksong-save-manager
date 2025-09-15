import type { GameSave } from "./types";

export const appState = $state({
	loadedSaveFile: null as GameSave | null,
});
