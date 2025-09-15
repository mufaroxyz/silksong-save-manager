export interface BossSequenceControllerBossSequenceData {
    bindings: number;
    bossSequenceName: string;
    knightDamaged: boolean;
    playerData: string;
    previousCompletion: BossSequenceDoorCompletion;
    previousEquippedCharms: number[];
    timer: number;
    wasOvercharmed: boolean;
}


export interface BossSequenceControllerChallengeBindings {
    value__: number;
}


export interface BossSequenceDoorCompletion {
    allBindings: boolean;
    boundCharms: boolean;
    boundNail: boolean;
    boundShell: boolean;
    boundSoul: boolean;
    canUnlock: boolean;
    completed: boolean;
    noHits: boolean;
    unlocked: boolean;
    viewedBossSceneCompletions: string[];
}


export interface CollectableItemsData {
    savedData: CollectableItemsDataNamedData[];
}


export interface CollectableItemsDataData {
    Amount: number;
    AmountWhileHidden: number;
    IsSeenMask: number;
}


export interface CollectableItemsDataNamedData {
    Data: CollectableItemsDataData;
    Name: string;
}


export interface CollectableMementosData {
    savedData: CollectableMementosDataNamedData[];
}


export interface CollectableMementosDataData {
    HasSeenInRelicBoard: boolean;
    IsDeposited: boolean;
}


export interface CollectableMementosDataNamedData {
    Data: CollectableMementosDataData;
    Name: string;
}


export interface CollectableRelicsData {
    savedData: CollectableRelicsDataNamedData[];
}


export interface CollectableRelicsDataData {
    HasSeenInRelicBoard: boolean;
    IsCollected: boolean;
    IsDeposited: boolean;
}


export interface CollectableRelicsDataNamedData {
    Data: CollectableRelicsDataData;
    Name: string;
}


export interface CollectionGramaphonePlayingInfo {
    RelicName: string;
    StartTime: number;
}


export interface EnemyJournalKillData {
    list: EnemyJournalKillDataNamedKillData[];
}


export interface EnemyJournalKillDataKillData {
    HasBeenSeen: boolean;
    Kills: number;
}


export interface EnemyJournalKillDataNamedKillData {
    Name: string;
    Record: EnemyJournalKillDataKillData;
}


export interface FloatingCrestSlotsData {
    savedData: FloatingCrestSlotsDataNamedData[];
}


export interface FloatingCrestSlotsDataNamedData {
    Data: ToolCrestsDataSlotData;
    Name: string;
}


export interface BellhomePaintColours {
    value__: number;
}


export interface BelltownHouseStates {
    value__: number;
}


export interface CaravanTroupeLocations {
    value__: number;
}


export interface EnvironmentTypes {
    value__: number;
}


export interface ExtraRestZones {
    value__: number;
}


export interface FastTravelLocations {
    value__: number;
}


export interface GreenPrinceLocations {
    value__: number;
}


export interface HeroDeathCocoonTypes {
    value__: number;
}


export interface MapZone {
    value__: number;
}


export interface NPCEncounterState {
    value__: number;
}


export interface PermadeathModes {
    value__: number;
}


export interface SethNpcLocations {
    value__: number;
}


export interface HazardRespawnMarkerFacingDirection {
    value__: number;
}


export interface HeroItemsState {
    DoFullHeal: boolean;
    Health: number;
    IsRecorded: boolean;
    Rosaries: number;
    ShellShards: number;
    Silk: number;
}


export interface MateriumItemsData {
    savedData: MateriumItemsDataNamedData[];
}


export interface MateriumItemsDataData {
    HasSeenInRelicBoard: boolean;
    IsCollected: boolean;
}


export interface MateriumItemsDataNamedData {
    Data: MateriumItemsDataData;
    Name: string;
}


