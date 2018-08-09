# GoldSrc SPR File Format

## Contents

- [Definitions](#definitions)
- [Overview](#overview)
- [Header](#header)
- [Palette](#palette)
- [Frame](#frame)

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

## Overview

```
+------------------------------------+
| SPRITE                             |
+---------+--------------------------+
| header  | HEADER                   |
| palette | PALETTE                  |
| frames  | FRAME[HEADER.frameCount] |
+---------+--------------------------+
```

## Header

```
Location @ the beginning of the file
+--------------------------------------------------------+
| HEADER                                                 |
+------------+---------+---------------------------------+
| name       | size    | description                     |
+------------+---------+---------------------------------+
| magic      | char[4] | must be == "IDSP"               |
| version    | uint    | must be == 2 (1 was for Quake)  |
| type       | uint    | one of the SpriteType enum      |
| alphaType  | uint    | one of the SpriteAlphaType enum |
| radius     | float   | bounding radius                 |
| maxWidth   | uint    |                                 |
| maxHeight  | uint    |                                 |
| frameCount | uint    | max is 1000                     |
| beamLength | float   |                                 |
| syncType   | uint    | one of the SpriteSyncType enum  |
+------------+---------+---------------------------------+

SpriteType:
0 = VP_PARALLEL_UPRIGHT - Z-axis is fixed
1 = FACING_UPRIGHT - oblique view, freely movable
2 = VP_PARALLEL - freely movable (default)
3 = ORIENTED - XYZ axes are fixed
4 = VP_PARALLEL_ORIENTED - oblique view, Z-axis is fixed

SpriteAlphaType:
0 = SPR_NORMAL - without color calculations
1 = SPR_ADDITIVE - additive blending
2 = SPR_INDEXALPHA - 255th color in the palette is sprite tint
3 = SPR_ALPHTEST - 255th color in the palette is transparent

SpriteSyncType:
0 = SYNCHRONIZED
1 = RANDOM
```

Radius of the sprite is a so-called bounding- box of the sprite from the graphic center. Usually it is equal to 1.0 and can be considered as a scaling factor.

The beam length is used to shift the origin coordinates of a sprite. This shift is performed only after complete alignment of the specified orientation. By default, the origin of a sprite is exactly in the middle of the sprite:

```
width = 32 pixels, height = 32 pixels => (16, 16)
```

The beam length can have a negative as well as a positive value. However, the minimum of -1.0 or the maximum of 1.0 must not be undershot or exceeded (the maximum extent of the sprite in pixels seems to be the natural limit). The formula is simple:

```
(width / 2 * beamLength, height / 2 * beamLength)
```

## Palette

```
+-------------------------------------------------------+
| PALETTE                                               |
+--------+-------------+--------------------------------+
| size   | ushort      | number of color in the palette |
| colors | color[size] | array of colors                |
+--------+-------------+--------------------------------+
```

## Frame

// TODO: groups
// https://thewall.hehoe.de/content/goldsrc:specification:spr#dokuwiki__top

```
+---------------------------------------------------------+
| Frame                                                   |
+-----------+----------------------+----------------------+
| group     | uint                 |                      |
| originX   | int                  |                      |
| originY   | int                  |                      |
| width     | uint                 |                      |
| height    | uint                 |                      |
| imageData | byte[width * height] | indices into palette |
+-----------+----------------------+----------------------+
```