import { readCoord } from './readCoord'
import { readDelta } from './readDelta'
import { BitStream } from '../BitReader'
import { DeltaDecoderTable } from './DeltaDecoder'
import { Reader, ReaderDataType } from '../Reader'

type FrameDataHandler = (r: Reader, deltaDecoder: DeltaDecoderTable) => any

export class FrameDataReader {
  static bad() {
    throw new Error('Invalid message type')
  }

  static nop(): null {
    return null
  }

  static disconnect(r: Reader) {
    return {
      reason: r.str()
    }
  }

  static event(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    type Event = {
      index: number
      packetIndex?: number
      fireTime?: number
      delta?: { [name: string]: any }
    }

    let events: Event[] = []
    let eventCount = bs.readBits(5)
    for (let i = 0; i < eventCount; ++i) {
      let event: Event = {
        index: bs.readBits(10)
      }
      let packetIndexBit = bs.readBits(1)
      if (packetIndexBit) {
        event.packetIndex = bs.readBits(11)
        let deltaBit = bs.readBits(1)
        if (deltaBit) {
          event.delta = readDelta(bs, deltaDecoders['event_t'])
        }
      }
      let fireTimeBit = bs.readBits(1)
      if (fireTimeBit) {
        event.fireTime = bs.readBits(16)
      }

      events.push(event)
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return { events }
  }

  static version(r: Reader) {
    return {
      version: r.ui()
    }
  }

  static setView(r: Reader) {
    return {
      entityIndex: r.s()
    }
  }

  static sound(r: Reader) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    let flags = bs.readBits(9)

    let volume = 1
    if ((flags & 1) !== 0) {
      volume = bs.readBits(8) / 255
    }

    let attenuation = 1
    if ((flags & 2) !== 0) {
      attenuation = bs.readBits(8) / 64
    }

    let channel = bs.readBits(3)
    let entityIndex = bs.readBits(11)

    let soundIndex
    if ((flags & 4) !== 0) {
      soundIndex = bs.readBits(16)
    } else {
      soundIndex = bs.readBits(8)
    }

    let xFlag = bs.readBits(1)
    let yFlag = bs.readBits(1)
    let zFlag = bs.readBits(1)
    let xPosition
    let yPosition
    let zPosition
    if (xFlag) {
      xPosition = readCoord(bs)
    }
    if (yFlag) {
      yPosition = readCoord(bs)
    }
    if (zFlag) {
      zPosition = readCoord(bs)
    }

    let pitch = 1
    if ((flags & 8) !== 0) {
      pitch = bs.readBits(8)
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return {
      flags,
      volume,
      attenuation,
      channel,
      entityIndex,
      soundIndex,
      xPosition,
      yPosition,
      zPosition,
      pitch
    }
  }

  static time(r: Reader) {
    return {
      time: r.f()
    }
  }

  static print(r: Reader) {
    return {
      message: r.str()
    }
  }

  static stuffText(r: Reader) {
    let message = r.str()
    let commands = message.split(';').map(command => {
      let args = command
        .split(/\s*("[^"]+"|[^\s"]+)/)
        .map(arg => arg.replace(/^"(.*)"$/, '$1').trim())
        .filter(arg => arg)

      let func = args[0]
      let params = args.slice(1)

      return { func, params }
    })

