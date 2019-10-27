import { Reader/*, ReaderDataType*/ } from '../Reader'
import { paletteToRGBA } from './Util'

export class Mdl {
  public header: MdlHeader
  public textures: MdlTexture[]
  public skins: Int16Array

  constructor(params: {
    header: MdlHeader
    textures: MdlTexture[]
    skins: Int16Array
  }) {
    this.header = params.header
    this.textures = params.textures
    this.skins = params.skins
  }
}

export interface MdlHeader {
  magic: string // must be === "IDST"
  version: number
  name: string
  fileSize: number

  eyePosition: number[]
  min: number[]
  max: number[]

  bbmin: number[]
  bbmax: number[]

  flags: number
  boneCount: number
  boneIndex: number

  boneControllerCount: number
  boneControllerOffset: number

  hitboxCount: number
  hitboxOffset: number

  sequenceCount: number
  sequenceOffset: number

  sequenceGroupCount: number
  sequenceGroupOffset: number

  textureCount: number
  textureOffset: number
  textureDataOffset: number

  skinCount: number
  skinFamilies: number
  skinOffset: number

  bodyPartCount: number
  bodyPartOffset: number

  attachmentCount: number
  attachmentOffset: number

  soundTable: number
  soundOffset: number

  soundGroups: number
  soundGroupsOffset: number

  transitionCount: number
  transitionOffset: number
}

export interface MdlTexture {
  name: string
  flags: number
  width: number
  height: number
  data: Uint8Array
}

export interface MdlSequenceDescription {
  label: string
  fps: number
  flags: number
  activity: number
  actWeight: number
  eventCount: number
  eventOffset: number
  frameCount: number
  pivotCount: number
  pivotOffset: number
  motionType: number
  motionBone: number
  linearMovement: number[]
  autoMovePosIndex: number
  autoMoveAngleIndex: number
  bbmin: number[]
  bbmax: number[]
  blendCount: number
  animationOffset: number
  blendType: number[]
  blendStart: number[]
  blendEnd: number[]
  blendParent: number
  sequenceGroup: number
  entryNode: number
  exitNode: number
  nodeFlags: number
  nextSequence: number
}

export interface MdlSequenceGroup {
  label: string
  name: string
  cache: number
  data: number
}

export class MdlParser {
  static parse(buffer: ArrayBuffer): Mdl {
    const r = new Reader(buffer)

    const header = MdlParser.readHeader(r)
    const textures = MdlParser.readTextures(
      r,
      header.textureOffset,
      header.textureCount
    )
    // TODO: if no textures then read textures from "<modelname>t.mdl"
    const skins = MdlParser.readSkinRef(r, header.skinOffset, header.skinCount)
    /*const bones =*/ MdlParser.readBones(r, header)

    return new Mdl({ header, textures, skins })
  }

  private static readHeader(r: Reader): MdlHeader {
    return {
      magic: r.nstr(4),
      version: r.ui(),
      name: r.nstr(64),
      fileSize: r.ui(),

      eyePosition: [r.f(), r.f(), r.f()],
      min: [r.f(), r.f(), r.f()],
      max: [r.f(), r.f(), r.f()],

      bbmin: [r.f(), r.f(), r.f()],
      bbmax: [r.f(), r.f(), r.f()],

      flags: r.ui(),
      boneCount: r.ui(),
      boneIndex: r.ui(),

      boneControllerCount: r.ui(),
      boneControllerOffset: r.ui(),

      hitboxCount: r.ui(),
      hitboxOffset: r.ui(),

      sequenceCount: r.ui(),
      sequenceOffset: r.ui(),

      sequenceGroupCount: r.ui(),
      sequenceGroupOffset: r.ui(),

      textureCount: r.ui(),
      textureOffset: r.ui(),
      textureDataOffset: r.ui(),

      skinCount: r.ui(),
      skinFamilies: r.ui(),
      skinOffset: r.ui(),

      bodyPartCount: r.ui(),
      bodyPartOffset: r.ui(),

      attachmentCount: r.ui(),
      attachmentOffset: r.ui(),

      soundTable: r.ui(),
      soundOffset: r.ui(),

      soundGroups: r.ui(),
      soundGroupsOffset: r.ui(),

      transitionCount: r.ui(),
      transitionOffset: r.ui()
    }
  }

  private static readTextures(
    r: Reader,
    offset: number,
    count: number
  ): MdlTexture[] {
    r.seek(offset)
    const textures = []
    for (let i = 0; i < count; ++i) {
      const name = r.nstr(64)
      const flags = r.ui()
      const width = r.ui()
      const height = r.ui()

      const dataOffset = r.ui()

      const pixelCount = width * height
      const pixels = new Uint8Array(r.data.buffer, dataOffset, pixelCount)
      const palette = new Uint8Array(
        r.data.buffer,
        dataOffset + pixelCount,
        256 * 3
      )
      const data = paletteToRGBA(pixels, palette)

      // TODO: resize to power of two

      textures.push({
        name,
        flags,
        width,
        height,
        data
      })
    }
    return textures
  }

  private static readSkinRef(r: Reader, offset: number, length: number) {
    return new Int16Array(r.data.buffer, offset, length)
  }

  private static readBones(r: Reader, header: MdlHeader) {
    r.seek(header.sequenceOffset)
    const sequenceDescriptions: MdlSequenceDescription[] = []
    for (let i = 0; i < header.sequenceCount; ++i) {
      const sequence = {
        label: r.nstr(32),
        fps: r.f(),
        flags: r.ui(),
        activity: r.ui(),
        actWeight: r.ui(),
        eventCount: r.ui(),
        eventOffset: r.ui(),
        frameCount: r.ui(),
        pivotCount: r.ui(),
        pivotOffset: r.ui(),
        motionType: r.ui(),
        motionBone: r.ui(),
        linearMovement: [r.f(), r.f(), r.f()],
        autoMovePosIndex: r.ui(),
        autoMoveAngleIndex: r.i(),
        bbmin: [r.f(), r.f(), r.f()],
        bbmax: [r.f(), r.f(), r.f()],
        blendCount: r.i(),
        animationOffset: r.i(),
        blendType: [r.i(), r.i()],
        blendStart: [r.f(), r.f()],
        blendEnd: [r.f(), r.f()],
        blendParent: r.i(),
        sequenceGroup: r.i(),
        entryNode: r.i(),
        exitNode: r.i(),
        nodeFlags: r.i(),
        nextSequence: r.i()
      }
      sequenceDescriptions.push(sequence)
    }

    r.seek(header.sequenceGroupOffset)
    const sequenceGroups: MdlSequenceGroup[] = []
    for (let i = 0; i < header.sequenceGroupCount; ++i) {
      sequenceGroups.push({
        label: r.nstr(32),
        name: r.nstr(64),
        cache: r.ui(),
        data: r.ui()
      })
    }

    for (let i = 0; i < sequenceDescriptions.length; ++i) {
      r.seek(sequenceDescriptions[i].animationOffset)
      // const animations = r.arrx(header.boneCount, ReaderDataType.Short)
      // for (let j = 0; j < header.boneCount; ++j) {
        
      // }
    }

    console.log(sequenceGroups)
  }
}