export interface PlayerData {
    AbyssBellSeenDocks: boolean;
    AbyssBellSeenDocksRepaired: boolean;
    act2Started: boolean;
    act3_enclaveWakeSceneCompleted: boolean;
    act3_wokeUp: boolean;
    act3MapUpdated: boolean;
    activatedStepsUpperBellbench: boolean;
    allowVampireGnatInAltLoc: boolean;
    ant02GuardDefeated: boolean;
    ant04_battleCompleted: boolean;
    ant04_enemiesReturn: boolean;
    ant21_ExtraBattleAdded: boolean;
    ant21_InitBattleCompleted: boolean;
    antBenchTrapDefused: boolean;
    antMerchantKilled: boolean;
    antMerchantShortcut: boolean;
    antQueenNPC_deepMelodyConvo: boolean;
    arborium_08_oneWay: boolean;
    arborium_09_oneWay: boolean;
    ArchitectLeft: boolean;
    ArchitectMelodyGainSeen: boolean;
    ArchitectMelodyReturnQueued: boolean;
    ArchitectMelodyReturnSeen: boolean;
    ArchitectMentionedCogHeart: boolean;
    ArchitectMentionedMelody: boolean;
    ArchitectMentionedWebShot: boolean;
    ArchitectTalkedCrest: boolean;
    ArchitectWillLeave: boolean;
    aspid_04_gate: boolean;
    aspid_04b_battleCompleted: boolean;
    aspid_04b_wildlifeReturned: boolean;
    aspid_16_oneway: boolean;
    aspid_16_relic: boolean;
    aspid06_battleComplete: boolean;
    aspid06_cloverStagsReturned: boolean;
    aspid07_cloverStagsReturned: boolean;
    atBench: boolean;
    attunement: number;
    attunementLevel: number;
    BallowGivenKey: boolean;
    BallowInSauna: boolean;
    BallowLeftSauna: boolean;
    BallowMovedToDivingBell: boolean;
    BallowSeenInSauna: boolean;
    BallowTalkedPostRepair: boolean;
    BallowTalkedPostRepairGramaphone: boolean;
    bankOpened: boolean;
    basementAntWall: boolean;
    beamDamage: number;
    bellCentipedeAppeared: boolean;
    bellShrineBellhart: boolean;
    bellShrineBoneForest: boolean;
    bellShrineEnclave: boolean;
    bellShrineGreymoor: boolean;
    bellShrineShellwood: boolean;
    bellShrineWilds: boolean;
    BelltownBagpipersOfferedQuest: boolean;
    belltownBasementBreakWall: boolean;
    BelltownCouriersBrokenDlg: boolean;
    BelltownCouriersBrokenDlgQueued: boolean;
    BelltownCouriersFirstBeginDlg: boolean;
    BelltownCouriersGenericQuests: string[];
    BelltownCouriersGourmandHint: boolean;
    BelltownCouriersMet: boolean;
    BelltownCouriersMetAct3: boolean;
    BelltownCouriersNotPurchasedDlg: boolean;
    BelltownCouriersPurchasedDlgBitmask: number;
    BelltownCouriersTalkedCursed: boolean;
    BelltownCouriersTalkedGourmand: boolean;
    belltownCrowd: number;
    belltownCrowdsReady: boolean;
    BelltownDoctorConvo: number;
    BelltownDoctorCuredCurse: boolean;
    BelltownDoctorFixOffered: boolean;
    BelltownDoctorLifebloodSpoke: boolean;
    BelltownDoctorMaggotSpoke: boolean;
    BelltownDoctorQuestOffered: boolean;
    BelltownFurnishingDesk: boolean;
    BelltownFurnishingFairyLights: boolean;
    BelltownFurnishingGramaphone: boolean;
    BelltownFurnishingSpa: boolean;
    BelltownFurnishingSpaAvailable: boolean;
    BelltownGreetCursedConvo: boolean;
    BelltownGreeterConvo: number;
    BelltownGreeterFurnishingDlg: boolean;
    BelltownGreeterHouseFullDlg: boolean;
    BelltownGreeterHouseHalfDlg: boolean;
    BelltownGreeterMetTimePassed: boolean;
    BelltownGreeterTwistedBudDlg: boolean;
    BelltownHermitConvoCooldown: boolean;
    BelltownHermitCursedConvo: boolean;
    BelltownHermitEnslavedConvo: number;
    BelltownHermitMet: boolean;
    BelltownHermitSavedConvo: number;
    BelltownHouseColour: number;
    BelltownHousePaintComplete: boolean;
    BelltownHousePlayingInfo: CollectionGramaphonePlayingInfo;
    BelltownHouseState: number;
    BelltownHouseUnlocked: boolean;
    BelltownRelicDealerCylinderConvo: boolean;
    BelltownRelicDealerGaveRelic: boolean;
    BelltownRelicDealerOutroConvo: boolean;
    BelltownRelicDealerOutroConvoAllComplete: boolean;
    BelltownShopkeepAct3Convo: boolean;
    BelltownShopkeepCourierConvo1Accepted: boolean;
    BelltownShopkeepCourierConvo1Completed: boolean;
    BelltownShopkeepCursedConvo: boolean;
    BelltownShopkeepHouseConvo: boolean;
    betaEnd: boolean;
    bindCutscenePlayed: boolean;
    blackThreadWorld: boolean;
    BlueAssistantBloodCount: number;
    BlueAssistantCorpseFound: boolean;
    BlueAssistantEnemyEncountered: boolean;
    BlueScientistDead: boolean;
    BlueScientistInfectedMet: boolean;
    BlueScientistInfectedSeen: boolean;
    BlueScientistMet: boolean;
    BlueScientistPreQuest2Convo: boolean;
    BlueScientistQuest2Offered: boolean;
    BlueScientistQuest3Offered: boolean;
    BlueScientistQuestOffered: boolean;
    BlueScientistSceneryPustulesGrown: boolean;
    BlueScientistTalkedCorpse: boolean;
    Bone_East_04b_ExplodeWall: boolean;
    bone01shortcutPlat: boolean;
    bone03_openedTrapdoor: boolean;
    bone03_openedTrapdoorForRockRoller: boolean;
    boneBottomAddition_RagLine: boolean;
    BonebottomBellwayPilgrimLeft: boolean;
    BonebottomBellwayPilgrimScared: boolean;
    BonebottomBellwayPilgrimState: number;
    boneBottomFuneral: boolean;
    boneBottomFuneralComplete: boolean;
    bonebottomQuestBoardFixed: boolean;
    BoneBottomShellFrag1: boolean;
    BoneBottomShopKeepLeft: boolean;
    BoneBottomShopKeepWillLeave: boolean;
    boneEast07_openedMidRoof: boolean;
    boneEastJailerClearedOut: boolean;
    boneEastJailerKilled: boolean;
    bonegraveAspidBerryCollected: boolean;
    bonegraveOpen: boolean;
    bonegravePilgrimCrowdsCanReturn: boolean;
    bonegraveRosaryPilgrimDefeated: boolean;
    BonePlazaOpened: boolean;
    bonetownAspidBerryCollected: boolean;
    bonetownCrowd: number;
    bonetownPilgrimHornedActive: boolean;
    bonetownPilgrimHornedCount: number;
    bonetownPilgrimHornedSeen: boolean;
    bonetownPilgrimRoundActive: boolean;
    bonetownPilgrimRoundCount: number;
    bonetownPilgrimRoundSeen: boolean;
    bossReturnEntryGate: string;
    bossRushMode: boolean;
    bossStatueTargetLevel: number;
    brokeConfessional: boolean;
    brokeUnderstoreFloor: boolean;
    broodMotherEyeCollected: boolean;
    CaravanHauntedBellhartConvo_TroupeLeader: boolean;
    CaravanLechAct3Convo: boolean;
    CaravanLechMet: boolean;
    CaravanLechReturnedToCaravan: boolean;
    CaravanLechSaved: boolean;
    CaravanLechSpaAcceptState: boolean;
    CaravanLechSpaAttacked: boolean;
    CaravanLechWoundedSpoken: boolean;
    CaravanPilgrimAttackComplete: boolean;
    CaravanSpiderPaidExtraBellhart: boolean;
    CaravanSpiderTargetScene: string;
    CaravanSpiderTravelDirection: number;
    CaravanTroupeLeaderCanLeaveGreymoor: boolean;
    CaravanTroupeLeaderCanLeaveJudge: boolean;
    CaravanTroupeLocation: number;
    caretakerBeastConvo: boolean;
    caretakerConvoLv1: boolean;
    caretakerConvoLv2: boolean;
    caretakerConvoLv3: boolean;
    caretakerLaceConvo: boolean;
    caretakerMerchantConvo: boolean;
    CaretakerOfferedSnareQuest: boolean;
    CaretakerSnareProgressConvo: boolean;
    caretakerSoulSnareConvo: boolean;
    CaretakerSwampSoulConvo: boolean;
    caretakerWardConvo: boolean;
    cauldronShortcutUpdraft: boolean;
    chapelClosed_beast: boolean;
    chapelClosed_reaper: boolean;
    chapelClosed_shaman: boolean;
    chapelClosed_toolmaster: boolean;
    chapelClosed_wanderer: boolean;
    chapelClosed_witch: boolean;
    churchKeeperBonegraveConvo: boolean;
    churchKeeperCursedConvo: boolean;
    churchKeeperIntro: boolean;
    ChurchKeeperLeftBasement: boolean;
    churchRhinoBlackThreadCorpse: boolean;
    churchRhinoKilled: boolean;
    citadel_encounteredFencers: boolean;
    citadelHalfwayComplete: boolean;
    citadelWoken: boolean;
    cityMerchantBridgeSaveRemeet: boolean;
    cityMerchantCanLeaveForBridge: boolean;
    cityMerchantConvo1: boolean;
    cityMerchantEnclaveConvo: boolean;
    cityMerchantInGrandForum: boolean;
    cityMerchantInGrandForumLeft: boolean;
    cityMerchantInGrandForumSeen: boolean;
    cityMerchantInLibrary03: boolean;
    cityMerchantInLibrary03Left: boolean;
    cityMerchantInLibrary03Seen: boolean;
    cityMerchantIntroduced: boolean;
    cityMerchantRecentlySeenInEnclave: boolean;
    cityMerchantSaved: boolean;
    cloakOdour_slabFly: number;
    cog7_automaton_defeated: boolean;
    cog7_automatonDestroyed: boolean;
    cog7_automatonRepairing: boolean;
    cog7_automatonRepairingComplete: boolean;
    cog7_gateOpened: boolean;
    Collectables: CollectableItemsData;
    CollectedCommonSpine: boolean;
    CollectedDockDemoKey: boolean;
    CollectedDustCageKey: boolean;
    CollectedHeartClover: boolean;
    CollectedHeartCoral: boolean;
    CollectedHeartFlower: boolean;
    CollectedHeartHunter: boolean;
    CollectedMementoGrey: boolean;
    CollectedMementoSprintmaster: boolean;
    CollectedToolMetal: boolean;
    collectedWardBossKey: boolean;
    collectedWardKey: boolean;
    collectorEggsHatched: boolean;
    completedAbyssAscent: boolean;
    completedCog10_abyssBattle: boolean;
    CompletedEndings: number;
    completedGrandStageBattle: boolean;
    completedGreymoor17Battle: boolean;
    completedLavaChallenge: boolean;
    completedLibraryAcolyteBattle: boolean;
    completedLibraryEntryBattle: boolean;
    completedMemory_beast: boolean;
    completedMemory_reaper: boolean;
    completedMemory_shaman: boolean;
    completedMemory_toolmaster: boolean;
    completedMemory_wanderer: boolean;
    completedMemory_witch: boolean;
    CompletedRedMemory: boolean;
    completedSuperJumpSequence: boolean;
    completedTutorial: boolean;
    CompletedWeaveSprintChallenge: boolean;
    CompletedWeaveSprintChallengeMax: boolean;
    completionPercentage: number;
    ConductorWeaverDlgHeard: boolean;
    ConductorWeaverDlgQueued: boolean;
    ConstructedFarsight: boolean;
    ConstructedMaterium: boolean;
    coral19_clearedOut: boolean;
    coralBridgeGuard2Stationed: boolean;
    coralDrillerSoloEnemiesReturned: boolean;
    coralDrillerSoloReady: boolean;
    coralKingHeartAppeared: boolean;
    CorrectMazeDoorsEntered: number;
    crashedIntoGreymoor: boolean;
    crashingIntoGreymoor: boolean;
    CrawbellCrawsInside: boolean;
    CrawbellCurrency: number[];
    CrawbellCurrencyCaps: number[];
    CrawbellInstalled: boolean;
    CrawbellTimer: number;
    crawl03_oneWayWall: boolean;
    creaturesReturnedToBone10: boolean;
    CrestPreUpgradeAdditional: boolean;
    CrestPreUpgradeTalked: boolean;
    CrestPurposeQueued: boolean;
    CrestTalkedPurpose: boolean;
    CrestUpgraderOfferedFinal: boolean;
    CrestUpgraderTalkedSnare: boolean;
    CrowCourtInSession: boolean;
    CrowSummonsAppearedScene: string;
    currentArea: string;
    currentBossSequence: BossSequenceControllerBossSequenceData;
    currentBossStatueCompletionKey: string;
    CurrentCrestID: string;
    currentInvPane: number;
    CurseKilledFlyBoneEast: boolean;
    CurseKilledFlyGreymoor: boolean;
    CurseKilledFlyShellwood: boolean;
    CurseKilledFlySwamp: boolean;
    date: string;
    DeclinedBartenderDrink: boolean;
    defeatedAntQueen: boolean;
    defeatedAntTrapper: boolean;
    defeatedBellBeast: boolean;
    defeatedBoneFlyerGiant: boolean;
    defeatedBoneFlyerGiantGolemScene: boolean;
    DefeatedBonetownBoss: boolean;
    defeatedBroodMother: boolean;
    defeatedCloverDancers: boolean;
    defeatedCogworkDancers: boolean;
    defeatedCoralBridgeGuard1: boolean;
    defeatedCoralBridgeGuard2: boolean;
    defeatedCoralDrillers: boolean;
    defeatedCoralDrillerSolo: boolean;
    defeatedCoralKing: boolean;
    defeatedCrowCourt: boolean;
    defeatedDockForemen: boolean;
    defeatedFirstWeaver: boolean;
    defeatedFlowerQueen: boolean;
    defeatedGreyWarrior: boolean;
    defeatedGuardBoneEast25: boolean;
    defeatedLace1: boolean;
    defeatedLaceTower: boolean;
    defeatedLastJudge: boolean;
    defeatedMossEvolver: boolean;
    defeatedMossMother: boolean;
    defeatedPhantom: boolean;
    defeatedRoachkeeperChef: boolean;
    defeatedSeth: boolean;
    defeatedShellwoodRosaryPilgrim: boolean;
    defeatedSongChevalierBoss: boolean;
    defeatedSongGolem: boolean;
    defeatedSplinterQueen: boolean;
    DefeatedSwampShaman: boolean;
    defeatedTormentedTrobbio: boolean;
    defeatedTrobbio: boolean;
    defeatedVampireGnatBoss: boolean;
    defeatedWhiteCloverstag: boolean;
    defeatedWispPyreEffigy: boolean;
    defeatedZapCoreEnemy: boolean;
    defeatedZapGuard1: boolean;
    DeskPlacedLibrarianList: boolean;
    DeskPlacedRelicList: boolean;
    destroyedRosaryCannonMachine: boolean;
    destroyedSongGolemRock: boolean;
    dicePilgrimBank: number;
    dicePilgrimDefeated: boolean;
    dicePilgrimGameExplained: boolean;
    dicePilgrimState: number;
    didPilgrimIntroScene: boolean;
    didRhinoRuckus: boolean;
    docks_02_shortcut_left: boolean;
    docks_02_shortcut_right: boolean;
    docksBomberAmbush: boolean;
    dreamReturnScene: string;
    droppedFloorBreakerPlat: boolean;
    druidAct3Intro: boolean;
    druidMossBerriesSold: number;
    druidTradeIntro: boolean;
    dust01_battleCompleted: boolean;
    dust01_returnReady: boolean;
    dust03_battleCompleted: boolean;
    dust03_returnReady: boolean;
    dust05EnemyClearedOut: boolean;
    DustTradersOfferedPins: boolean;
    DustTradersOfferedQuest: boolean;
    enclaveAddition_CloakLine: boolean;
    enclaveAddition_PinRack: boolean;
    enclaveDonation2_Available: boolean;
    enclaveLevel: number;
    enclaveMerchantSaved: boolean;
    enclaveMerchantSeenInEnclave: boolean;
    enclaveNPC_songKnightFan: boolean;
    EnclaveState_songKnightFan: number;
    EnclaveStateNPCShortHorned: number;
    EnclaveStateNPCStandard: number;
    EnclaveStateNPCTall: number;
    EnclaveStatePilgrimSmall: number;
    encounteredAntTrapper: boolean;
    encounteredBellBeast: boolean;
    EncounteredBonetownBoss: boolean;
    encounteredCloverDancers: boolean;
    encounteredCogworkDancers: boolean;
    encounteredCoralDrillers: boolean;
    encounteredCoralDrillerSolo: boolean;
    encounteredCoralKing: boolean;
    encounteredCrowCourt: boolean;
    encounteredDockForemen: boolean;
    encounteredFirstWeaver: boolean;
    encounteredFlowerQueen: boolean;
    encounteredLace1: boolean;
    encounteredLace1Grotto: boolean;
    encounteredLaceBlastedBridge: boolean;
    encounteredLaceTower: boolean;
    encounteredLastJudge: boolean;
    encounteredLibraryEntryBattle: boolean;
    EncounteredLostLace: boolean;
    encounteredMossMother: boolean;
    encounteredPhantom: boolean;
    encounteredPharloomEdge: boolean;
    encounteredPharloomEdgeAct3: boolean;
    encounteredSeth: boolean;
    encounteredSilk: boolean;
    encounteredSongChevalierBoss: boolean;
    encounteredSongGolem: boolean;
    encounteredSpinner: boolean;
    encounteredSplinterQueen: boolean;
    EncounteredSummonedSaviour: boolean;
    encounteredSurfaceEdge: boolean;
    encounteredTormentedTrobbio: boolean;
    encounteredTrobbio: boolean;
    encounteredVampireGnat_05: boolean;
    encounteredVampireGnat_07: boolean;
    encounteredVampireGnatBoss: boolean;
    encounteredWhiteCloverstag: boolean;
    encounteredWhiteCloverstagMid: boolean;
    enemyGroupAnt04: number;
    EnemyJournalKillData: EnemyJournalKillData;
    entered_Tut01b: boolean;
    enteredCoral_10: boolean;
    enteredGreymoor05: boolean;
    enteredHang_08: boolean;
    EnteredMazeRestScene: boolean;
    enteredSong_01: boolean;
    enteredSong_02: boolean;
    enteredSong_13: boolean;
    enteredSong_17: boolean;
    enteredSong_19: boolean;
    enteredTutorialFirstTime: boolean;
    environmentType: number;
    explodeWallBoneEast18c: boolean;
    explodeWallMosstown3: boolean;
    extraRestZone: number;
    ExtraToolEquips: FloatingCrestSlotsData;
    farmer_grewFirstGrub: boolean;
    farmer_grubGrowing_1: boolean;
    farmer_grubGrowing_2: boolean;
    farmer_grubGrowing_3: boolean;
    farmer_grubGrown_1: boolean;
    farmer_grubGrown_2: boolean;
    farmer_grubGrown_3: boolean;
    FastTravelNPCLocation: number;
    FisherWalkerDirection: boolean;
    FisherWalkerIdleTimeLeft: number;
    FisherWalkerTimer: number;
    FixedDustBellBench: boolean;
    fixerAcceptedQuestConvo: boolean;
    fixerBridgeBreaking: boolean;
    fixerBridgeBroken: boolean;
    fixerBridgeConstructed: boolean;
    fixerQuestBoardConvo: boolean;
    fixerStatueConstructed: boolean;
    fixerStatueConvo: boolean;
    fleaGames_bouncing_highscore: number;
    fleaGames_bouncing_played: boolean;
    fleaGames_dodging_highscore: number;
    fleaGames_dodging_played: boolean;
    fleaGames_juggling_highscore: number;
    fleaGames_juggling_played: boolean;
    FleaGamesCanStart: boolean;
    FleaGamesEnded: boolean;
    FleaGamesEndedContinuedPlaying: boolean;
    FleaGamesMementoGiven: boolean;
    FleaGamesPinataHit: boolean;
    FleaGamesSpiritScoreAdded: boolean;
    FleaGamesStarted: boolean;
    FleaQuestOffered: boolean;
    FleasCollectedTargetOrder: number[];
    flowerQueenHeartAppeared: boolean;
    ForgeDaughterMentionedDivingBell: boolean;
    ForgeDaughterMentionedWebShot: boolean;
    ForgeDaughterPostAbyssDlg: boolean;
    ForgeDaughterPurchaseDlg: boolean;
    ForgeDaughterSpentToolMetal: boolean;
    ForgeDaughterTalkState: number;
    ForgeDaughterWhiteFlowerDlg: boolean;
    FreedCaravanSpider: boolean;
    fullyEnteredVerdania: boolean;
    gainedCurse: boolean;
    garmondAidForumBattle: boolean;
    garmondBlackThreadDefeated: boolean;
    garmondEncounterCooldown: boolean;
    garmondEncounters_act3: number;
    garmondFinalQuestReady: boolean;
    garmondInDust05: boolean;
    garmondInEnclave: boolean;
    garmondInLibrary: boolean;
    garmondInSong01: boolean;
    garmondInSong02: boolean;
    garmondInSong13: boolean;
    garmondInSong17: boolean;
    garmondLibraryDefeatedHornet: boolean;
    garmondLibraryMet: boolean;
    garmondLibraryOffered: boolean;
    garmondLibrarySeen: boolean;
    garmondMetEnclave: boolean;
    garmondMoorwingConvo: boolean;
    garmondMoorwingConvoReady: boolean;
    garmondPurposeConvo: boolean;
    garmondSeenInDust05: boolean;
    garmondSeenInGreymoor10: boolean;
    garmondSeenInSong01: boolean;
    garmondSeenInSong02: boolean;
    garmondSeenInSong13: boolean;
    garmondSeenInSong17: boolean;
    garmondWillAidInForumBattle: boolean;
    gatePilgrimNoNeedolinConvo: boolean;
    geo: number;
    gillyAct3Convo: boolean;
    gillyHunterCampConvo: boolean;
    gillyIntroduced: boolean;
    gillyLocation: number;
    gillyLocationAct3: number;
    gillyMet: boolean;
    gillyQueueMovingOn: boolean;
    gillyStatueConvo: boolean;
    gillyTrapConvo: boolean;
    GivenLibrarianRelic: boolean;
    GotGourmandReward: boolean;
    gotPastDockSpearThrower: boolean;
    gotPickledRoachEgg: boolean;
    GourmandGivenCoral: boolean;
    GourmandGivenEgg: boolean;
    GourmandGivenMeat: boolean;
    GourmandGivenNectar: boolean;
    GourmandGivenStew: boolean;
    GourmandServantOfferedQuest: boolean;
    greatBoneGateOpened: boolean;
    GreenPrinceLocation: number;
    GreenPrinceSeenSong04: boolean;
    greymoor_04_battleCompleted: boolean;
    greymoor_05_centipedeArrives: boolean;
    greymoor_10_entered: boolean;
    greymoor05_clearedOut: boolean;
    greymoor05_farmerPlatBroken: boolean;
    greymoor05_killedJailer: boolean;
    greymoor08_plat_destroyed: boolean;
    greyWarriorDeathX: number;
    grindleChestEncountered: boolean;
    grindleChestLocation: number;
    grindleEnclaveConvo: boolean;
    grindleInSong_08: boolean;
    grindleMetGrandForum: boolean;
    grindleReleasedFromBonejail: boolean;
    grindleShopEnemyIntro: boolean;
    grindleSlabSequence: number;
    grishkinSethConvo: boolean;
    GrowstoneState: number;
    GrowstoneTimer: number;
    grubFarmer_firstGrubConvo: boolean;
    grubFarmer_needolinConvo1: boolean;
    grubFarmerEmerged: boolean;
    GrubFarmerMimicValueList: number[];
    GrubFarmerSilkGrubsSold: number;
    grubFarmerTimer: number;
    grubFarmLevel: number;
    HalfwayBartenderCursedConvo: boolean;
    HalfwayBartenderHauntedBellhartConvo: boolean;
    HalfwayBartenderOfferedQuest: boolean;
    halfwayCrowd: number;
    halfwayCrowEnemyGroup: number;
    HalfwayDrinksPurchased: number;
    HalfwayNectarOffered: boolean;
    HalfwayNectarPaid: boolean;
    HalfwayPatronLeftGone: boolean;
    HalfwayPatronRightGone: boolean;
    HalfwayPatronsCanVisit: boolean;
    HalfwayScarecrawAppeared: boolean;
    hang_10_oneWay: boolean;
    hang04Battle: boolean;
    HasAbyssMap: boolean;
    hasActivatedBellBench: boolean;
    HasAqueductMap: boolean;
    HasArboriumMap: boolean;
    HasBellhartMap: boolean;
    HasBoneforestMap: boolean;
    HasBoundCrestUpgrader: boolean;
    hasBrolly: boolean;
    hasChargeSlash: boolean;
    HasCitadelUnderstoreMap: boolean;
    HasCloverMap: boolean;
    HasCogMap: boolean;
    HasCoralMap: boolean;
    HasCradleMap: boolean;
    HasCrawlMap: boolean;
    hasDash: boolean;
    HasDocksMap: boolean;
    hasDoubleJump: boolean;
    HasDustpensMap: boolean;
    hasGodfinder: boolean;
    HasGreymoorMap: boolean;
    HasHallsMap: boolean;
    HasHangMap: boolean;
    hasHarpoonDash: boolean;
    HasHuntersNestMap: boolean;
    hasJournal: boolean;
    HasJudgeStepsMap: boolean;
    hasKilled: boolean;
    HasLibraryMap: boolean;
    hasMarker: boolean;
    hasMarker_a: boolean;
    hasMarker_b: boolean;
    hasMarker_c: boolean;
    hasMarker_d: boolean;
    hasMarker_e: boolean;
    HasMelodyArchitect: boolean;
    HasMelodyConductor: boolean;
    HasMelodyLibrarian: boolean;
    HasMossGrottoMap: boolean;
    hasNeedleThrow: boolean;
    hasNeedolin: boolean;
    hasNeedolinMemoryPowerup: boolean;
    hasParry: boolean;
    HasPeakMap: boolean;
    hasPinBench: boolean;
    hasPinCocoon: boolean;
    hasPinFleaBlastedlands: boolean;
    hasPinFleaCitadel: boolean;
    hasPinFleaMarrowlands: boolean;
    hasPinFleaMidlands: boolean;
    hasPinFleaMucklands: boolean;
    hasPinFleaPeaklands: boolean;
    hasPinShop: boolean;
    hasPinSpa: boolean;
    hasPinStag: boolean;
    hasPinTube: boolean;
    hasQuill: boolean;
    HasSeenDash: boolean;
    HasSeenEvaHeal: boolean;
    HasSeenGeo: boolean;
    HasSeenGeoBig: boolean;
    HasSeenGeoMid: boolean;
    HasSeenHarpoon: boolean;
    HasSeenMapMarkerUpdated: boolean;
    HasSeenMapUpdated: boolean;
    HasSeenNeedolin: boolean;
    HasSeenNeedolinDown: boolean;
    HasSeenNeedolinUp: boolean;
    HasSeenRation: boolean;
    HasSeenShellShards: boolean;
    HasSeenSilkHearts: boolean;
    HasSeenSuperJump: boolean;
    HasSeenWalljump: boolean;
    HasShellwoodMap: boolean;
    hasSilkBomb: boolean;
    hasSilkBossNeedle: boolean;
    hasSilkCharge: boolean;
    hasSilkSpecial: boolean;
    HasSlabKeyA: boolean;
    HasSlabKeyB: boolean;
    HasSlabKeyC: boolean;
    HasSlabMap: boolean;
    HasSongGateMap: boolean;
    HasStoredMemoryState: boolean;
    hasSuperJump: boolean;
    HasSwampMap: boolean;
    hasThreadSphere: boolean;
    hasWalljump: boolean;
    HasWardMap: boolean;
    HasWeavehomeMap: boolean;
    HasWildsMap: boolean;
    hazardRespawnFacing: number;
    health: number;
    healthBlue: number;
    HeardBoneBottomShopKeepPostBoss: boolean;
    HeardMelodyConductorNoQuest: boolean;
    heartPieces: number;
    HeroCorpseMarkerGuid: any[];
    HeroCorpseMoneyPool: number;
    HeroCorpseScene: string;
    HeroCorpseType: number;
    HeroDeathScenePos: Vector2;
    HeroDeathSceneSize: Vector2;
    hitCrowCourtSwitch: boolean;
    hunterInfestationBoneForest: boolean;
    HuntressQuestOffered: boolean;
    HuntressRuntAppeared: boolean;
    HuntressRuntQuestOffered: boolean;
    IncorrectMazeDoorsEntered: number;
    infiniteAirJump: boolean;
    InvNailHasNew: boolean;
    InvPaneHasNew: boolean;
    isFirstGame: boolean;
    isInvincible: boolean;
    IsPinGallerySetup: boolean;
    IsSilkSpoolBroken: boolean;
    JournalPaneHasNew: boolean;
    killedRoostingCrowman: boolean;
    laceCorpseAddedEffects: boolean;
    laceCorpsePosX: number;
    laceCorpseScaleX: number;
    laceLeftDocks: boolean;
    laceMeetCitadel: boolean;
    laceTowerDoorOpened: boolean;
    LastCompletedEnding: number;
    LastDiveCursedConvo: boolean;
    LastSetFieldName: string;
    lavaChallengeEntranceCavedIn: boolean;
    lavaSpittersEmerge: boolean;
    learnedPilbyName: boolean;
    leftTheGrandForum: boolean;
    LibrarianAskedForMelody: boolean;
    LibrarianAskedForRelic: boolean;
    LibrarianCollectionComplete: boolean;
    LibrarianMentionedMelody: boolean;
    LibrarianMetAct3: boolean;
    LibrarianPlayingInfo: CollectionGramaphonePlayingInfo;
    library_14_ambush: boolean;
    libraryRoofShortcut: boolean;
    libraryStatueWoken: boolean;
    LightningToolToggle: boolean;
    littleCrabsAppeared: boolean;
    mapAllRooms: boolean;
    mapKeyPref: number;
    MapperAppearInBellhart: boolean;
    mapperAway: boolean;
    mapperBellhartConvo: boolean;
    mapperBellhartConvo2: boolean;
    mapperBellhartConvoTimePassed: boolean;
    mapperBrokenBenchConvo: boolean;
    mapperCalledConvo: boolean;
    mapperConvo_Act3Intro: boolean;
    mapperConvo_Act3IntroTimePassed: boolean;
    mapperConvo_Act3NoStock: boolean;
    mapperConvo_WhiteFlower: boolean;
    mapperCursedConvo: boolean;
    mapperFightGroup: number;
    mapperHauntedBellhartConvo: boolean;
    mapperIsFightingAct3: boolean;
    MapperLeftBellhart: boolean;
    MapperLeftBoneForest: boolean;
    MapperLeftBonetown: boolean;
    MapperLeftCoralCaverns: boolean;
    MapperLeftCrawl: boolean;
    MapperLeftDocks: boolean;
    MapperLeftDustpens: boolean;
    MapperLeftGreymoor: boolean;
    MapperLeftHuntersNest: boolean;
    MapperLeftJudgeSteps: boolean;
    MapperLeftPeak: boolean;
    MapperLeftShadow: boolean;
    MapperLeftShellwood: boolean;
    MapperLeftWilds: boolean;
    mapperLocationAct3: number;
    mapperMaggottedConvo: boolean;
    mapperMappingConvo: boolean;
    mapperMasterAfterConvo: boolean;
    mapperMentorConvo: boolean;
    mapperMetInAnt04: boolean;
    mapperQuillConvo: boolean;
    mapperReactedToBrokenBellBench: boolean;
    mapperRosaryConvo: boolean;
    mapperSellingTubePins: boolean;
    mapperSparIntro: boolean;
    mapperTubeConvo: boolean;
    mapUpdateQueued: boolean;
    mapZone: number;
    marionettesBurned: boolean;
    marionettesMet: boolean;
    MaskMakerQueuedUnmasked2: boolean;
    MaskMakerTalkedPeak: boolean;
    MaskMakerTalkedRelationship: boolean;
    MaskMakerTalkedUnmasked: boolean;
    MaskMakerTalkedUnmasked1: boolean;
    MaskMakerTalkedUnmasked2: boolean;
    MaskMakerTalkedUnmaskedAct3: boolean;
    MateriumCollected: MateriumItemsData;
    maxHealth: number;
    maxHealthBase: number;
    MazeEntranceDoor: string;
    MazeEntranceInitialDoor: string;
    MazeEntranceInitialScene: string;
    MazeEntranceScene: string;
    MelodyLiftCanReturn: boolean;
    MementosDeposited: CollectableMementosData;
    memoryOrbs_Clover_02c_A: boolean;
    memoryOrbs_Clover_03_B: boolean;
    memoryOrbs_Clover_06_A: boolean;
    memoryOrbs_Clover_11: boolean;
    memoryOrbs_Clover_16_B: boolean;
    memoryOrbs_Clover_16_C: boolean;
    memoryOrbs_Clover_18_A: any;
    memoryOrbs_Clover_18_B: any;
    memoryOrbs_Clover_18_C: any;
    memoryOrbs_Clover_18_D: any;
    memoryOrbs_Clover_18_E: any;
    memoryOrbs_Clover_19: any;
    memoryOrbs_Clover_21: boolean;
    MerchantEnclaveShellFragment: boolean;
    MerchantEnclaveSimpleKey: boolean;
    MerchantEnclaveSocket: boolean;
    MerchantEnclaveSpoolPiece: boolean;
    MerchantEnclaveToolMetal: boolean;
    MerchantEnclaveWardKey: boolean;
    MetAntMerchant: boolean;
    metAntQueenNPC: boolean;
    MetArchitect: boolean;
    MetArchitectAct3: boolean;
    MetBelltownBagpipers: boolean;
    MetBelltownDoctor: boolean;
    MetBelltownDoctorDoor: boolean;
    MetBelltownDoctorDoorAct3: boolean;
    MetBelltownRelicDealer: boolean;
    MetBelltownRelicDealerAct3: boolean;
    MetBelltownShopkeep: boolean;
    MetBoneBottomShopKeep: boolean;
    MetCaravanSpider: boolean;
    MetCaravanSpiderCoral: boolean;
    MetCaravanTroupeLeader: boolean;
    MetCaravanTroupeLeaderGreymoor: boolean;
    MetCaravanTroupeLeaderGreymoorScared: boolean;
    MetCaravanTroupeLeaderJudge: boolean;
    metCaretaker: boolean;
    MetCityMerchantEnclave: boolean;
    MetCityMerchantEnclaveAct3: boolean;
    MetCityMerchantScavenge: boolean;
    MetCrestUpgrader: boolean;
    MetCrestUpgraderAct3: boolean;
    metDicePilgrim: boolean;
    metDruid: boolean;
    MetEnclaveScaredPilgrim: boolean;
    MetFisherHomeBasic: boolean;
    MetFisherHomeFull: boolean;
    MetForgeDaughter: boolean;
    MetForgeDaughterAct3: boolean;
    metGarmond: boolean;
    metGarmondAct3: boolean;
    metGatePilgrim: boolean;
    MetGourmandServant: boolean;
    MetGourmandServantAct3: boolean;
    metGrindleAct3: boolean;
    metGrubFarmer: boolean;
    metGrubFarmerAct3: boolean;
    MetGrubFarmerMimic: boolean;
    MetHalfwayBartender: boolean;
    MetHalfwayBartenderAct3: boolean;
    MetHalfwayHunterFan: boolean;
    MetHunterFanOutside: boolean;
    metLearnedPilgrim: boolean;
    metLearnedPilgrimAct3: boolean;
    metMapper: boolean;
    MetMaskMaker: boolean;
    MetMaskMakerAct3: boolean;
    MetPilgrimsRestShop: boolean;
    MetPinChallengeBug: boolean;
    MetSeamstress: boolean;
    MetSethNPC: boolean;
    metSherma: boolean;
    metShermaEnclave: boolean;
    metShermaPilgrimsRest: boolean;
    metSwampMuckmen: boolean;
    MetTroupeHunterWild: boolean;
    MetWoodWitch: boolean;
    mortKeptWeightedAnklet: boolean;
    mossBerryValueList: number[];
    mosstown01_shortcut: boolean;
    mosstownAspidBerryCollected: boolean;
    MottledChildGivenTool: boolean;
    MottledChildNewTool: boolean;
    muchTimePassed: boolean;
    MushroomQuestFound1: boolean;
    MushroomQuestFound2: boolean;
    MushroomQuestFound3: boolean;
    MushroomQuestFound4: boolean;
    MushroomQuestFound5: boolean;
    MushroomQuestFound6: boolean;
    MushroomQuestFound7: boolean;
    nailRange: number;
    nailUpgrades: number;
    newDatTraitorLord: boolean;
    nuuEncountered_coralDrillers: boolean;
    nuuEncountered_skullKing: boolean;
    nuuEncountered_splinterQueen: boolean;
    nuuEncountered_zapNest: boolean;
    nuuIntroAct3: boolean;
    nuuIsHome: boolean;
    nuuMementoAwarded: boolean;
    nuuSlappedOutside: boolean;
    nuuVisiting_coralDrillers: boolean;
    nuuVisiting_skullKing: boolean;
    nuuVisiting_splinterQueen: boolean;
    nuuVisiting_zapNest: boolean;
    opened_cog_06_door: boolean;
    openedBeastmasterDen: boolean;
    openedCauldronShortcut: boolean;
    openedCitadelSpaLeft: boolean;
    openedCitadelSpaRight: boolean;
    OpenedCoralCaravanSpider: boolean;
    OpenedCrowSummonsDoor: boolean;
    openedDocksBackEntrance: boolean;
    openedDust05Gate: boolean;
    openedGateCoral_14: boolean;
    openedGeyserShaft: boolean;
    openedShellwoodShortcut: boolean;
    openedSongGateDocks: boolean;
    openedTallGeyser: boolean;
    openedUnder_01b: boolean;
    openedUnder_05: boolean;
    openedUnder_19: boolean;
    openingCreditsPlayed: boolean;
    peak05b_oneWay: boolean;
    peak05c_oneWay: boolean;
    peak06_oneWay: boolean;
    peak13_oneWay: boolean;
    permadeathMode: number;
    PickedUpCrowMemento: boolean;
    pilbyAtPilgrimsRest: boolean;
    pilbyBellhartConvo: boolean;
    pilbyCampConvo: boolean;
    pilbyFirstRepeatConvo: boolean;
    pilbyFriendship: number;
    pilbyGotSprintConvo: boolean;
    pilbyInsidePilgrimsRest: boolean;
    pilbyKilled: boolean;
    pilbyLeftPilgrimsRest: boolean;
    pilbyMeetConvo: boolean;
    pilbyMosstownConvo: boolean;
    pilbyPilgrimsRestMeetConvo: boolean;
    pilbySeenAtPilgrimsRest: boolean;
    pilgrimFisherPossessed: boolean;
    pilgrimGroupBonegrave: number;
    pilgrimGroupGreymoorField: number;
    pilgrimGroupShellgrave: number;
    pilgrimQuestSpoolCollected: boolean;
    pilgrimRestCrowd: number;
    pilgrimRestMerchant_RhinoRuckusConvo: boolean;
    pilgrimRestMerchant_SingConvo: boolean;
    PilgrimsRestDoorBroken: boolean;
    pilgrimsRestRosaryThiefCowardLeft: boolean;
    PilgrimsRestShopIdleTalkState: number;
    PilgrimStomperNPCOffered: boolean;
    pinGalleriesCompleted: number;
    PinGalleryHasPlayedFinalChallenge: boolean;
    PinGalleryLastChallengeOpen: boolean;
    PinGalleryWallet: number;
    PinsmithMetBelltown: boolean;
    PinsmithQuestOffered: boolean;
    PinsmithUpg2Offered: boolean;
    PinsmithUpg3Offered: boolean;
    PinsmithUpg4Offered: boolean;
    pinstressInsideSitting: boolean;
    PinstressPeakBattleAccepted: boolean;
    PinstressPeakBattleOffered: boolean;
    PinstressPeakQuestOffered: boolean;
    pinstressQuestReady: boolean;
    pinstressStoppedResting: boolean;
    placedMarkers: WrappedVector2List[];
    playTime: number;
    PreMemoryState: HeroItemsState;
    prevHealth: number;
    PreviousCrestID: string;
    previousDarkness: number;
    previouslyVisitedGreymoor_05: boolean;
    PreviousMazeDoor: string;
    PreviousMazeScene: string;
    PreviousMazeTargetDoor: string;
    profileID: number;
    promisedFirstWish: boolean;
    promptFocus: boolean;
    PurchasedArchitectKey: boolean;
    PurchasedArchitectToolKit: boolean;
    PurchasedBelltownMemoryLocket: boolean;
    PurchasedBelltownShellFragment: boolean;
    PurchasedBelltownSpoolSegment: boolean;
    PurchasedBelltownToolPouch: boolean;
    PurchasedBonebottomFaithToken: boolean;
    PurchasedBonebottomHeartPiece: boolean;
    PurchasedBonebottomToolMetal: boolean;
    PurchasedForgeToolKit: boolean;
    purchasedGrindleMemoryLocket: boolean;
    purchasedGrindleSimpleKey: boolean;
    purchasedGrindleSpoolPiece: boolean;
    purchasedGrindleToolKit: boolean;
    PurchasedPilgrimsRestMemoryLocket: boolean;
    PurchasedPilgrimsRestToolPouch: boolean;
    QuestCompletionData: QuestCompletionData;
    QuestPaneHasNew: boolean;
    QuestRumourData: QuestRumourData;
    queuedGodfinderIcon: boolean;
    QuillState: number;
    Relics: CollectableRelicsData;
    respawnMarkerName: string;
    respawnScene: string;
    respawnType: number;
    RevisionBreak: number;
    rhinoChurchUnlocked: boolean;
    rhinoRampageCompleted: boolean;
    rhinoRuckus: boolean;
    roachkeeperChefCorpsePrepared: boolean;
    rockRollerDefeated_bone01: boolean;
    rockRollerDefeated_bone06: boolean;
    rockRollerDefeated_bone07: boolean;
    roofCrabDefeated: boolean;
    roofCrabEncountered: boolean;
    rosaryThievesInBank: boolean;
    rosaryThievesInUnder07: boolean;
    rosaryThievesLeftBank: boolean;
    SatAtBenchAfterAbyssEscape: boolean;
    SavedFlea_Ant_03: boolean;
    SavedFlea_Belltown_04: boolean;
    SavedFlea_Bone_06: boolean;
    SavedFlea_Bone_East_05: boolean;
    SavedFlea_Bone_East_10_Church: boolean;
    SavedFlea_Bone_East_17b: boolean;
    SavedFlea_Coral_24: boolean;
    SavedFlea_Coral_35: boolean;
    SavedFlea_Crawl_06: boolean;
    SavedFlea_Dock_03d: boolean;
    SavedFlea_Dock_16: boolean;
    SavedFlea_Dust_09: boolean;
    SavedFlea_Dust_12: boolean;
    SavedFlea_Greymoor_06: boolean;
    SavedFlea_Greymoor_15b: boolean;
    SavedFlea_Library_01: boolean;
    SavedFlea_Library_09: boolean;
    SavedFlea_Peak_05c: boolean;
    SavedFlea_Shadow_10: boolean;
    SavedFlea_Shadow_28: boolean;
    SavedFlea_Shellwood_03: boolean;
    SavedFlea_Slab_06: boolean;
    SavedFlea_Slab_Cell: boolean;
    SavedFlea_Song_11: boolean;
    SavedFlea_Song_14: boolean;
    SavedFlea_Under_21: boolean;
    SavedFlea_Under_23: boolean;
    savedGrindleInCitadel: boolean;
    savedPlinney: boolean;
    savedPlinneyConvo: boolean;
    sawPlinneyLeft: boolean;
    scenesEncounteredBench: Set<string>;
    scenesEncounteredCocoon: Set<string>;
    scenesMapped: Set<string>;
    scenesVisited: Set<string>;
    scholarAcolytesInLibrary_02: boolean;
    scholarAcolytesReleased: boolean;
    scholarAmbushReady: boolean;
    SeamstressAct3Convo: boolean;
    SeamstressBadgeConvo: boolean;
    SeamstressCitadelConvo: boolean;
    SeamstressIdleTalkState: number;
    SeamstressOfferedQuest: boolean;
    SeamstressPinstressConvo: boolean;
    SeenAntMerchantDead: boolean;
    SeenArchitectLeft: boolean;
    seenBellBeast: boolean;
    SeenBelltownCutscene: boolean;
    SeenBindPrompt: boolean;
    SeenBoneBottomShopKeep: boolean;
    seenBonetownDestroyed: boolean;
    SeenCaravanSpider: boolean;
    SeenDivingBellGoneAbyss: boolean;
    seenDreamNailPrompt: boolean;
    seenEmptyShellwood16: boolean;
    SeenFleaCaravan: boolean;
    SeenFleatopiaEmpty: boolean;
    seenFocusTablet: boolean;
    seenGrindleInSong_08: boolean;
    SeenGrindleShop: boolean;
    SeenHalfwayPatronLeft: boolean;
    SeenHalfwayPatronRight: boolean;
    seenJournalMsg: boolean;
    seenJournalQuestUpdateMsg: boolean;
    SeenLastJudgeGateOpen: boolean;
    seenMapperAct3: boolean;
    SeenMapperBellhart: boolean;
    SeenMapperBoneForest: boolean;
    SeenMapperBonetown: boolean;
    SeenMapperCoralCaverns: boolean;
    SeenMapperCrawl: boolean;
    SeenMapperDocks: boolean;
    SeenMapperDustpens: boolean;
    SeenMapperGreymoor: boolean;
    SeenMapperHuntersNest: boolean;
    SeenMapperJudgeSteps: boolean;
    SeenMapperPeak: boolean;
    SeenMapperShadow: boolean;
    SeenMapperShellwood: boolean;
    SeenMapperWilds: boolean;
    seenMateriumMsg: boolean;
    SeenMelodyLibrarianReturn: boolean;
    SeenMortDead: boolean;
    SeenMortLeft: boolean;
    seenPebbLeft: boolean;
    seenPilbyLeft: boolean;
    seenScholarAcolytes: boolean;
    SeenToolEquipPrompt: boolean;
    SeenToolGetPrompt: boolean;
    SeenToolUsePrompt: boolean;
    SeenToolWeaponGetPrompt: boolean;
    sethConvo: number;
    SethJoinedFleatopia: boolean;
    sethLeftShellwood: boolean;
    SethNpcLocation: number;
    sethRevived: boolean;
    sethShortcut: boolean;
    shakraAidForumBattle: boolean;
    ShakraFinalQuestAppear: boolean;
    ShamanRitualCursedConvo: boolean;
    shellGravePopulated: boolean;
    ShellShards: number;
    shellwood13_BellWall: boolean;
    shellwood14_ambushed: boolean;
    shellwoodBellshrineTwigWall: boolean;
    shellwoodSlabflyDefeated: boolean;
    shellwoodTwigShortcut: boolean;
    shermaAtSteps: boolean;
    shermaCaretakerConvo1: boolean;
    shermaCaretakerConvoFinal: boolean;
    shermaCitadelEnclave_Seen: boolean;
    shermaCitadelEntrance_Left: boolean;
    shermaCitadelEntrance_Seen: boolean;
    shermaCitadelEntrance_Visiting: boolean;
    shermaCitadelSpa_ExtraConvo: boolean;
    shermaCitadelSpa_Left: boolean;
    shermaCitadelSpa_Seen: boolean;
    shermaCitadelSpa_Visiting: boolean;
    shermaConvoBellBeast: boolean;
    shermaConvoCoralBench: boolean;
    shermaConvoCoralJudges: boolean;
    shermaEnclaveHealingConvo: boolean;
    shermaHealerActive: boolean;
    shermaInBellhart: boolean;
    shermaInEnclave: boolean;
    shermaPos: number;
    shermaQuestActive: boolean;
    shermaSeenInBellhart: boolean;
    shermaSeenInSteps: boolean;
    shermaWokeInSteps: boolean;
    shermaWoundedPilgrim: number;
    ShopkeeperQuestMentioned: boolean;
    showGeoUI: boolean;
    showHealthUI: boolean;
    silk: number;
    silkFarmAbyssCoresCleared: boolean;
    silkFarmBattle1_complete: boolean;
    silkMax: number;
    silkRegenMax: number;
    silkSpecialLevel: number;
    silkSpoolParts: number;
    skullKingAwake: boolean;
    skullKingBenchMended: boolean;
    skullKingDefeated: boolean;
    skullKingDefeatedBlackThreaded: boolean;
    skullKingInvaded: boolean;
    skullKingKilled: boolean;
    skullKingPlatMended: boolean;
    skullKingShortcut: boolean;
    skullKingWillInvade: boolean;
    slab_03_rubbishCleared: boolean;
    slab_05_gateOpen: boolean;
    slab_07_gateOpen: boolean;
    slab_17_openedGateLeft: boolean;
    slab_17_openedGateRight: boolean;
    slab_cell_quiet_oneWayWall: boolean;
    slab_cloak_battle_completed: boolean;
    slab_cloak_battle_encountered: boolean;
    slab_cloak_gate_reopened: boolean;
    slabCaptor_heardChallenge: boolean;
    slabCaptor_heardChallengeRings: boolean;
    slabFlyInShellwood16: boolean;
    slabPrisonerFlyConvo: boolean;
    slabPrisonerRemeetConvo: boolean;
    slabPrisonerSingConvo: boolean;
    SnailShamansCloverHeartConvo: boolean;
    SnailShamansCrestConvo: boolean;
    song_04_battleCompleted: boolean;
    song_11_oneway: boolean;
    song_17_clearedOut: boolean;
    song_27_opened: boolean;
    song05MarchGroupReady: boolean;
    song18Shortcut: boolean;
    songChevalierActiveInHang_02: boolean;
    songChevalierActiveInSong_02: boolean;
    songChevalierActiveInSong_04: boolean;
    songChevalierActiveInSong_07: boolean;
    songChevalierActiveInSong_24: boolean;
    songChevalierActiveInSong_25: boolean;
    songChevalierActiveInSong_27: boolean;
    songChevalierEncounterCooldown: boolean;
    songChevalierEncounters: number;
    songChevalierQuestReady: boolean;
    songChevalierRestingMet: boolean;
    songChevalierRestingMetAct3: boolean;
    songChevalierSeenInHang_02: boolean;
    songChevalierSeenInSong_02: boolean;
    songChevalierSeenInSong_04: boolean;
    songChevalierSeenInSong_07: boolean;
    songChevalierSeenInSong_24: boolean;
    songChevalierSeenInSong_25: boolean;
    songChevalierSeenInSong_27: boolean;
    soulSnareReady: boolean;
    spinnerDefeated: boolean;
    SpinnerDefeatedTimePassed: boolean;
    spinnerEncounter: number;
    splinterQueenSproutCut: boolean;
    splinterQueenSproutGrewLarge: boolean;
    splinterQueenSproutTimer: number;
    SprintMasterCurrentRace: number;
    SprintMasterExtraRaceAvailable: boolean;
    SprintMasterExtraRaceDlg: boolean;
    SprintMasterExtraRaceWon: boolean;
    SteelQuestSpots: SteelSoulQuestSpotSpot[];
    SteelSentinelMet: boolean;
    SteelSentinelOffered: boolean;
    StoryEvents: PlayerStoryEventInfo[];
    summonedLakeOrbs: boolean;
    swampMuckmanTallInvades: boolean;
    tamedGiantFlea: boolean;
    TempGeoStore: number;
    TempShellShardStore: number;
    thievesReturnedToShadow28: boolean;
    tinyBroodMotherAppeared: boolean;
    tookGreymoor17Spool: boolean;
    tookRestroomRosaries: boolean;
    ToolEquips: ToolCrestsData;
    ToolKitUpgrades: number;
    ToolLiquids: ToolItemLiquidsData;
    ToolPaneHasNew: boolean;
    ToolPouchUpgrades: number;
    Tools: ToolItemsData;
    tormentedTrobbioLurking: boolean;
    trobbioCleanedUp: boolean;
    TroupeHunterWildAct3Convo: boolean;
    TroupeLeaderSpokenFleatopiaSearch: boolean;
    TroupeLeaderSpokenHunter: boolean;
    TroupeLeaderSpokenLech: boolean;
    uncagedGiantFlea: boolean;
    under07_battleCompleted: boolean;
    under07_heavyWorkerReturned: boolean;
    understoreLiftBroke: boolean;
    UnlockedAqueductStation: boolean;
    UnlockedArboriumTube: boolean;
    UnlockedBelltownStation: boolean;
    UnlockedBoneforestEastStation: boolean;
    unlockedBossScenes: string[];
    UnlockedCityBellwayTube: boolean;
    UnlockedCityStation: boolean;
    UnlockedCoralTowerStation: boolean;
    UnlockedDocksStation: boolean;
    UnlockedDustCage: boolean;
    UnlockedEnclaveTube: boolean;
    UnlockedExtraBlueSlot: boolean;
    UnlockedExtraYellowSlot: boolean;
    UnlockedFastTravel: boolean;
    UnlockedFastTravelTeleport: boolean;
    UnlockedGreymoorStation: boolean;
    UnlockedHangTube: boolean;
    UnlockedMelodyLift: boolean;
    unlockedNewBossStatue: boolean;
    UnlockedPeakStation: boolean;
    UnlockedShadowStation: boolean;
    UnlockedShellwoodStation: boolean;
    UnlockedSongTube: boolean;
    UnlockedUnderTube: boolean;
    VampireGnatCorpseInWater: boolean;
    VampireGnatCorpseOnCaravan: boolean;
    vampireGnatDeaths: number;
    VampireGnatDefeatedBeforeCaravanArrived: boolean;
    vampireGnatRequestedAid: boolean;
    version: string;
    visitedAbyss: boolean;
    visitedAqueducts: boolean;
    visitedArborium: boolean;
    visitedBellhart: boolean;
    visitedBellhartHaunted: boolean;
    visitedBellhartSaved: boolean;
    visitedBoneBottom: boolean;
    visitedBoneEast14b: boolean;
    visitedBoneForest: boolean;
    visitedCitadel: boolean;
    visitedCogwork: boolean;
    visitedCoral: boolean;
    visitedCoralBellshrine: boolean;
    visitedCoralRiver: boolean;
    visitedCoralRiverInner: boolean;
    visitedCoralTower: boolean;
    visitedCradle: boolean;
    visitedCrawl: boolean;
    visitedDeepDocks: boolean;
    visitedDustpens: boolean;
    visitedEnclave: boolean;
    visitedFleaFestival: boolean;
    visitedFleatopia: boolean;
    visitedGloom: boolean;
    visitedGrandGate: boolean;
    visitedGreymoor: boolean;
    visitedGrove: boolean;
    visitedHalfway: boolean;
    visitedHalls: boolean;
    visitedHang: boolean;
    visitedHangAtrium: boolean;
    visitedHuntersTrail: boolean;
    visitedIceCore: boolean;
    visitedLibrary: boolean;
    visitedMistmaze: boolean;
    visitedMossCave: boolean;
    visitedMosstown: boolean;
    visitedMountain: boolean;
    visitedRuinedCradle: boolean;
    visitedShadow: boolean;
    visitedShadow03: boolean;
    visitedShellwood: boolean;
    visitedShellwood_16: boolean;
    visitedSlab: boolean;
    visitedStage: boolean;
    visitedUnderstore: boolean;
    visitedUpperSlab: boolean;
    visitedWard: boolean;
    visitedWeave: boolean;
    visitedWilds: boolean;
    visitedWisp: boolean;
    wardBossDefeated: boolean;
    wardBossEncountered: boolean;
    wardBossHatchOpened: boolean;
    wardWoken: boolean;
    WasInPinChallenge: boolean;
    WasInSceneRace: boolean;
    weave01_oneWay: boolean;
    weave05_oneWay: boolean;
    whiteCloverPos: number;
    wisp02_enemiesReturned: boolean;
    wokeGreyWarrior: boolean;
    wokeLiftWeaver: boolean;
    wokeMossEvolver: boolean;
    wokeSongChevalier: boolean;
    WoodWitchGaveMandrake: boolean;
    WoodWitchOfferedCurse: boolean;
    WoodWitchOfferedFlowerQuest: boolean;
    WoodWitchOfferedItemQuest: boolean;
    WoodWitchTalkedPostQuest: boolean;
}


