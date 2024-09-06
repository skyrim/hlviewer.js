import { ReplayMap } from './ReplayMap'
import { ReplayChunk } from './ReplayChunk'
import { ReplayState } from './ReplayState'
import * as FrameData from './FrameDataReader'
import { Reader, ReaderDataType } from '../Reader'
import { getInitialDeltaDecoders } from './readDelta'

const checkType = (r: Reader) => {
  const magic = r.nstr(8)
  return magic === 'HLDEMO'
}

const readHeader = (r: Reader) => ({
  demoProtocol: r.ui(),
  netProtocol: r.ui(),
  mapName: r.nstr(260),
  modName: r.nstr(260),
  mapCrc: r.i(),
  dirOffset: r.ui()
})

const readDirectories = (r: Reader, offset: number) => {
  r.seek(offset)

  const count = r.ui()
  const directories = []
  for (let i = 0; i < count; ++i) {
    directories.push({
      id: r.ui(),
      name: r.nstr(64),
      flags: r.ui(),
      cdTrack: r.i(),
      time: r.f(),
      frames: r.ui(),
      offset: r.ui(),
      length: r.ui()
    })
  }

  return directories
}

const readFrameData = (r: Reader, deltaDecoders: any, customMessages: any) => {
  const length = r.ui()
  const limit = r.tell() + length
  const data = []
  while (r.tell() < limit) {
    const type = r.ub()
    if (type === 1) {
      continue
    }

    if (type >= 64) {
      if (customMessages[type] && customMessages[type].size > -1) {
        r.skip(customMessages[type].size)
      } else {
        r.skip(r.ub())
      }

      continue
    }

    const message = FrameData.readFrame(r, type, deltaDecoders)
    if (message) {
      if (type === 39) {
        customMessages[message.index] = message
      }
      data.push({
        type,
        data: message
      })
    } else {
      r.seek(limit)
    }
  }

  // just in case
  r.seek(limit)

  return data
}

const readFrame = (r: Reader, deltaDecoders: any, customMessages: any) => {
  const frame: any = {
    type: r.ub(),
    time: r.f(),
    tick: r.ui()
  }

  switch (frame.type) {
    case 0:
    case 1: {
      r.skip(4)
      frame.camera = {
        position: [r.f(), r.f(), r.f()],
        orientation: [r.f(), r.f(), r.f()]
      }
      r.skip(436)
      frame.data = readFrameData(r, deltaDecoders, customMessages)
      break
    }
    case 2: {
      break
    }
    case 3: {
      frame.command = r.nstr(64)
      break
    }
    case 4: {
      r.skip(32)
      break
    }
    case 5: {
      break
    }
    case 6: {
      r.skip(84)
      break
    }
    case 7: {
      r.skip(8)
      break
    }
    case 8: {
      frame.sound = {
        channel: r.i(),
        sample: r.nstr(r.ui()),
        attenuation: r.f(),
        volume: r.f(),
        flags: r.ui(),
        pitch: r.i()
      }
      break
    }
    case 9: {
      r.skip(r.ui())
      break
    }
    default: {
      frame.error = true
      break
    }
  }

  return frame
}

export class Replay {
  header: any
  mapName: string
  directories: any

  constructor(header: any, directories: any) {
    this.header = header
    this.mapName = this.header.mapName
    this.directories = directories
  }

  static parseFromArrayBuffer(buffer: ArrayBuffer) {
    const r = new Reader(buffer)
    const magic = r.nstr(8)
    if (magic !== 'HLDEMO') {
      throw new Error('Invalid replay format')
    }

    const header: any = {}
    header.demoProtocol = r.ui()
    header.netProtocol = r.ui()
    header.mapName = r.nstr(260)
    header.modName = r.nstr(260)
    header.mapCrc = r.i()
    header.dirOffset = r.ui()

    r.seek(header.dirOffset)
    const directoryCount = r.ui()
    const directories: any[] = []
    for (let i = 0; i < directoryCount; ++i) {
      directories.push({
        id: r.ui(),
        name: r.nstr(64),
        flags: r.ui(),
        cdTrack: r.i(),
        time: r.f(),
        frames: r.ui(),
        offset: r.ui(),
        length: r.ui(),
        macros: []
      })
    }

    for (let i = 0; i < directories.length; ++i) {
      r.seek(directories[i].offset)

      let isFinalMacroReached = false
      while (!isFinalMacroReached) {
        const macro: any = {
          type: r.b(),
          time: r.f(),
          frame: r.ui()
        }

        switch (macro.type) {
          case 0:
          case 1: {
            r.skip(4)
            macro.camera = {
              position: [r.f(), r.f(), r.f()],
              orientation: [r.f(), r.f(), r.f()]
            }
            r.skip(436)
            r.skip(r.ui())
            break
          }

          case 2: {
            // empty macro
            // signals the beginning of directory entry
            break
          }

          case 3: {
            macro.command = r.nstr(64)
            break
          }

          case 4: {
            r.skip(32)
            break
          }

          case 5: {
            // empty macro that signals end of directory entry
            isFinalMacroReached = true
            break
          }

          case 6: {
            r.skip(84)
            break
          }

          case 7: {
            r.skip(8)
            break
          }

          case 8: {
            r.skip(4)
            r.skip(r.ui() + 16)
            break
          }

          case 9: {
            r.skip(r.ui())
            break
          }

          default: {
            const offset = Number(r.tell() - 9).toString(16)
            const msg = [`Unexpected macro (${macro.type})`, ` at offset = ${offset}.`].join('')
            throw new Error(msg)
          }
        }

        directories[i].macros.push(macro)
      }
    }

    return new Replay(header, directories)
  }