    return { commands }
  }

  static setAngle(r: Reader) {
    return {
      pitch: r.s(),
      yaw: r.s(),
      roll: r.s()
    }
  }

  static serverInfo(r: Reader) {
    let info = {
      protocol: r.i(),
      spawnCount: r.i(), // map change count
      mapCrc: r.i(),
      clientDllHash: r.arrx(16, ReaderDataType.UByte),
      maxPlayers: r.ub(),
      playerIndex: r.ub(),
      isDeathmatch: r.ub(),
      gameDir: r.str(),
      hostName: r.str(),
      mapFileName: r.str(), // path to map relative in mod directory
      mapCycle: r.str()
    }
    r.skip(1) // skip padding

    return info
  }

  static lightStyle(r: Reader) {
    return {
      index: r.ub(),
      lightInfo: r.str()
    }
  }

  static updateUserInfo(r: Reader) {
    return {
      clientIndex: r.ub(),
      clientUserId: r.ui(),
      clientUserInfo: r.str(),
      clientCdKeyHash: r.arrx(16, ReaderDataType.UByte)
    }
  }

  static deltaDescription(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let data: {
      name: string
      fields: { [name: string]: any }[]
    } = {
      name: r.str(),
      fields: []
    }

    let bs = new BitStream(r.data.buffer)
    let fieldCount = r.us()
    bs.index = r.tell() * 8
    for (let i = 0; i < fieldCount; ++i) {
      data.fields.push(readDelta(bs, deltaDecoders['delta_description_t']))
    }
    deltaDecoders[data.name] = data.fields as any

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return data
  }

  static clientData(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    let deltaSequence = bs.readBits(1)
    if (deltaSequence) {
      // delta update mask
      bs.index += 8
    }

    let clientDataDecoder = deltaDecoders['clientdata_t']
    let clientData = readDelta(bs, clientDataDecoder)

    // TODO: weapon data
    let weaponDataDecoder = deltaDecoders['weapon_data_t']
    while (bs.readBits(1)) {
      bs.index += 6 // weapon index
      readDelta(bs, weaponDataDecoder) // weapon data
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return {
      clientData
    }
  }

  static stopSound(r: Reader) {
    return {
      entityIndex: r.s()
    }
  }

  static pings(r: Reader) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    let pings = []
    while (bs.readBits(1)) {
      pings.push({
        slot: bs.readBits(8),
        ping: bs.readBits(8),
        loss: bs.readBits(8)
      })
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return pings
  }

  static particle(r: Reader) {
    return {
      position: [r.s() / 8, r.s() / 8, r.s() / 8],
      direction: [r.b(), r.b(), r.b()],
      count: r.ub(),
      color: r.ub()
    }
  }

  static damage(): null {
    // unused
    return null
  }

  static spawnStatic(r: Reader) {
    let data: any = {
      modelIndex: r.s(),
      sequence: r.b(),
      frame: r.b(),
      colorMap: r.s(),
      skin: r.b(),
      position: [],
      rotation: []
    }
    data.position[0] = r.s() / 8
    data.rotation[0] = r.b() * (360 / 256)
    data.position[1] = r.s() / 8
    data.rotation[1] = r.b() * (360 / 256)
    data.position[2] = r.s() / 8
    data.rotation[2] = r.b() * (360 / 256)
    data.renderMode = r.b()
    if (data.renderMode) {
      data.renderAmt = r.b()
      data.renderColor = [r.ub(), r.ub(), r.ub()]
      data.renderFx = r.b()
    }

    return data
  }

  static eventReliable(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    let eventIndex = bs.readBits(10)
    let eventData = readDelta(bs, deltaDecoders['event_t'])
    let delayBit = bs.readBits(1)
    let delay
    if (delayBit) {
      delay = bs.readBits(16)
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return {
      eventIndex,
      eventData,
      delayBit,
      delay
    }
  }

  static spawnBaseLine(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    let entities = []
    while (true) {
      let entityIdx = bs.readBits(11)
      if (entityIdx === (1 << 11) - 1) {
        break
      }

      let entityType = bs.readBits(2)
      let entityTypeString
      if (entityType & 1) {
        if (entityIdx > 0 && entityIdx <= 32) {
          entityTypeString = 'entity_state_player_t'
        } else {
          entityTypeString = 'entity_state_t'
        }
      } else {
        entityTypeString = 'custom_entity_state_t'
      }

      entities[entityIdx] = readDelta(bs, deltaDecoders[entityTypeString])
    }

    let footer = bs.readBits(5)
    if (footer !== (1 << 5) - 1) {
      throw new Error('Bad spawnbaseline')
    }

    let nExtraData = bs.readBits(6)
    let extraData = []
    for (let i = 0; i < nExtraData; ++i) {
      extraData.push(readDelta(bs, deltaDecoders['entity_state_t']))
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return {
      entities,
      extraData
    }
  }

  static tempEntity(r: Reader) {
    const TE_BEAMPOINTS = 0 // Beam effect between two points
    const TE_BEAMENTPOINT = 1 // Beam effect between point and entity
    const TE_GUNSHOT = 2 // Particle effect plus ricochet sound
    const TE_EXPLOSION = 3 // Additive sprite, 2 dynamic lights, flickering particles, explosion sound, move vertically 8 pps
    const TE_TAREXPLOSION = 4 // Quake1 "tarbaby" explosion with sound
    const TE_SMOKE = 5 // Alphablend sprite, move vertically 30 pps
    const TE_TRACER = 6 // Tracer effect from point to point
    const TE_LIGHTNING = 7 // TE_BEAMPOINTS with simplified parameters
    const TE_BEAMENTS = 8
    const TE_SPARKS = 9 // 8 random tracers with gravity, ricochet sprite
    const TE_LAVASPLASH = 10 // Quake1 lava splash
    const TE_TELEPORT = 11 // Quake1 teleport splash
    const TE_EXPLOSION2 = 12 // Quake1 colormaped (base palette) particle explosion with sound
    const TE_BSPDECAL = 13 // Decal from the .BSP file
    const TE_IMPLOSION = 14 // Tracers moving toward a point
    const TE_SPRITETRAIL = 15 // Line of moving glow sprites with gravity, fadeout, and collisions
    const TE_SPRITE = 17 // Additive sprite, plays 1 cycle
    const TE_BEAMSPRITE = 18 // A beam with a sprite at the end
    const TE_BEAMTORUS = 19 // Screen aligned beam ring, expands to max radius over lifetime
    const TE_BEAMDISK = 20 // Disk that expands to max radius over lifetime
    const TE_BEAMCYLINDER = 21 // Cylinder that expands to max radius over lifetime
    const TE_BEAMFOLLOW = 22 // Create a line of decaying beam segments until entity stops moving
    const TE_GLOWSPRITE = 23
    const TE_BEAMRING = 24 // Connect a beam ring to two entities
    const TE_STREAK_SPLASH = 25 // Oriented shower of tracers
    const TE_DLIGHT = 27 // Dynamic light, effect world, minor entity effect
    const TE_ELIGHT = 28 // Point entity light, no world effect
    const TE_TEXTMESSAGE = 29
    const TE_LINE = 30
    const TE_BOX = 31
    const TE_KILLBEAM = 99 // Kill all beams attached to entity
    const TE_LARGEFUNNEL = 100
    const TE_BLOODSTREAM = 101 // Particle spray
    const TE_SHOWLINE = 102 // Line of particles every 5 units, dies in 30 seconds
    const TE_BLOOD = 103 // Particle spray
    const TE_DECAL = 104 // Decal applied to a brush entity (not the world)
    const TE_FIZZ = 105 // Create alpha sprites inside of entity, float upwards
    const TE_MODEL = 106 // Create a moving model that bounces and makes a sound when it hits
    const TE_EXPLODEMODEL = 107 // Spherical shower of models, picks from set
    const TE_BREAKMODEL = 108 // Box of models or sprites
    const TE_GUNSHOTDECAL = 109 // Decal and ricochet sound
    const TE_SPRITE_SPRAY = 110 // Spray of alpha sprites
    const TE_ARMOR_RICOCHET = 111 // Quick spark sprite, client ricochet sound.
    const TE_PLAYERDECAL = 112
    const TE_BUBBLES = 113 // Create alpha sprites inside of box, float upwards
    const TE_BUBBLETRAIL = 114 // Create alpha sprites along a line, float upwards
    const TE_BLOODSPRITE = 115 // Spray of opaque sprite1's that fall, single sprite2 for 1..2 secs (this is a high-priority tent)
    const TE_WORLDDECAL = 116 // Decal applied to the world brush
    const TE_WORLDDECALHIGH = 117 // Decal (with texture index > 256) applied to world brush
    const TE_DECALHIGH = 118 // Same as TE_DECAL, but the texture index was greater than 256
    const TE_PROJECTILE = 119 // Makes a projectile (like a nail) (this is a high-priority tent)
    const TE_SPRAY = 120 // Throws a shower of sprites or models
    const TE_PLAYERSPRITES = 121 // Sprites emit from a player's bounding box (ONLY use for players!)
    const TE_PARTICLEBURST = 122 // Very similar to lavasplash
    const TE_FIREFIELD = 123 // Makes a field of fire
    const TE_PLAYERATTACHMENT = 124 // Attaches a TENT to a player (this is a high-priority tent)
    const TE_KILLPLAYERATTACHMENTS = 125 // Will expire all TENTS attached to a player.
    const TE_MULTIGUNSHOT = 126 // Much more compact shotgun message
    const TE_USERTRACER = 127 // Larger message than the standard tracer, but allows some customization.

    let type = r.ub()
    let data: any = {}
    switch (type) {
      case TE_BEAMPOINTS: {
        r.skip(24)
        break
      }

      case TE_BEAMENTPOINT: {
        r.skip(20)
        break
      }

      case TE_GUNSHOT: {
        r.skip(6)
        break
      }

      case TE_EXPLOSION: {
        r.skip(11)
        break
      }

      case TE_TAREXPLOSION: {
        r.skip(6)
        break
      }

      case TE_SMOKE: {
        r.skip(10)
        break
      }

      case TE_TRACER: {
        r.skip(12)
        break
      }

      case TE_LIGHTNING: {
        r.skip(17)
        break
      }

      case TE_BEAMENTS: {
        r.skip(16)
        break
      }

      case TE_SPARKS: {
        r.skip(6)
        break
      }

      case TE_LAVASPLASH: {
        r.skip(6)
        break
      }

      case TE_TELEPORT: {
        r.skip(6)
        break
      }

      case TE_EXPLOSION2: {
        r.skip(8)
        break
      }

      case TE_BSPDECAL: {
        r.skip(8)
        let entityIndex = r.s()
        if (entityIndex) {
          r.skip(2)
        }
        break
      }

      case TE_IMPLOSION: {
        r.skip(9)
        break
      }

      case TE_SPRITETRAIL: {
        r.skip(19)
        break
      }

      case TE_SPRITE: {
        r.skip(10)
        break
      }

      case TE_BEAMSPRITE: {
        r.skip(16)
        break
      }

      case TE_BEAMTORUS: {
        r.skip(24)
        break
      }

      case TE_BEAMDISK: {
        r.skip(24)
        break
      }

      case TE_BEAMCYLINDER: {
        r.skip(24)
        break
      }

      case TE_BEAMFOLLOW: {
        r.skip(10)
        break
      }

      case TE_GLOWSPRITE: {
        r.skip(11)
        break
      }

      case TE_BEAMRING: {
        r.skip(16)
        break
      }

      case TE_STREAK_SPLASH: {
        r.skip(19)
        break
      }

      case TE_DLIGHT: {
        r.skip(12)
        break
      }

      case TE_ELIGHT: {
        r.skip(16)
        break
      }

      case TE_TEXTMESSAGE: {
        data.channel = r.b()
        data.x = r.s()
        data.y = r.s()
        data.effect = r.b()
        data.textColor = [r.ub(), r.ub(), r.ub(), r.ub()]
        data.effectColor = [r.ub(), r.ub(), r.ub(), r.ub()]
        data.fadeInTime = r.s()
        data.fadeOutTime = r.s()
        data.holdTime = r.s()
        if (data.effect) {
          data.effectTime = r.s()
        }
        data.message = r.str()
        break
      }

      case TE_LINE: {
        r.skip(17)
        break
      }

      case TE_BOX: {
        r.skip(17)
        break
      }

      case TE_KILLBEAM: {
        r.skip(2)
        break
      }

      case TE_LARGEFUNNEL: {
        r.skip(10)
        break
      }

      case TE_BLOODSTREAM: {
        r.skip(14)
        break
      }

      case TE_SHOWLINE: {
        r.skip(12)
        break
      }

      case TE_BLOOD: {
        r.skip(14)
        break
      }

      case TE_DECAL: {
        r.skip(9)
        break
      }

      case TE_FIZZ: {
        r.skip(5)
        break
      }

      case TE_MODEL: {
        r.skip(17)
        break
      }

      case TE_EXPLODEMODEL: {
        r.skip(13)
        break
      }

      case TE_BREAKMODEL: {
        r.skip(24)
        break
      }

      case TE_GUNSHOTDECAL: {
        r.skip(9)
        break
      }

      case TE_SPRITE_SPRAY: {
        r.skip(17)
        break
      }

      case TE_ARMOR_RICOCHET: {
        r.skip(7)
        break
      }

      case TE_PLAYERDECAL: {
        r.skip(10)
        break
      }

      case TE_BUBBLES: {
        r.skip(19)
        break
      }

      case TE_BUBBLETRAIL: {
        r.skip(19)
        break
      }

      case TE_BLOODSPRITE: {
        r.skip(12)
        break
      }

      case TE_WORLDDECAL: {
        r.skip(7)
        break
      }

      case TE_WORLDDECALHIGH: {
        r.skip(7)
        break
      }

      case TE_DECALHIGH: {
        r.skip(9)
        break
      }

      case TE_PROJECTILE: {
        r.skip(16)
        break
      }

      case TE_SPRAY: {
        r.skip(18)
        break
      }

      case TE_PLAYERSPRITES: {
        r.skip(5)
        break
      }

      case TE_PARTICLEBURST: {
        r.skip(10)
        break
      }

      case TE_FIREFIELD: {
        r.skip(9)
        break
      }

      case TE_PLAYERATTACHMENT: {
        r.skip(7)
        break
      }

      case TE_KILLPLAYERATTACHMENTS: {
        r.skip(1)
        break
      }

      case TE_MULTIGUNSHOT: {
        r.skip(18)
        break
      }

      case TE_USERTRACER: {
        r.skip(15)
        break
      }

      default: {
        throw new Error('Unknown temp entity type')
      }
    }

    return data
  }

  static setPause(r: Reader) {
    return {
      isPaused: r.b()
    }
  }

  static signOnNum(r: Reader) {
    return {
      sign: r.b()
    }
  }

  static centerPrint(r: Reader) {
    return {
      message: r.str()
    }
  }

  static killedMonster(): null {
    // unused
    return null
  }

  static foundSecret(): null {
    // unused
    return null
  }

  static spawnStaticSound(r: Reader) {
    return {
      position: [r.s() / 8, r.s() / 8, r.s() / 8],
      soundIndex: r.us(),
      volume: r.ub() / 255,
      attenuation: r.ub() / 64,
      entityIndex: r.us(),
      pitch: r.ub(),
      flags: r.ub()
    }
  }

  static intermission(): null {
    // has no arguments
    return null
  }

  static finale(r: Reader) {
    return {
      text: r.str()
    }
  }

  static cdTrack(r: Reader) {
    return {
      track: r.b(),
      loopTrack: r.b()
    }
  }

  static restore(r: Reader) {
    let saveName = r.str()
    let mapCount = r.ub()
    let maps = []
    for (let i = 0; i < mapCount; ++i) {
      maps.push(r.str())
    }

    return { saveName, maps }
  }

  static cutscene(r: Reader) {
    return {
      text: r.str()
    }
  }

  static weaponAnim(r: Reader) {
    return {
      sequenceNumber: r.b(),
      weaponModelBodyGroup: r.b()
    }
  }

  static decalName(r: Reader) {
    return {
      positionIndex: r.ub(),
      decalName: r.str()
    }
  }

  static roomType(r: Reader) {
    return {
      type: r.us()
    }
  }

  static addAngle(r: Reader) {
    // NOTE: not sure if (360/65536) or (65536/360)
    return {
      angleToAdd: r.s() / (360 / 65536)
    }
  }

  static newUserMsg(r: Reader) {
    return {
      index: r.ub(),
      size: r.b(),
      name: r.nstr(16)
    }
  }

  static packetEntities(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    let entityStates = []
    bs.readBits(16) // skip entity count (unreliable)
    let entityNumber = 0
    while (true) {
      let footer = bs.readBits(16)
      if (footer === 0) {
        break
      }

      bs.index -= 16

      let entityNumberIncrement = bs.readBits(1)
      if (!entityNumberIncrement) {
        let absoluteEntityNumber = bs.readBits(1)
        if (absoluteEntityNumber) {
          entityNumber = bs.readBits(11)
        } else {
          entityNumber += bs.readBits(6)
        }
      } else {
        entityNumber++
      }

      let custom = bs.readBits(1)
      let useBaseline = bs.readBits(1)
      if (useBaseline) {
        bs.index += 6 // baseline index
      }

      let entityType = 'entity_state_t'
      if (entityNumber > 0 && entityNumber <= 32) {
        entityType = 'entity_state_player_t'
      } else if (custom) {
        entityType = 'custom_entity_state_t'
      }

      entityStates.push(readDelta(bs, deltaDecoders[entityType]))
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return { entityStates }
  }

  static deltaPacketEntities(r: Reader, deltaDecoders: DeltaDecoderTable) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    bs.readBits(16) // skip entity count (unreliable)
    bs.index += 8 // either updatemask or delta sequence number

    let entityStates = []
    let entityIdx = 0
    while (true) {
      let footer = bs.readBits(16)
      if (footer === 0) {
        break
      }

      bs.index -= 16

      let removeEntity = bs.readBits(1)
      let absoluteEntityNumber = bs.readBits(1)
      if (absoluteEntityNumber) {
        entityIdx = bs.readBits(11)
      } else {
        entityIdx += bs.readBits(6)
      }

      if (removeEntity) {
        continue
      }

      let custom = bs.readBits(1)
      let entityType = 'entity_state_t'
      if (entityIdx > 0 && entityIdx < 32) {
        entityType = 'entity_state_player_t'
      } else if (custom) {
        entityType = 'custom_entity_state_t'
      }

      entityStates[entityIdx] = readDelta(bs, deltaDecoders[entityType])
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return { entityStates }
  }

  static choke(): null {
    // no arguments
    return null
  }

  static resourceList(r: Reader) {
    let bs = new BitStream(r.data.buffer)
    bs.index = r.tell() * 8

    // TODO: extract more data???

    let entries = []
    let entryCount = bs.readBits(12)
    for (let i = 0; i < entryCount; ++i) {
      let entry: any = {}
      entry.type = bs.readBits(4)
      entry.name = bs.readString()
      entry.index = bs.readBits(12)
      entry.size = bs.readBits(24)

      let flags = bs.readBits(3)
      if (flags & 4) {
        // TODO: entry.md5hash = read 128 bits
        bs.index += 128
      }

      // 1 bit = boolean hasExtraInfo
      if (bs.readBits(1)) {
        // 32 bytes extraInfo
        bs.index += 256
      }

      entries.push(entry)
    }

    if (bs.readBits(1)) {
      while (bs.readBits(1)) {
        let nBits = bs.readBits(1) ? 5 : 10
        bs.index += nBits
      }
    }

    if (bs.index % 8 > 0) {
      r.seek(Math.floor(bs.index / 8) + 1)
    } else {
      r.seek(bs.index / 8)
    }

    return entries
  }

  static newMoveVars(r: Reader) {
    return {
      gravity: r.f(),
      stopSpeed: r.f(),
      maxSpeed: r.f(),
      spectatorMaxSpeed: r.f(),
      acceleration: r.f(),
      airAcceleration: r.f(),
      waterAcceleration: r.f(),
      friction: r.f(),
      edgeFriction: r.f(),
      waterFriction: r.f(),
      entityGravity: r.f(),
      bounce: r.f(),
      stepSize: r.f(),
      maxVelocity: r.f(),
      zMax: r.f(),
      waveHeight: r.f(),
      footsteps: r.b(),
      rollAngle: r.f(),
      rollSpeed: r.f(),
      skyColor: [r.f(), r.f(), r.f()],
      skyVec: [r.f(), r.f(), r.f()],
      skyName: r.str()
    }
  }

  static resourceRequest(r: Reader) {
    let data = {
      spawnCount: r.i()
    }
    r.skip(4) // unknown (always 0)

    return data
  }

  static customization(r: Reader) {
    let playerIndex = r.ub()
    let type = r.ub()
    let name = r.str()
    let index = r.us()
    let downloadSize = r.ui()
    let flags = r.ub()
    let md5hash
    if (flags & 4) {
      md5hash = [r.i(), r.i(), r.i(), r.i()]
    }

    return {
      playerIndex,
      type,
      name,
      index,
      downloadSize,
      flags,
      md5hash
    }
  }

  static crosshairAngle(r: Reader) {
    return {
      pitch: r.b(),
      yaw: r.b()
    }
  }

  static soundFade(r: Reader) {
    return {
      initialPercent: r.ub(),
      holdTime: r.ub(),
      fadeOutTime: r.ub(),
      fadeInTime: r.ub()
    }
  }

  static fileTxferFailed(r: Reader) {
    return {
      filename: r.str()
    }
  }

  static hltv(r: Reader) {
    return {
      mode: r.ub()
    }
  }

  static director(r: Reader) {
    let length = r.ub()
    return {
      flag: r.ub(),
      message: r.nstr(length - 1)
    }
  }

  static voiceInit(r: Reader) {
    return {
      codecName: r.str(),
      quality: r.b()
    }
  }

  static voiceData(r: Reader) {
    let playerIndex = r.ub()
    let size = r.us()
    let data = r.arrx(size, ReaderDataType.UByte)
    return { playerIndex, data }
  }

  static sendExtraInfo(r: Reader) {
    return {
      fallbackDir: r.str(),
      canCheat: r.ub()
    }
  }

  static timeScale(r: Reader) {
    return {
      timeScale: r.f()
    }
  }

  static resourceLocation(r: Reader) {
    return {
      url: r.str()
    }
  }

  static sendCvarValue(r: Reader) {
    // deprecated
    return {
      name: r.str()
    }
  }

  static sendCvarValue2(r: Reader) {
    return {
      requestId: r.ui(),
      name: r.str()
    }
  }

  static read(r: Reader, type: number, deltaDecoders: DeltaDecoderTable) {
    if (type === 0) {
      // SVC_BAD shouldn't happen
      return null
    }

    const handler = FrameDataReader.handlers[type]
    if (handler) {
      return handler(r, deltaDecoders)
    } else {
      return null
    }
  }

  // prettier-ignore
  static readonly handlers: FrameDataHandler[] = [
    FrameDataReader.bad,                 // SVC_BAD                      0
    FrameDataReader.nop,                 // SVC_NOP                      1
    FrameDataReader.disconnect,          // SVC_DISCONNECT               2
    FrameDataReader.event,               // SVC_EVENT                    3
    FrameDataReader.version,             // SVC_VERSION                  4
    FrameDataReader.setView,             // SVC_SETVIEW                  5
    FrameDataReader.sound,               // SVC_SOUND                    6
    FrameDataReader.time,                // SVC_TIME                     7
    FrameDataReader.print,               // SVC_PRINT                    8
    FrameDataReader.stuffText,           // SVC_STUFFTEXT                9
    FrameDataReader.setAngle,            // SVC_SETANGLE                10
    FrameDataReader.serverInfo,          // SVC_SERVERINFO              11
    FrameDataReader.lightStyle,          // SVC_LIGHTSTYLE              12
    FrameDataReader.updateUserInfo,      // SVC_UPDATEUSERINFO          13
    FrameDataReader.deltaDescription,    // SVC_DELTADESCRIPTION        14
    FrameDataReader.clientData,          // SVC_CLIENTDATA              15
    FrameDataReader.stopSound,           // SVC_STOPSOUND               16
    FrameDataReader.pings,               // SVC_PINGS                   17
    FrameDataReader.particle,            // SVC_PARTICLE                18
    FrameDataReader.damage,              // SVC_DAMAGE                  19
    FrameDataReader.spawnStatic,         // SVC_SPAWNSTATIC             20
    FrameDataReader.eventReliable,       // SVC_EVENT_RELIABLE          21
    FrameDataReader.spawnBaseLine,       // SVC_SPAWNBASELINE           22
    FrameDataReader.tempEntity,          // SVC_TEMPENTITY              23
    FrameDataReader.setPause,            // SVC_SETPAUSE                24
    FrameDataReader.signOnNum,           // SVC_SIGNONNUM               25
    FrameDataReader.centerPrint,         // SVC_CENTERPRINT             26
    FrameDataReader.killedMonster,       // SVC_KILLEDMONSTER           27
    FrameDataReader.foundSecret,         // SVC_FOUNDSECRET             28
    FrameDataReader.spawnStaticSound,    // SVC_SPAWNSTATICSOUND        29
    FrameDataReader.intermission,        // SVC_INTERMISSION            30
    FrameDataReader.finale,              // SVC_FINALE                  31
    FrameDataReader.cdTrack,             // SVC_CDTRACK                 32
    FrameDataReader.restore,             // SVC_RESTORE                 33
    FrameDataReader.cutscene,            // SVC_CUTSCENE                34
    FrameDataReader.weaponAnim,          // SVC_WEAPONANIM              35
    FrameDataReader.decalName,           // SVC_DECALNAME               36
    FrameDataReader.roomType,            // SVC_ROOMTYPE                37
    FrameDataReader.addAngle,            // SVC_ADDANGLE                38
    FrameDataReader.newUserMsg,          // SVC_NEWUSERMSG              39
    FrameDataReader.packetEntities,      // SVC_PACKETENTITIES          40
    FrameDataReader.deltaPacketEntities, // SVC_DELTAPACKETENTITIES     41
    FrameDataReader.choke,               // SVC_CHOKE                   42
    FrameDataReader.resourceList,        // SVC_RESOURCELIST            43
    FrameDataReader.newMoveVars,         // SVC_NEWMOVEVARS             44
    FrameDataReader.resourceRequest,     // SVC_RESOURCEREQUEST         45
    FrameDataReader.customization,       // SVC_CUSTOMIZATION           46
    FrameDataReader.crosshairAngle,      // SVC_CROSSHAIRANGLE          47
    FrameDataReader.soundFade,           // SVC_SOUNDFADE               48
    FrameDataReader.fileTxferFailed,     // SVC_FILETXFERFAILED         49
    FrameDataReader.hltv,                // SVC_HLTV                    50
    FrameDataReader.director,            // SVC_DIRECTOR                51
    FrameDataReader.voiceInit,           // SVC_VOICEINIT               52
    FrameDataReader.voiceData,           // SVC_VOICEDATA               53
    FrameDataReader.sendExtraInfo,       // SVC_SENDEXTRAINFO           54
    FrameDataReader.timeScale,           // SVC_TIMESCALE               55
    FrameDataReader.resourceLocation,    // SVC_RESOURCELOCATION        56
    FrameDataReader.sendCvarValue,       // SVC_SENDCVARVALUE           57
    FrameDataReader.sendCvarValue2       // SVC_SENDCVARVALUE2          58
  ]
}

export namespace FrameDataReader {
  export enum SVC {
    BAD = 0,
    NOP = 1,
    DISCONNECT = 2,
    EVENT = 3,
    VERSION = 4,
    SETVIEW = 5,
    SOUND = 6,
    TIME = 7,
    PRINT = 8,
    STUFFTEXT = 9,
    SETANGLE = 10,
    SERVERINFO = 11,
    LIGHTSTYLE = 12,
    UPDATEUSERINFO = 13,
    DELTADESCRIPTION = 14,
    CLIENTDATA = 15,
    STOPSOUND = 16,
    PINGS = 17,
    PARTICLE = 18,
    DAMAGE = 19,
    SPAWNSTATIC = 20,
    EVENT_RELIABLE = 21,
    SPAWNBASELINE = 22,
    TEMPENTITY = 23,
    SETPAUSE = 24,
    SIGNONNUM = 25,
    CENTERPRINT = 26,
    KILLEDMONSTER = 27,
    FOUNDSECRET = 28,
    SPAWNSTATICSOUND = 29,
    INTERMISSION = 30,
    FINALE = 31,
    CDTRACK = 32,
    RESTORE = 33,
    CUTSCENE = 34,
    WEAPONANIM = 35,
    DECALNAME = 36,
    ROOMTYPE = 37,
    ADDANGLE = 38,
    NEWUSERMSG = 39,
    PACKETENTITIES = 40,
    DELTAPACKETENTITIES = 41,
    CHOKE = 42,
    RESOURCELIST = 43,
    NEWMOVEVARS = 44,
    RESOURCEREQUEST = 45,
    CUSTOMIZATION = 46,
    CROSSHAIRANGLE = 47,
    SOUNDFADE = 48,
    FILETXFERFAILED = 49,
    HLTV = 50,
    DIRECTOR = 51,
    VOICEINIT = 52,
    VOICEDATA = 53,
    SENDEXTRAINFO = 54,
    TIMESCALE = 55,
    RESOURCELOCATION = 56,
    SENDCVARVALUE = 57,
    SENDCVARVALUE2 = 58
  }
}