export interface PlayerStoryEventInfo {
    EventType: number;
    PlayTime: number;
    SceneName: string;
}


export interface PlayerStoryEventTypes {
    value__: number;
}


export interface QuestCompletionData {
    savedData: QuestCompletionDataNamedCompletion[];
}


export interface QuestCompletionDataCompletion {
    CompletedCount: number;
    HasBeenSeen: boolean;
    IsAccepted: boolean;
    IsCompleted: boolean;
    WasEverCompleted: boolean;
}


export interface QuestCompletionDataNamedCompletion {
    Data: QuestCompletionDataCompletion;
    Name: string;
}


export interface QuestRumourData {
    savedData: QuestRumourDataNamedData[];
}


export interface QuestRumourDataData {
    HasBeenSeen: boolean;
    IsAccepted: boolean;
}


export interface QuestRumourDataNamedData {
    Data: QuestRumourDataData;
    Name: string;
}


export interface SaveSlotCompletionIconsCompletionState {
    value__: number;
}


export interface SteelSoulQuestSpotSpot {
    IsSeen: boolean;
    SceneName: string;
}


export interface ToolCrestsData {
    savedData: ToolCrestsDataNamedData[];
}


export interface ToolCrestsDataData {
    DisplayNewIndicator: boolean;
    IsUnlocked: boolean;
    Slots: ToolCrestsDataSlotData[];
}


export interface ToolCrestsDataNamedData {
    Data: ToolCrestsDataData;
    Name: string;
}


export interface ToolCrestsDataSlotData {
    EquippedTool: string;
    IsUnlocked: boolean;
}


export interface ToolItemLiquidsData {
    savedData: ToolItemLiquidsDataNamedData[];
}


export interface ToolItemLiquidsDataData {
    RefillsLeft: number;
    SeenEmptyState: boolean;
    UsedExtra: boolean;
}


export interface ToolItemLiquidsDataNamedData {
    Data: ToolItemLiquidsDataData;
    Name: string;
}


export interface ToolItemsData {
    savedData: ToolItemsDataNamedData[];
}


export interface ToolItemsDataData {
    AmountLeft: number;
    HasBeenSeen: boolean;
    HasBeenSelected: boolean;
    IsHidden: boolean;
    IsUnlocked: boolean;
}


export interface ToolItemsDataNamedData {
    Data: ToolItemsDataData;
    Name: string;
}


export interface Vector2 {
    x: number;
    y: number;
    Item: number;
}


export interface WrappedVector2List {
    list: Vector2[];
}


