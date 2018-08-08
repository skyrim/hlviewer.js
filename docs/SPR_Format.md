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
| frameCount | uint    |                                 |
| beamLength | float   |                                 |
| syncType   | uint    | one of the SpriteSyncType enum  |
+------------+---------+---------------------------------+
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