import { crests, tools } from "@save-manager/game-data";
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

interface UpgradeChain {
	base: string;
	variants: string[];
	rule: "prefer_latest" | "prefer_earliest" | "include_all" | "choose_unlocked";
	condition?: (playerData: PlayerData) => boolean;
}

interface MutuallyExclusive {
	group: string;
	items: string[];
	rule: "choose_unlocked" | "prefer_first" | "prefer_last";
	condition?: (playerData: PlayerData) => boolean;
}


// TODO: find an optimal way to handle silk snare and extractor which exist but do not count towards completion
const TOOL_RULES = {
	upgradeChains: [
		{
			base: "Curve Claws",
			variants: ["Curve Claws", "Curve Claws Upgraded"],
			rule: "choose_unlocked" as const,
		},
		{
			base: "Dazzle Bind",
			variants: ["Dazzle Bind", "Dazzle Bind Upgraded"],
			rule: "choose_unlocked" as const,
		},
		{
			base: "Mosscreep Tool",
			variants: ["Mosscreep Tool 1", "Mosscreep Tool 2"],
			rule: "choose_unlocked" as const,
		},
	] satisfies UpgradeChain[],

	mutuallyExclusive: [
		{
			group: "webshot_variants",
			items: ["WebShot Architect", "WebShot Forge", "WebShot Weaver"],
			rule: "choose_unlocked" as const,
		},
		{
			group: "wormways_corpse",
			items: ["Dead Mans Purse", "Shell Satchel"],
			rule: "choose_unlocked" as const,
		},
	] satisfies MutuallyExclusive[],

	filters: ["Dustpilo"]
};

const CREST_RULES = {
	upgradeChains: [
		{
			base: "Hunter",
			variants: ["Hunter", "Hunter_v2", "Hunter_v3"],
			rule: "prefer_latest" as const,
		},
	] satisfies UpgradeChain[],

	mutuallyExclusive: [
	] satisfies MutuallyExclusive[],
};

function detectUpgradeChains(items: Record<string, any>): UpgradeChain[] {
	const chains: UpgradeChain[] = [];
	const processed = new Set<string>();

	for (const itemName of Object.keys(items)) {
		if (processed.has(itemName)) continue;

		// _v2, _v3 pattern
		const versionMatch = itemName.match(/^(.+?)(_v\d+)?$/);
		if (versionMatch) {
			const baseName = versionMatch[1];
			const variants = Object.keys(items)
				.filter((name) => name === baseName || name.startsWith(`${baseName}_v`))
				.sort((a, b) => {
					const aVersion = a.match(/_v(\d+)$/)?.[1];
					const bVersion = b.match(/_v(\d+)$/)?.[1];
					if (!aVersion && !bVersion) return 0;
					if (!aVersion) return -1;
					if (!bVersion) return 1;
					return Number.parseInt(aVersion) - Number.parseInt(bVersion);
				});

			if (variants.length > 1) {
				chains.push({
					base: baseName,
					variants,
					rule: "prefer_latest",
				});
				variants.forEach((v) => { processed.add(v); });
			}
		}

		// "Name Upgraded" pattern
		if (itemName.endsWith(" Upgraded")) {
			const baseName = itemName.replace(" Upgraded", "");
			if (items[baseName] && !processed.has(baseName) && !processed.has(itemName)) {
				chains.push({
					base: baseName,
					variants: [baseName, itemName],
					rule: "prefer_latest",
				});
				processed.add(baseName);
				processed.add(itemName);
			}
		}
	}

	return chains;
}

