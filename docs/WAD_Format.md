# GoldSrc WAD File Format

## Contents

- [Definitions](#definitions)
- [Header](#header)
- [Entries](#entries)
- [Structures](#structures)
  - [Texture](#structures)
  - [Decal](#decal)
  - [Cache](#cache)
  - [Font](#font)

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
+-----------------------------------------------------------+
| HEADER                                                    |
+-------------+---------+-----------------------------------+
| magic       | char[4] | must be "WAD3" for GoldSrc        |
| entryCount  | uint    | number of entries in the WAD file |
| entryOffset | uint    | file offset to array of entries   |
+-------------+---------+-----------------------------------+
```

## Entries

```
Location @ HEADER.entryOffset
+------------------------------------+
| ENTRIES                            |
+---------+--------------------------+
| entries | ENTRY[HEADER.entryCount] |
+---------+--------------------------+
```

```
+-----------------------------------------------------------------------+
| ENTRY                                                                 |
+------------------+----------+-----------------------------------------+
| offset           | uint     |                                         |
| size             | uint     |                                         |
| uncompressedSize | uint     |                                         |
| type             | byte     | one of the EntryTypes enum below        |
| isCompressed     | byte     | 0 if uncompressed, otherwise compressed |
| padding          | byte[2]  | unused, skip this                       |
| name             | char[16] | name of the file                        |
+------------------+----------+-----------------------------------------+

EntryTypes:
0x40 = decal??? don't know what it is (found in tempdecal.wad)
0x42 = cache??? don't know what it is (found in cached.wad)
0x43 = texture
0x46 = font (found in gfx.wad and fonts.wad)
```

Property `offset` points to a structure. Type of a structure depends on the `type` property. Structures are documented below.

## Structures

### Texture

```
Location @ ENTRY[?].offset
+-------------------------------------------------------------------------+
| TEXTURE                                                                 |
+---------------+----------------------------+----------------------------+
| name          | char[16]                   | texture name               |
| width         | uint                       |                            |
| height        | uint                       |                            |
| mipmapOffsets | uint[4]                    | relative offsets           |
| mipmap1       | ubyte[width * heigth]      | original, full size mipmap |
| mipmap2       | ubyte[width * height / 4]  | 2x smaller texture         |
| mipmap3       | ubyte[width * height / 16] | 4x smaller texture         |
| mipmap4       | ubyte[width * height / 64] | 8x smaller texture         |
| paletteSize   | ushort                     | always equal to 256        |
| palette       | color[paletteSize]         | actual colors              |
| padding       | byte[2]                    | unused, skip this          |
+---------------+----------------------------+----------------------------+
```

Most common type.

Textures have different functions based on the prefix in their name:

- `{` = Transparent. IMPORTANT: Color at the palette index 255 is the one used to set transparent pixels.
- `!` = Water (a special texture that acts like water, but doesn't need an entity brush to work) 
- `~` = Light (Textures begining with this will emit light) 
- `+` = Animated (Means it actually functions through a set when triggered) 
- `+A` = Animated Toggle (cycles through Max 10 frames) 
- `-` = Random Tiling (there will be 3 or 4 in a set)

So `!WATERBLUE` is a functional water texture and `+0~ELEV1_PAN` is a the first in a sequence of special animated light emitting textures.

Mipmap offsets are offsets relative to the beginning of the texture. They point to each mipmap.

If offsets are equal to 0 then texture structure ends there and mipmaps should be found in external WAD file. Which WAD files to load is stored in `worldspawn` entity in entities lump.

Mipmaps contain an array of indices into the palette.

Palette contains an array of texture colors. Size of palette is always 256.

### Decal

Exactly the same as texture.

### Cache

```
+-------------------------------------+
| CACHE                               |
+-------------+-----------------------+
| width       | uint                  |
| height      | uint                  |
| mipmap      | ubyte[width * height] |
| paletteSize | ushort                |
| palette     | color[paletteSize]    |
+-------------+-----------------------+
```

### Font

```
+----------------------------------------------------------------------+
| FONT                                                                 |
+-------------+-----------------------+--------------------------------+
| width       | uint                  | always equals to 256           |
| height      | uint                  |                                |
| rowCount    | uint                  | number of glyph rows           |
| rowHeight   | uint                  | height of each glyph row       |
| glyphs      | GLYPH[256]            | offset and width of each glyph |
| mipmap      | ubyte[width * height] | original, full size mipmap     |
| paletteSize | ushort                | always equal to 256            |
| palette     | color[paletteSize]    | actual colors                  |
| padding     | byte[2]               | unused, skip this              |
+-------------+-----------------------+--------------------------------+

+--------------------------------------------------------+
| GLYPH                                                  |
+--------+--------+--------------------------------------+
| offset | ushort | offset to the first pixel of a glyph |
| width  | ushort | width of glyph                       |
+--------+--------+--------------------------------------+
````

