import type { PlayerData } from "@save-manager/typegen";

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

export function useGameCompletionCounter(playerData: PlayerData) {
	const skills = skillsCounter(playerData);
	const computed = computedCompletionValues(playerData);

	return {
		...skills,
		...computed,
	};
}
