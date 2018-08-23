export interface WorldSpawn {
  classname: 'worldspawn'
  wad: string[]
  mapversion: number
  skyname: string
  maxRange: number
  message: string
  sounds: number
  light: number
  waveHeight: number
  startDark: WorldSpawnStartDark
  newUnit: WorldSpawnNewUnit
  gameTitle: WorldSpawnGameTitle
  defaultTeam: WorldSpawnDefaultTeam
}
export enum WorldSpawnStartDark {
  No = 0,
  Yes = 1 // the level will start black with fade in
}
export enum WorldSpawnGameTitle {
  No = 0,
  Yes = 1 // "Half-Life" will be displayed after the map loads
}
export enum WorldSpawnNewUnit {
  No = 0,
  Yes = 1 // All previous global triggers will be removed
}
export enum WorldSpawnDefaultTeam {
  FewestPlayers = 0,
  FirstTeam = 1
}

export interface AiScriptedSequence {
  classname: 'aiscripted_sequence'
  m_iszEntity: string
	m_iszPlay: string
	m_flRadius: number
	m_flRepeat: number
	m_fMoveTo: AiScriptedSequenceMoveTo
	m_iFinishSchedule: AiScriptedSequenceFinishSchedule
	spawnflags: AiScriptedSequenceSpawnflags
}
export enum AiScriptedSequenceMoveTo {
  No = 0,
  Walk = 1,
  Run = 2,
  Instantaneous = 4,
  No_TurnToFace = 5
}
export enum AiScriptedSequenceFinishSchedule {
  DefaultAI = 0,
  Ambush = 1
}
export enum AiScriptedSequenceSpawnflags {
  Repeatable = 4,
  LeaveCorpse = 8
}

export interface AmbientGeneric {
  classname: 'ambient_generic'
  origin: number[]
  targetName: string
  message: string
  health: number
  preset: AmbientGenericPreset
  startVolume: number
  fadeIn: number
  fadeOut: number
  pitch: number
  pitchStart: number
  spinUp: number
  spinDown: number
  lfoType: number
  lfoRate: number
  lfoModPitch: number
  lfoModVolume: number
  cSpinUp: number
  spawnFlags: AmbientGenericSpawnFlags
}
export enum AmbientGenericPreset {
  None = 0,
  HugeMachine = 1,
  BigMachine = 2,
  Machine = 3,
  SlowFadeIn = 4,
  FadeIn = 5,
  QuickFadeIn = 6,
  SlowPulse = 7,
  Pulse = 8,
  QuickPulse = 9,
  SlowOscillator = 10,
  Oscillator = 11,
	QuickOscillator = 12,
	GrungePitch = 13,
	VeryLowPitch = 14,
	LowPitch = 15,
	HighPitch = 16,
	VeryHighPitch = 17,
	ScreamingPitch = 18,
	OscillateSpinUpDown = 19,
	PulseSpinUpDown = 20,
	RandomPitch = 21,
	RandomPitchFast = 22,
	IncrementalSpinup = 23,
	Alien = 24,
	Bizzare = 25,
	PlanetX = 26,
	Haunted = 27
}
export enum AmbientGenericSpawnFlags {
  PlayEverywhere = 1,
  SmallRadius = 2,
  MediumRadius = 4,
  LargeRadius = 8,
  StartSilent = 16,
  NotToggled = 32
}

