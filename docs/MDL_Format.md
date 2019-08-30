# GoldSrc MDL File Format

## Contents

- [Definitions](#definitions)
- [Header](#header)
- [Structures](#structures)
  - [Bone](#bone)
  - [Bone Controller](#bonecontroller)
  - [Hitbox](#hitbox)
  - [Sequence](#sequence)
    - [Event](#event)
    - [Pivot](#pivot)
    - [Sequence Group](#sequencegroup)
    - [Texture](#texture)
    - [Attachment](#attachment)
    - [Transition](#transition)

## Definitions

Types:
- byte
- ubyte
- short = 2 byte integer
- ushort - 2 byte unsigned integer
- int - 4 byte integer
- uint - 4 byte unsigned integer
- float - 4 byte floating point number
- char = 1 byte ASCII
- string - null terminated array of chars
- vector3 - 3 floats for each axis x, y, z
- color - 3 ubytes for each channel RGB

## Header

```
+-------------------------------------------------------------------------+
| HEADER                                                                  |
+----------------------+----------+---------------------------------------+
| id                   | char[4]  | must be equal to "IDST"               |
| version              | int      | must be equal to 10                   |
| name                 | char[64] |                                       |
| filesize             | uint     | in bytes                              |
| eyePosition          | vector3  | ideal eye position                    |
| min                  | vector3  | ideal movement hull size              |
| max                  | vector3  |                                       |
| bbmin                | vector3  | clipping bounding box                 |
| bbmax                | vector3  |                                       |
| flags                | uint     | see HeaderFlags below                 |
| boneCount            | uint     | length of Bone struct array           |
| boneOffset           | uint     | offset to Bone struct array           |
| boneControllerCount  | uint     | length of BoneController struct array |
| boneControllerOffset | uint     | offset to BoneController struct array |
| hitboxCount          | uint     | length of HitBox struct array         |
| hitboxOffset         | uint     | offset to HitBox struct array         |
| sequenceCount        | uint     | length of Sequence struct array       |
| sequenceOffset       | uint     | offset to Sequence struct array       |
| sequenceGroupCount   | uint     | length of SequenceGroup struct array  |
| sequenceGroupOffset  | uint     | offset to SequenceGroup struct array  |
| textureCount         | uint     | length of Texture struct array        |
| textureOffset        | uint     | offset to Texture struct array        |
| textureDataOffset    | uint     | ?                                     |
| skinCount            | uint     | length of ushort array                |
| skinFamilyCount      | uint     | ?                                     |
| skinOffset           | uint     | offset to ushort array                |
| bodyPartCount        | uint     | length of BodyPart struct array       |
| bodyPartOffset       | uint     | offset to BodyPart struct array       |
| attachmentCount      | uint     | length of Attachment struct array     |
| attachmentOffset     | uint     | offset to Attachment struct array     |
| soundTable           | uint     | obsolete                              |
| soundOffset          | uint     | obsolete                              |
| soundGroupsCount     | uint     | obsolete                              |
| soundGroupOffset     | uint     | obsolete                              |
| transitionCount      | uint     | length of Transition struct array     |
| transitionOffset     | uint     | offset to Transition struct array     |
+----------------------+----------+---------------------------------------+

HeaderFlags:
EF_NONE = 0,
EF_ROCKET = 1,             // leave a trail
EF_GRENADE = 2,            // leave a trail
EF_GIB = 4,                // leave a trail
EF_ROTATE = 8,             // rotate (bonus items)
EF_TRACER = 16,            // green split trail
EF_ZOMGIB = 32,            // small blood trail
EF_TRACER2 = 64,           // orange split trail + rotate
EF_TRACER3 = 128,          // purple trail
EF_NOSHADELIGHT = 256,     // no shade lighting
EF_HITBOXCOLLISIONS = 512, // use hitbox collisions
EF_FORCESKYLIGHT = 1024,   // forces the model to be lit by skybox lighting
```

## Structures

### Bone

```
+----------------------------------------------------------------------+
| BONE                                                                 |
+----------------+----------+------------------------------------------+
| name           | char[32] |                                          |
| parent         | int      |                                          |
| flags          | int      | see BoneFlags below                      |
| boneController | int[6]   | index of BoneController array, -1 = none |
| value          | int[6]   | default DoF                              |
| scale          | int[6]   | scale for delta DoF values               |
+----------------+----------+------------------------------------------+

BoneFlags:
NONE = 0,
HAS_NORMALS = 1,
HAS_VERTICES = 2,
HAS_BBOX = 4,
HAS_CHROME = 8 // if any of the textures have chrome on them
```

### BoneController

```
+--------------------------------------------------+
| BONECONTROLLER                                   |
+-------+-------+----------------------------------+
| bone  | int   | -1 === 0                         |
| type  | int   | see MotionType below             |
| start | float |                                  |
| end   | float |                                  |
| rest  | int   | byte index value at rest         |
| index | int   | 0-3 user set controller, 4 mouth |
+-------+-------+----------------------------------+

MotionType:
STUDIO_NONE = 0x0000,
STUDIO_X = 0x0001,
STUDIO_Y = 0x0002,	
STUDIO_Z = 0x0004,
STUDIO_XR = 0x0008,
STUDIO_YR = 0x0010,
STUDIO_ZR = 0x0020,
STUDIO_LX = 0x0040,
STUDIO_LY = 0x0080,
STUDIO_LZ = 0x0100,
STUDIO_AX = 0x0200,
STUDIO_AY = 0x0400,
STUDIO_AZ = 0x0800,
STUDIO_AXR = 0x1000,
STUDIO_AYR = 0x2000,
STUDIO_AZR = 0x4000,
STUDIO_TYPES = 0x7FFF,
STUDIO_CONTROL_FIRST = STUDIO_X,
STUDIO_CONTROL_LAST = STUDIO_AZR,
STUDIO_RLOOP = 0x8000	// controller that wraps shortest distance
```

### Hitbox

Complex bounding box

```
+--------------------------------------+
| HITBOX                               |
+-------+---------+--------------------+
| bone  | int     |                    |
| group | int     | intersection group |
| bbmin | vector3 |                    |
| bbmax | vector3 |                    |
+-------+---------+--------------------+
```

### Sequence

Animation sequence

```
+--------------------------------------------------------------+
| SEQUENCE                                                     |
+--------------------+----------+------------------------------+
| label              | char[32] |                              |
| fps                | float    |                              |
| flags              | int      |                              |
| activity           | int      |                              |
| actWeight          | int      |                              |
| eventCount         | uint     | length of Event struct array |
| eventOffset        | uint     | offset of Event struct array |
| frameCount         | uint     |                              |
| pivotCount         | uint     | length of Pivot struct array |
| pivotOffset        | uint     | offset of Pivot struct array |
| motionType         | int      | see MotionType enum above    |
| motionBone         | int      |                              |
| linearMovement     | float[3] |                              |
| autoMovePosIndex   | int      |                              |
| autoMoveAngleIndex | int      |                              |
| bbmin              | float[3] |                              |
| bbmax              | float[3] |                              |
| blendCount         | int      |                              |
| animationOffset    | uint     |                              |
| blendType          | int[2]   |                              |
| blendStart         | float[2] |                              |
| blendEnd           | float[2] |                              |
| blendParent        | int      |                              |
| sequenceGroup      | int      |                              |
| entryNode          | int      |                              |
| exitNode           | int      |                              |
| nodeFlags          | int      |                              |
| nextSequence       | int      |                              |
+--------------------+----------+------------------------------+
```

#### Event

TODO

#### Pivot

TODO

#### Animation

TODO

### SequenceGroup

Demand loaded sequence

```
+------------------+
| SEQUENCEGROUP    |
+-------+----------+
| label | char[32] |
| name  | char[64] |
| cache | int      |
| data  | int      |
+-------+----------+
```

### Texture

```
+------------------------------------------+
| TEXTURE                                  |
+------------+-----------------------------+
| name       | char[64]                    |
| flags      | see TextureFlags below      |
| width      | uint                        |
| height     | uint                        |
| dataOffset | uint                        |
+------------+-----------------------------+

@dataOffset
+------------------------------------+
| TEXTUREDATA                        |
+------------+-----------------------+
| pixels     | ubyte[width * height] |
| palette    | color[256]            |
+------------+-----------------------+

TextureFlags:
STUDIO_NF_NONE = 0,
STUDIO_NF_FLATSHADE = 0x01,
STUDIO_NF_CHROME = 0x02,
STUDIO_NF_FULLBRIGHT = 0x04,
STUDIO_NF_NOMIPS = 0x08,
STUDIO_NF_ALPHA = 0x10,
STUDIO_NF_ADDITIVE = 0x20,
STUDIO_NF_MASKED = 0x40
```

### Attachment

TODO
Queryable attachable point

### Transition

TODO
Animation node to animation node transition graph