  static parseFullFromArrayBuffer(buffer: ArrayBuffer) {
    const r = new Reader(buffer)
    const magic = r.nstr(8)
    if (magic !== 'HLDEMO') {
      throw new Error('Invalid replay format')
    }

    const header: any = {}
    header.demoProtocol = r.ui()
    header.netProtocol = r.ui()
    header.mapName = r.nstr(260)
    header.modName = r.nstr(260)
    header.mapCrc = r.i()
    header.dirOffset = r.ui()

    r.seek(header.dirOffset)
    const directoryCount = r.ui()
    const directories: any[] = []
    for (let i = 0; i < directoryCount; ++i) {
      directories.push({
        id: r.ui(),
        name: r.nstr(64),
        flags: r.ui(),
        cdTrack: r.i(),
        time: r.f(),
        frames: r.ui(),
        offset: r.ui(),
        length: r.ui(),
        macros: []
      })
    }

    const deltaDecoders = getInitialDeltaDecoders()

    const customMessages = []

    for (let i = 0; i < directories.length; ++i) {
      r.seek(directories[i].offset)

      let isFinalMacroReached = false
      while (!isFinalMacroReached) {
        const macro: any = {
          type: r.b(),
          time: r.f(),
          frame: r.ui()
        }
        switch (macro.type) {
          case 0:
          case 1: {
            r.skip(4)
            macro.camera = {
              position: [r.f(), r.f(), r.f()],
              orientation: [r.f(), r.f(), r.f()],
              forward: [r.f(), r.f(), r.f()],
              right: [r.f(), r.f(), r.f()],
              up: [r.f(), r.f(), r.f()]
            }

            macro.RefParams = {
              frametime: r.f(),
              time: r.f(),
              intermission: r.i(),
              paused: r.i(),
              spectator: r.i(),
              onground: r.i(),
              waterlevel: r.i(),
              velocity: [r.f(), r.f(), r.f()],
              origin: [r.f(), r.f(), r.f()],
              viewHeight: [r.f(), r.f(), r.f()],
              idealPitch: r.f(),
              viewAngles: [r.f(), r.f(), r.f()],
              health: r.i(),
              crosshairAngle: [r.f(), r.f(), r.f()],
              viewSize: r.f(),
              punchAngle: [r.f(), r.f(), r.f()],
              maxClients: r.i(),
              viewEntity: r.i(),
              playerCount: r.i(),
              maxEntities: r.i(),
              demoPlayback: r.i(),
              hardware: r.i(),
              smoothing: r.i(),
              ptr_cmd: r.i(),
              ptr_movevars: r.i(),
              viewport: [r.i(), r.i(), r.i(), r.i()],
              nextView: r.i(),
              onlyClientDraw: r.i()
            }

            macro.UserCmd = {
              lerp_msec: r.s(),
              msec: r.ub(),
              UNUSED1: r.ub(),
              viewAngles: [r.f(), r.f(), r.f()],
              forwardMove: r.f(),
              sideMove: r.f(),
              upMove: r.f(),
              lightLevel: r.b(),
              UNUSED2: r.ub(),
              buttons: r.us(),
              impulse: r.b(),
              weaponSelect: r.b(),
              UNUSED: r.s(),
              impactIndex: r.i(),
              impactPosition: [r.f(), r.f(), r.f()]
            }

            macro.MoveVars = {
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
              footsteps: r.i(),
              skyName: r.nstr(32),
              rollAngle: r.f(),
              rollSpeed: r.f(),
              skyColor: [r.f(), r.f(), r.f()],
              skyVec: [r.f(), r.f(), r.f()]
            }

            macro.view = [r.f(), r.f(), r.f()]
            macro.viewModel = r.i()

            macro.incoming_sequence = r.i()
            macro.incoming_acknowledged = r.i()
            macro.incoming_reliable_acknowledged = r.i()
            macro.incoming_reliable_sequence = r.i()
            macro.outgoing_sequence = r.i()
            macro.reliable_sequence = r.i()
            macro.last_reliable_sequence = r.i()

            const frameDataLength = r.ui()
            const frameDataEnd = frameDataLength + r.tell()
            macro.frameData = []
            while (r.tell() < frameDataEnd) {
              const type = r.ub()
              if (type === 1) {
                continue // skip SVC_NOP
              }

              if (type >= 64) {
                // TODO: parse custom message
                if (customMessages[type] && customMessages[type].size > -1) {
                  r.skip(customMessages[type].size)
                } else {
                  r.skip(r.ub())
                }

                continue
              }

              const frameData = FrameData.readFrame(r, type, deltaDecoders)
              if (frameData) {
                if (type === 39) {
                  customMessages[frameData.index] = frameData
                }
                macro.frameData.push({ type, frameData })
              } else {
                r.seek(frameDataEnd)
              }
            }

            // if r.tell() > frameDataEnd something wrong happened
            r.seek(frameDataEnd)
            break
          }

          case 2: {
            // empty macro
            // signals the beginning of directory entry
            break
          }

          case 3: {
            macro.command = r.nstr(64)
            break
          }

          case 4: {
            macro.clientData = {
              position: [r.f(), r.f(), r.f()],
              rotation: [r.f(), r.f(), r.f()],
              weaponFlags: r.ui(),
              fov: r.f()
            }
            break
          }

          case 5: {
            // empty macro that signals end of directory entry
            isFinalMacroReached = true
            break
          }

          case 6: {
            macro.event = {
              flags: r.ui(),
              index: r.ui(),
              delay: r.f(),
              args: {
                flags: r.ui(),
                entityIndex: r.ui(),
                position: [r.f(), r.f(), r.f()],
                rotation: [r.f(), r.f(), r.f()],
                velocity: [r.f(), r.f(), r.f()],
                ducking: r.ui(),
                fparam1: r.f(),
                fparam2: r.f(),
                iparam1: r.i(),
                iparam2: r.i(),
                bparam1: r.i(),
                bparam2: r.i()
              }
            }
            break
          }

          case 7: {
            macro.weaponAnimation = {
              animation: r.i(),
              body: r.i()
            }
            break
          }

          case 8: {
            macro.sound = {
              channel: r.i(),
              sample: r.nstr(r.ui()),
              attenuation: r.f(),
              volume: r.f(),
              flags: r.ui(),
              pitch: r.i()
            }
            break
          }

          case 9: {
            r.skip(r.ui())
            break
          }

          default: {
            const offset = Number(r.tell() - 9).toString(16)
            const msg = `Unexpected macro (${macro.type}) at offset = ${offset}`

            throw new Error(msg)
          }
        }

        directories[i].macros.push(macro)
      }
    }

    return new Replay(header, directories)
  }