export interface Ammo357 {
  classname: 'ammo_357'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface Ammo9mmAR {
  classname: 'ammo_9mmAR'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface Ammo9mmBox {
  classname: 'ammo_9mmbox'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface Ammo9mmClip {
  classname: 'ammo_9mmclip'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface AmmoARGrenades {
  classname: 'ammo_ARgrenades'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface AmmoBuckShot {
  classname: 'ammo_buckshot'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface AmmoCrossBox {
  classname: 'ammo_crossbow'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface AmmoGaussClip {
  classname: 'ammo_gaussclip'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface AmmoRPGClip {
  classname: 'ammo_rpgclip'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  delay: number
  killTarget: string
  spawnFlags: number
}

export interface ButtonTarget {
  classname: 'button_target'
  target: string
  master: string
  renderEffect: RenderEffect
  renderMode: RenderMode
  renderAmmount: number
  renderColor: number[]
  zhltLightFlags: ZHLTLightFlags
  lightOrigin: string
  spawnFlags: ButtonTargetSpawnFlags
}
export enum ButtonTargetSpawnFlags {
  UseActivates = 1,
  StartOn = 2
}

export interface Cycler {
  classname: 'cycler'
  origin: number[]
  angles: number[]
  targetName: string
  model: string
  sequence: string
  renderEffect: RenderEffect
  renderMode: RenderMode
  renderAmmount: number
  renderColor: number[]
}

export interface CyclerSprite {
  classname: 'cycler_sprite'
  origin: number[]
  angles: number[]
  targetName: string
  model: string
  framerate: number
  renderEffect: RenderEffect
  renderMode: RenderMode
  renderAmmount: number
  renderColor: number[]
}

export interface CyclerWeapon {
  classname: 'cycler_weapon'
  origin: number[]
  angles: number[]
  target: string
  targetName: string
  triggerTarget: string
  triggerCondition: CyclerWeaponTriggerCondition
  model: string
  sequence: string
  renderEffect: RenderEffect
  renderMode: RenderMode
  renderAmmount: number
  renderColor: number[]
}

export enum CyclerWeaponTriggerCondition {
  NoTrigger = 0,
  SeePlayerMadAtPlayer = 1,
  TakeDamage = 2,
  HalfHealthRemaining = 3,
  Death = 4,
  HearWorld = 7,
  HearPlayer = 8,
  HearCombat = 9,
  SeePlayerUnconditional = 10,
  SeePlayerNotInCombat = 11
}

export interface CyclerWreckage {
  classname: 'cycler_wreckage'
  origin: number[]
  angles: number[]
  targetName: string
  model: string
  framerate: number
  scale: number
  renderEffect: RenderEffect
  renderMode: RenderMode
  renderAmmount: number
  renderColor: number[]
}

export interface EnvBeam {
  classname: 'env_beam',
  renderEffect: RenderEffect
  renderMode: RenderMode
  renderAmmount: number
  renderColor: number[]
  radius: number
	life: number
	boltWidth: number
	noiseAmplitude: number
	texture: string
	textureScroll: number
	frameRate: number
	frameStart: number
	strikeTime: number
	damage: number
	spawnFlags: EnvBeamSpawnFlags
}

export enum EnvBeamSpawnFlags {
  StartOn = 1,
  Toggle = 2,
  RandomStrike = 4,
  Ring = 8,
  StartSparks = 16,
  EndSparks = 32,
  DecalEnd = 64,
  FadeStart = 128,
  FadeEnd = 256
}

export enum ZHLTLightFlags {
  Normal = 0,
  EmbeddedFix = 1,
  OpaqueBlockLight = 2,
  OpaqueEmbeddedFix = 3,
  OpaqueConcaveFix = 6
}

export enum RenderEffect {
  Normal = 0,
	SlowPulse = 1, //* Additive or Texture mode only.
  FastPulse = 2, //* Additive or Texture mode only.
  SlowWidePulse = 3, //* Additive or Texture mode only.
  FastWidePulse = 4,  //* Additive or Texture mode only.
  SlowFadeAway = 5,
	FastFadeAway = 6,
  SlowBecomeSolid = 7,
  FastBecomeSolid = 8,
  SlowStrobe = 9,
  FastStrobe = 10,
  FasterStrobe = 11,
  SlowFlicker = 12,
  FastFlicker = 13,
  //* Constant Glow only affects the Glow rendermode. With this setting, Glow mode behaves
  //* exactly like Additive mode - except that (as is usual for Glow mode) the sprite isn't
  //* obscured by intervening sprites or models.
  ConstantGlow = 14,
  DistortModels = 15,
  HologramDistort = 16
}

export enum RenderMode {
  Normal = 0,
  Color = 1,
  Texture = 2,
  Glow = 3,
  Solid = 4,
  Additive = 5
}

const parseNumberArray = (a: string) => a.split(' ').map(b => parseFloat(b))

const parsers: {
  worldspawn: (entityData: {[name: string]: any}) => WorldSpawn
  aiscripted_sequence: (entityData: {[name: string]: any}) => AiScriptedSequence
  ambient_generic: (entityData: {[name: string]: any}) => AmbientGeneric
  ammo_357: (entityData: {[name: string]: any}) => Ammo357
  ammo_9mmAR: (entityData: {[name: string]: any}) => Ammo9mmAR
  ammo_9mmbox: (entityData: {[name: string]: any}) => Ammo9mmBox
  ammo_9mmclip: (entityData: {[name: string]: any}) => Ammo9mmClip
  ammo_ARgrenades: (entityData: {[name: string]: any}) => AmmoARGrenades
  ammo_buckshot: (entityData: {[name: string]: any}) => AmmoBuckShot
  ammo_crossbow: (entityData: {[name: string]: any}) => AmmoCrossBox
  ammo_gaussclip: (entityData: {[name: string]: any}) => AmmoGaussClip
  ammo_rpgclip: (entityData: {[name: string]: any}) => AmmoRPGClip
  button_target: (entityData: {[name: string]: any}) => ButtonTarget
  cycler: (entityData: {[name: string]: any}) => Cycler
  cycler_sprite: (entityData: {[name: string]: any}) => CyclerSprite
  cyclear_weapon: (entityData: {[name: string]: any}) => CyclerWeapon
  cyclear_wreckage: (entityData: {[name: string]: any}) => CyclerWreckage
  env_beam: (entityData: {[name: string]: any}) => EnvBeam
} = {
  worldspawn: (e) => ({
    classname: 'worldspawn',
    wad: e.wad
      .split(';')
      .filter((a: string) => a.length)
      .map((w: string) => w.replace(/\\/g, '/')),
    mapversion: parseInt(e.mapversion),
    skyname: e.skyname,
    maxRange: parseFloat(e.MaxRange) || 8192,
    message: e.message || '',
    sounds: parseInt(e.sounds) || 0,
    light: parseInt(e.light) || 0,
    waveHeight: parseFloat(e.WaveHeight) || 0,
    startDark: parseInt(e.startdark) || 0,
    newUnit: parseInt(e.newunit) || 0,
    defaultTeam: parseInt(e.defaultteam) || 0,
    gameTitle: parseInt(e.gametitle) || 0
  }),
  aiscripted_sequence: (e) => ({
    classname: 'aiscripted_sequence',
    spawnflags: parseInt(e.spawnflags),
    m_iszEntity: e.m_iszEntity,
    m_iszPlay: e.m_iszPlay || '',
    m_flRadius: parseInt(e.m_flRadius) || 512,
    m_flRepeat: parseInt(e.m_flRepeat) || 0,
    m_fMoveTo: parseInt(e.m_fMoveTo) || 0,
    m_iFinishSchedule: parseInt(e.m_iFinishSchedule) || 0,
  }),
  ambient_generic: (e) => ({
    classname: 'ambient_generic',
    origin: parseNumberArray(e.origin),
    targetName: e.targetname,
    message: e.message,
    health: parseInt(e.health) || 10,
    preset: parseInt(e.preset) || 0,
    startVolume: parseInt(e.volstart) || 0,
    fadeIn: parseInt(e.fadein),
    fadeOut: parseInt(e.fadeout),
    pitch: parseInt(e.pitch),
    pitchStart: parseInt(e.pitchstart),
    spinUp: parseInt(e.spinup),
    spinDown: parseInt(e.spindown),
    lfoType: parseInt(e.lfotype),
    lfoRate: parseInt(e.lforate),
    lfoModPitch: parseInt(e.lfomodpitch),
    lfoModVolume: parseInt(e.lfomodvolume),
    cSpinUp: parseInt(e.cspinup),
    spawnFlags: parseInt(e.spawnflags)
  }),
  ammo_357: (e) => ({
    classname: 'ammo_357',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_9mmAR: (e) => ({
    classname: 'ammo_9mmAR',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_9mmbox: (e) => ({
    classname: 'ammo_9mmbox',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_9mmclip: (e) => ({
    classname: 'ammo_9mmclip',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_ARgrenades: (e) => ({
    classname: 'ammo_ARgrenades',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_buckshot: (e) => ({
    classname: 'ammo_buckshot',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_crossbow: (e) => ({
    classname: 'ammo_crossbow',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_gaussclip: (e) => ({
    classname: 'ammo_gaussclip',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  ammo_rpgclip: (e) => ({
    classname: 'ammo_rpgclip',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname || '',
    delay: parseInt(e.delay) || 0,
    killTarget: e.killtarget || '',
    spawnFlags: e.spawnflags || 0
  }),
  button_target: (e) => ({
    classname: 'button_target',
    target: e.target,
    master: e.master,
    renderEffect: parseInt(e.renderfx) || 0,
    renderMode: parseInt(e.rendermode) || 0,
    renderAmmount: parseInt(e.renderamt) || 255,
    renderColor: parseNumberArray(e.rendercolor || '0 0 0'),
    zhltLightFlags: parseInt(e.zhlt_lightflags) || 0,
    lightOrigin: e.light_origin,
    spawnFlags: parseInt(e.spawnflags) || 1
  }),
  cycler: (e) => ({
    classname: 'cycler',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    targetName: e.targetname,
    model: e.model,
    sequence: e.sequence || '',
    renderEffect: parseInt(e.renderfx) || 0,
    renderMode: parseInt(e.rendermode) || 0,
    renderAmmount: parseInt(e.renderamt) || 255,
    renderColor: parseNumberArray(e.rendercolor || '0 0 0')
  }),
  cycler_sprite: (e) => ({
    classname: 'cycler_sprite',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    targetName: e.targetname,
    model: e.model,
    framerate: parseInt(e.framerate || '10'),
    renderEffect: parseInt(e.renderfx) || 0,
    renderMode: parseInt(e.rendermode) || 0,
    renderAmmount: parseInt(e.renderamt) || 255,
    renderColor: parseNumberArray(e.rendercolor || '0 0 0')
  }),
  cyclear_weapon: (e) => ({
    classname: 'cycler_weapon',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    target: e.target,
    targetName: e.targetname,
    triggerTarget: e.TriggerTarget || '',
    triggerCondition: parseInt(e.TriggerCondition) || 0,
    model: e.model,
    sequence: e.sequence,
    renderEffect: parseInt(e.renderfx) || 0,
    renderMode: parseInt(e.rendermode) || 0,
    renderAmmount: parseInt(e.renderamt) || 255,
    renderColor: parseNumberArray(e.rendercolor || '0 0 0')
  }),
  cyclear_wreckage: (e) => ({
    classname: 'cycler_wreckage',
    origin: parseNumberArray(e.origin),
    angles: parseNumberArray(e.angles),
    targetName: e.targetname,
    model: e.model,
    framerate: parseInt(e.framerate) || 10,
    scale: parseFloat(e.scale) || 1.0,
    renderEffect: parseInt(e.renderfx) || 0,
    renderMode: parseInt(e.rendermode) || 0,
    renderAmmount: parseInt(e.renderamt) || 255,
    renderColor: parseNumberArray(e.rendercolor || '0 0 0')
  }),
  env_beam: (e) => ({
    classname: 'env_beam',
    renderEffect: parseInt(e.renderfx) || 0,
    renderMode: parseInt(e.rendermode) || 0,
    renderAmmount: parseInt(e.renderamt) || 255,
    renderColor: parseNumberArray(e.rendercolor || '0 0 0'),
    radius: parseFloat(e.Radius) || 256,
    life: parseInt(e.life) || 1,
    boltWidth: parseInt(e.BoltWidth) || 20,
    noiseAmplitude: parseInt(e.NoiseAmplitude) || 0,
    texture: e.texture || 'sprites/laserbeam.spr',
    textureScroll: parseInt(e.TextureScroll) || 35,
    frameRate: parseInt(e.framerate) || 0,
    frameStart: parseInt(e.framestart) || 0,
    strikeTime: parseInt(e.StrikeTime) || 1,
    damage: parseInt(e.damage) || 1,
    spawnFlags: parseInt(e.spawnflags)
  })
}

// env_beverage (Half-Life)
// env_blood (Half-Life)
// env_bubbles (Half-Life)
// env_explosion (Half-Life)
// env_fade (Half-Life)
// env_funnel (Half-Life)
// env_global (Half-Life)
// env_glow (Half-Life)
// env_laser (Half-Life)
// env_message (Half-Life)
// env_render (Half-Life)
// env_shake (Half-Life)
// env_shooter (Half-Life)
// env_sound (Half-Life)
// env_spark (Half-Life)
// env_sprite (Half-Life)
// func_breakable (Half-Life)
// func_button (Half-Life)
// func_conveyor (Half-Life)
// func_door (Half-Life)
// func_door_rotating (Half-Life)
// func_friction (Half-Life)
// func_guntarget (Half-Life)
// func_healthcharge (Half-Life)
// func_illusionary (Half-Life)
// func_ladder (Half-Life)
// func_minicompo (Half-Life)
// func_monsterclip (Half-Life)
// func_mortar_field (Half-Life)
// func_pendulum (Half-Life)
// func_plat (Half-Life)
// func_platrot (Half-Life)
// func_pushable (Half-Life)
// func_recharge (Half-Life)
// func_rot_button (Half-Life)
// func_rotating (Half-Life)
// func_tank (Half-Life)
// func_tankcontrols (Half-Life)
// func_tanklaser (Half-Life)
// func_tankmortar (Half-Life)
// func_tankrocket (Half-Life)
// func_trackautochange (Half-Life)
// func_trackchange (Half-Life)
// func_tracktrain (Half-Life)
// func_train (Half-Life)
// func_traincontrols (Half-Life)
// func_wall (Half-Life)
// func_wall_toggle (Half-Life)
// func_water (Half-Life)
// game_counter (Half-Life)
// game_counter_set (Half-Life)
// game_end (Half-Life)
// game_player_equip (Half-Life)
// game_player_hurt (Half-Life)
// game_player_team (Half-Life)
// game_score (Half-Life)
// game_team_master (Half-Life)
// game_team_set (Half-Life)
// game_text (Half-Life)
// game_zone_player (Half-Life)
// gibshooter (Half-Life)
// info_bigmomma (Half-Life)
// info_intermission (Half-Life)
// info_landmark (Half-Life)
// info_node (Half-Life)
// info_node_air (Half-Life)
// info_null (Half-Life)
// info_player_coop (Half-Life)
// info_player_deathmatch (Half-Life)
// info_player_start (Half-Life)
// info_target (Half-Life)
// info_teleport_destination (Half-Life)
// info_texlights (Half-Life)
// infodecal (Half-Life)
// item_airtank (Half-Life)
// item_antidote (Half-Life)
// item_battery (Half-Life)
// item_healthkit (Half-Life)
// item_longjump (Half-Life)
// item_security (Half-Life)
// item_sodacan (Half-Life)
// item_suit (Half-Life)
// light (Half-Life)
// light_environment (Half-Life)
// light_spot (Half-Life)
// momentary_door (Half-Life)
// momentary_rot_button (Half-Life)
// monster_alien_controller (Half-Life)
// monster_alien_grunt (Half-Life)
// monster_alien_slave (Half-Life)
// monster_apache (Half-Life)
// monster_babycrab (Half-Life)
// monster_barnacle (Half-Life)
// monster_barney (Half-Life)
// monster_barney_dead (Half-Life)
// monster_bigmomma (Half-Life)
// monster_bloater (Half-Life)
// monster_bullchicken (Half-Life)
// monster_cockroach (Half-Life)
// monster_flyer_flock (Half-Life)
// monster_furniture (Half-Life)
// monster_gargantua (Half-Life)
// monster_generic (Half-Life)
// monster_gman (Half-Life)
// monster_grunt_repel (Half-Life)
// monster_handgrenade (Half-Life)
// monster_headcrab (Half-Life)
// monster_hevsuit_dead (Half-Life)
// monster_hgrunt_dead (Half-Life)
// monster_houndeye (Half-Life)
// monster_human_assassin (Half-Life)
// monster_human_grunt (Half-Life)
// monster_ichthyosaur (Half-Life)
// monster_leech (Half-Life)
// monster_miniturret (Half-Life)
// monster_nihilanth (Half-Life)
// monster_osprey (Half-Life)
// monster_rat (Half-Life)
// monster_satchelcharge (Half-Life)
// monster_scientist (Half-Life)
// monster_scientist_dead (Half-Life)
// monster_sentry (Half-Life)
// monster_sitting_scientist (Half-Life)
// monster_snark (Half-Life)
// monster_tentacle (Half-Life)
// monster_tripmine (Half-Life)
// monster_turret (Half-Life)
// monster_zombie (Half-Life)
// monstermaker (Half-Life)
// multi_manager (Half-Life)
// multisource (Half-Life)
// path_corner (Half-Life)
// path_track (Half-Life)
// player_loadsaved (Half-Life)
// player_weaponstrip (Half-Life)
// scripted_sentence (Half-Life)
// scripted_sequence (Half-Life)
// speaker (Half-Life)
// target_cdaudio (Half-Life)
// trigger_auto (Half-Life)
// trigger_autosave (Half-Life)
// trigger_camera (Half-Life)
// trigger_cdaudio (Half-Life)
// trigger_changelevel (Half-Life)
// trigger_changetarget (Half-Life)
// trigger_counter (Half-Life)
// trigger_endsection (Half-Life)
// trigger_gravity (Half-Life)
// trigger_hurt (Half-Life)
// trigger_monsterjump (Half-Life)
// trigger_multiple (Half-Life)
// trigger_once (Half-Life)
// trigger_push (Half-Life)
// trigger_relay (Half-Life)
// trigger_teleport (Half-Life)
// trigger_transition (Half-Life)
// weapon_357 (Half-Life)
// weapon_9mmAR (Half-Life)
// weapon_9mmhandgun (Half-Life)
// weapon_crossbow (Half-Life)
// weapon_crowbar (Half-Life)
// weapon_egon (Half-Life)
// weapon_gauss (Half-Life)
// weapon_handgrenade (Half-Life)
// weapon_hornetgun (Half-Life)
// weapon_rpg (Half-Life)
// weapon_satchel (Half-Life)
// weapon_shotgun (Half-Life)
// weapon_snark (Half-Life)
// weapon_tripmine (Half-Life)
// weaponbox (Half-Life)
// world_items (Half-Life)
// worldspawn (Half-Life)
// xen_hair (Half-Life)
// xen_plantlight (Half-Life)
// xen_spore_large (Half-Life)
// xen_spore_medium (Half-Life)
// xen_spore_small (Half-Life)
// xen_tree (Half-Life)

export interface FuncBreakable {
  classname: 'func_breakable'
}

export interface BadEntity {
  classname: '!'
  data: any
}

export interface UnknownEntity {
  classname: '?'
  originalClassname: string
  data: any
}

export type Entity = WorldSpawn | FuncBreakable | BadEntity | UnknownEntity

export class BspEntityParser {
  static parse(entities: any[]): Entity[] {
    const arr: Entity[] = []

    for (let i = 0; i < entities.length; ++i) {
      const e = entities[i]

      if (!e.classname) {
        arr.push({
          classname: '!',
          data: e
        })
      }

      if ((parsers as any)[e.classname]) {
        arr.push((parsers as any)[e.classname](e))
      } else {
        arr.push({
          classname: '?',
          originalClassname: e.classname,
          data: e
        })
      }
    }

    return arr
  }
}
