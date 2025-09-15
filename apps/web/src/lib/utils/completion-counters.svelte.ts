import type { PlayerData, ToolCrest, ToolCrestsDataNamedData, ToolItem, ToolItemsDataNamedData } from "@save-manager/typegen";

const SKILL_PROPERTIES = [
	"hasNeedolin",
	"hasDash",
	"hasWalljump",
	"hasHarpoonDash",
	"hasSuperJump",
	"hasChargeSlash",
	"HasBoundCrestUpgrader",
] as const satisfies readonly (keyof PlayerData)[];

type SkillProperty = (typeof SKILL_PROPERTIES)[number];
type SkillsCounterResult = Record<SkillProperty, boolean>;

function skillsCounter(playerData: PlayerData): SkillsCounterResult {
	return Object.fromEntries(
		SKILL_PROPERTIES.map((prop) => [prop, Boolean(playerData[prop])]),
	) as SkillsCounterResult;
}

function computedCompletionValues(playerData: PlayerData) {
	return {
		masks: Math.max(0, (playerData.maxHealthBase ?? 5) - 5),
		silkMax: Math.max(0, (playerData.silkMax ?? 5) - 5),
	};
}

// Token: 0x06003613 RID: 13843 RVA: 0x000EE418
function getUnlockedTools(playerData: PlayerData): Array<ToolItemsDataNamedData> {
	return playerData.Tools.savedData.filter(tool => tool.Data.IsUnlocked && !tool.Data.IsHidden);
}

function getUnlockedCrests(playerData: PlayerData): Array<ToolCrestsDataNamedData> {
	return playerData.ToolEquips.savedData.filter(crest => crest.Data.IsUnlocked);
}

// TODO: Reverse engineer all tools, all crests, etc. etc.
export function useGameCompletionCounter(playerData: PlayerData) {
	const skills = skillsCounter(playerData);
	const computed = computedCompletionValues(playerData);
	const unlockedTools = getUnlockedTools(playerData);
	const unlockedCrests = getUnlockedCrests(playerData);

	return {
		...skills,
		...computed,
		unlockedTools,
		unlockedCrests,
	};
}