  static parseIntoChunks(buffer: ArrayBuffer) {
    const r = new Reader(buffer)

    if (!checkType(r)) {
      throw new Error('Invalid replay file format')
    }

    const maps = []
    const deltaDecoders = getInitialDeltaDecoders()
    const customMessages: any[] = []

    const header = readHeader(r)
    const directories = readDirectories(r, header.dirOffset)

    let currentMap: ReplayMap | undefined
    let currentChunk: ReplayChunk
    let lastFrame: any
    let lastFrameOffset: number
    const state = new ReplayState()

    // read loading segment
    let directoryEndOffset = directories[0].offset + directories[0].length
    r.seek(directories[0].offset)
    while (r.tell() < directoryEndOffset) {
      const frame = readFrame(r, deltaDecoders, customMessages)
      state.feedFrame(frame)

      if (frame.error) {
        throw new Error('Encountered error while reading replay')
      }

      if (frame.type < 2 /* 0 or 1 */) {
        const serverInfo = frame.data.find((msg: any) => msg.type === FrameData.SVC.SERVERINFO)
        if (serverInfo) {
          currentMap = new ReplayMap(serverInfo.data.mapFileName)
          maps.push(currentMap)
        }

        const resourceList = frame.data.find((msg: any) => msg.type === FrameData.SVC.RESOURCELIST)
        if (resourceList && currentMap) {
          currentMap.setResources(resourceList.data)
        }
      }
    }

    if (!(currentMap instanceof ReplayMap)) {
      throw new Error('Error while parsing replay.')
    }

    lastFrameOffset = r.tell()
    currentChunk = new ReplayChunk(state, 0)
    currentMap.addChunk(currentChunk)

    // read playback segment
    directoryEndOffset = directories[1].offset + directories[1].length
    r.seek(directories[1].offset)
    while (true) {
      const offset = r.tell()
      if (offset >= directoryEndOffset) {
        // set last and final chunks data
        const timeLength = lastFrame.time - currentChunk.startTime
        currentChunk.timeLength = timeLength
        const lastFrameLength = offset - lastFrameOffset
        r.seek(lastFrameOffset)
        currentChunk.setData(r.arrx(lastFrameLength, ReaderDataType.UByte))
        r.seek(offset)

        break
      }

      const frame = readFrame(r, deltaDecoders, customMessages)
      state.feedFrame(frame)
      lastFrame = frame

      if (frame.error) {
        throw new Error('Encountered error while reading replay')
      }

      if (frame.type < 2) {
        const serverInfo = frame.data.find((msg: any) => msg.type === FrameData.SVC.SERVERINFO)
        if (serverInfo) {
          // create new map
          currentMap = new ReplayMap(serverInfo.data.mapFileName)
          maps.push(currentMap)

          // set last chunks data
          const timeLength = lastFrame.time - currentChunk.startTime
          currentChunk.timeLength = timeLength
          const lastFrameLength = offset - lastFrameOffset
          const tempOffset = r.tell()
          r.seek(lastFrameOffset)
          currentChunk.setData(r.arrx(lastFrameLength, ReaderDataType.UByte))
          r.seek(tempOffset)

          // create new chunk
          lastFrameOffset = offset
          currentChunk = new ReplayChunk(state, frame.time)
          currentMap.addChunk(currentChunk)
        }

        const resourceList = frame.data.find((msg: any) => msg.type === FrameData.SVC.RESOURCELIST)
        if (resourceList) {
          currentMap.setResources(resourceList.data)
        }

        if (serverInfo) {
          continue
        }

        for (let i = 0; i < frame.data.length; ++i) {
          const message = frame.data[i]
          if (message.type === FrameData.SVC.SOUND || message.type === FrameData.SVC.SPAWNSTATICSOUND) {
            const sound = currentMap.resources.sounds.find((s: any) => s.index === message.data.soundIndex)
            if (sound) {
              sound.used = true
            }
          } else if (message.type === FrameData.SVC.STUFFTEXT) {
            const sounds = currentMap.resources.sounds
            const commands = message.data.commands

            for (let i = 0; i < commands.length; ++i) {
              const command = commands[i]

              const func = command.func
              if ((func === 'speak' || func === 'spk') && command.params.length === 1) {
                const soundName = `${command.params[0]}.wav`
                const sound = sounds.find((s: any) => s.name === soundName)
                if (sound) {
                  sound.used = true
                }
              }
            }
          }
        }
      } else if (frame.type === 8) {
        const sound = currentMap.resources.sounds.find((s: any) => s.name === frame.sound.sample)
        if (sound) {
          sound.used = true
        }
      }

      if (currentChunk.startTime + 10 < frame.time) {
        // set last chunks data
        const lastFrameLength = offset - lastFrameOffset
        const tempOffset = r.tell()
        r.seek(lastFrameOffset)
        currentChunk.setData(r.arrx(lastFrameLength, ReaderDataType.UByte))
        r.seek(tempOffset)

        // create new chunk
        lastFrameOffset = offset
        currentChunk = new ReplayChunk(state, frame.time)
        currentMap.addChunk(currentChunk)
      }
    }

    return {
      length: directories[1].time,
      maps,
      deltaDecoders,
      customMessages
    }
  }

  static readHeader(r: Reader) {
    return readHeader(r)
  }

  static readDirectories(r: Reader, offset: number) {
    return readDirectories(r, offset)
  }

  static readFrame(r: Reader, deltaDecoders: any, customMessages: any) {
    return readFrame(r, deltaDecoders, customMessages)
  }

  static readFrameData(r: Reader, deltaDecoders: any, customMessages: any) {
    return readFrame(r, deltaDecoders, customMessages)
  }
}
