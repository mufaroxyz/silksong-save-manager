import type { PlayerData } from "@save-manager/typegen";

// export const loadedSaveFile = $state<PlayerData | null>(null);

// TODO: Include the union type of PlayerData and SceneData if needed
export const appState = $state({
	loadedSaveFile: null as PlayerData | null,
});