function applyItemRules<T extends Record<string, any>>(
	items: T,
	rules: { upgradeChains?: UpgradeChain[]; mutuallyExclusive?: MutuallyExclusive[], filters?: string[] },
	unlockedItems: string[],
	playerData: PlayerData
): T {
	const result = { ...items };
	const processedItems = new Set<string>();


	if (rules.filters && rules.filters.length > 0) {
		for (const filter of rules.filters) {
			for (const itemName of Object.keys(result)) {
				if (itemName.includes(filter)) {
					delete result[itemName as keyof T];
					processedItems.add(itemName);
				}
			}
		}
	}

	let upgradeChains = rules.upgradeChains || [];
	if (upgradeChains.length === 0) {
		upgradeChains = detectUpgradeChains(items);
	}

	for (const chain of upgradeChains) {
		if (chain.condition && !chain.condition(playerData)) {
			continue;
		}

		const availableVariants = chain.variants.filter(name => items[name]);
		if (availableVariants.length === 0) continue;

		let chosen: string;
		switch (chain.rule) {
			case "choose_unlocked":
				chosen = availableVariants.find(name => unlockedItems.includes(name)) || availableVariants[0];
				break;
			case "prefer_latest":
				chosen = availableVariants[availableVariants.length - 1];
				break;
			case "prefer_earliest":
				chosen = availableVariants[0];
				break;
			case "include_all":
				continue;
			default:
				chosen = availableVariants[availableVariants.length - 1];
		}

		availableVariants.forEach(variant => {
			if (variant !== chosen) {
				delete result[variant as keyof T];
			}
			processedItems.add(variant);
		});
	}

	for (const rule of rules.mutuallyExclusive || []) {
		if (rule.condition && !rule.condition(playerData)) {
			continue;
		}

		const availableItems = rule.items.filter(name => items[name] && !processedItems.has(name));
		if (availableItems.length === 0) continue;

		let chosen: string;
		switch (rule.rule) {
			case "choose_unlocked":
				chosen = availableItems.find(name => unlockedItems.includes(name)) || availableItems[0];
				break;
			case "prefer_first":
				chosen = availableItems[0];
				break;
			case "prefer_last":
				chosen = availableItems[availableItems.length - 1];
				break;
			default:
				chosen = availableItems[0];
		}

		availableItems.forEach(item => {
			if (item !== chosen) {
				delete result[item as keyof T];
			}
		});
	}

	return result;
}

function skillsCounter(playerData: PlayerData): SkillsCounterResult {
	return Object.fromEntries(
		SKILL_PROPERTIES.map((prop) => [prop, Boolean(playerData[prop])]),
	) as SkillsCounterResult;
}

function computedCompletionValues(playerData: PlayerData) {
	return {
		masks: Math.max(0, (playerData.maxHealthBase ?? 5) - 5),
		silkMax: Math.max(0, (playerData.silkMax ?? 9) - 9),
	};
}

function getUnlockedTools(playerData: PlayerData): Array<ToolItemsDataNamedData> {
	return playerData.Tools.savedData.filter(tool => tool.Data.IsUnlocked && !tool.Data.IsHidden);
}

function getUnlockedCrests(playerData: PlayerData): Array<ToolCrestsDataNamedData> {
	return playerData.ToolEquips.savedData.filter(crest => crest.Data.IsUnlocked);
}

interface UnlockStatus {
	name: string;
	unlocked: boolean;
}

function getAllTools(playerData: PlayerData): Array<UnlockStatus> {
	const unlockedTools = getUnlockedTools(playerData);
	const unlockedToolNames = unlockedTools.map(tool => tool.Name);

	const filteredTools = applyItemRules(tools, TOOL_RULES, unlockedToolNames, playerData);

	return Object.entries(filteredTools).map<UnlockStatus>(([m_Name]) => {
		const toolInInventory = unlockedTools.find(uTool => uTool.Name === m_Name);
		if (toolInInventory) {
			return { name: toolInInventory.Name, unlocked: toolInInventory.Data.IsUnlocked };
		}

		return { name: m_Name, unlocked: false };
	});
}

function getAllCrests(playerData: PlayerData): Array<UnlockStatus> {
	const unlockedCrests = getUnlockedCrests(playerData);
	const unlockedCrestNames = unlockedCrests.map(crest => crest.Name);

	const filteredCrests = applyItemRules(crests, CREST_RULES, unlockedCrestNames, playerData);

	return Object.entries(filteredCrests).map<UnlockStatus>(([m_Name]) => {
		const crestInInventory = unlockedCrests.find(uCrest => uCrest.Name === m_Name);
		if (crestInInventory) {
			return { name: crestInInventory.Name, unlocked: crestInInventory.Data.IsUnlocked };
		}

		return { name: m_Name, unlocked: false };
	});
}

function hasWhiteFlower(playerData: PlayerData): boolean {
	return playerData.Collectables.savedData.some(collectable =>
		collectable.Name === "White Flower" && collectable.Data.Amount > 0
	);
}

export function useGameCompletionCounter(playerData: PlayerData) {
	const skills = skillsCounter(playerData);
	const computed = computedCompletionValues(playerData);
	const tools = getAllTools(playerData);
	const crests = getAllCrests(playerData);
	const _hasWhiteFlower = hasWhiteFlower(playerData);

	return {
		...skills,
		...computed,
		nailUpgrades: playerData.nailUpgrades,
		toolKitUpgrades: playerData.ToolKitUpgrades,
		toolPouchUpgrades: playerData.ToolPouchUpgrades,
		silkRegenMax: playerData.silkRegenMax,
		tools,
		crests,
		hasWhiteFlower: _hasWhiteFlower,
	};
}