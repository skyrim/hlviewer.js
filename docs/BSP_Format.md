# GoldSrc BSP File Format

## Contents

- [Definitions](#definitions)
- [Header](#header)
- [Lumps](#lumps)
  - [Entities](#entities)
  - [Planes](#planes)
  - [Textures](#textures)
  - [Vertices](#vertices)
  - [Visibility](#visibility)
  - [Nodes](#nodes)
  - [Texinfo](#texinfo)
  - [Faces](#faces)
  - [Lighting](#lighting)
  - [Clipnodes](#clipnodes)
  - [Leaves](#leaves)
  - [Marksurfaces](#marksurfaces)
  - [Edges](#edges)
  - [Surfedges](#surfedges)
  - [Modes](#models)

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
Location @ the beginning of the file
+------------------------------------------+
| HEADER                                   |
+---------+----------+---------------------+
| name    | size     | description         |
+---------+----------+---------------------+
| version | int      | must be equal to 30 |
| lumps   | LUMP[15] |                     |
+---------+----------+---------------------+

+---------------+
| LUMP          |
+---------------+
| offset | uint |
| length | uint |
+---------------+

Lump order:
0 = ENTITIES
1 = PLANES
2 = TEXTURES
3 = LUMP_VERTICES
4 = VISIBILITY
5 = NODES
6 = TEXINFO
7 = FACES
8 = LIGHTING
9 = CLIPNODES
10 = LEAVES
11 = MARKSURFACES
12 = EDGES
13 = SURFEDGES
14 = MODELS
```

The file header begins with an 32bit integer containing the file version of the BSP file (the magic number). This should be 30 for a valid BSP file used by the Half-Life Engine. Subseqently, there is an array of entries for the so-called lumps. A lump is more or less a section of the file containing a specific type of data. The lump entries in the file header address these lumps, accessed by the 15 predefined indexes.

To read the different lumps from the given BSP file, every lump entry file states the beginning of each lump as an offset relativly to the beginning of the file. Additionally, the lump entry also gives the length of the addressed lump in bytes. The Half-Life BSP compilers also define several constants for the maximum size of each lump, as they use static, global arrays to hold the data. The hlbsp project uses malloc() to allocate the required memory for each lump depending on their actual size.

## Lumps

### Entities

```
Location @ HEADER.lumps[LUMP TYPES.ENTITIES].offset
+---------------------+
| Entities            |
+------------+--------+
| entityData | string |
+------------+--------+
```

Where entityData is a [VDF](https://developer.valvesoftware.com/wiki/KeyValues) encoded string containing all map entities with their properties.

First entity is always `worldspawn` and among other properties it contains `wads` property which is a list of all required WAD files. If a texture is not stored in the BSP file, you'll find it in one of the WAD files.

### Planes

```
Location @ HEADER.lumps[LUMP TYPES.PLANES].offset
+----------------------------------------------+
| PLANES LUMP                                  |
+--------+-------------------------------------+
| planes | PLANE[sizeof(lump) / sizeof(PLANE)] |
+--------+-------------------------------------+

+-----------------------------------------------------+
| PLANE                                               |
+----------+---------+--------------------------------+
| normal   | vector3 |                                |
| distance | float   |                                |
| type     | uint    | one from the PLANE TYPES below |
+----------+---------+--------------------------------+

Plane types:
0 = PLANE_X - normal paralel to X axis
1 = PLANE_Y - normal paralel to Y axis
2 = PLANE_Z - normal paralel to Z axis
3 = PLANE_ANYX - normal closest to X axis
4 = PLANE_ANYY - normal closest to Y axis
5 = PLANE_ANYZ - normal closest to Z axis
```

Planes lump contains an array of `struct Plane` data. Each plane is defined using [Hesse normal form](https://en.wikipedia.org/wiki/Hesse_normal_form).

Plane type can be one the PLANE_... defines. If plane type is PLANE_X, ...Y, or ...Z then plane normal is paralel to axis X, Y or Z respectively. If plane type is PLANE_ANYX, ...Y, or ...Z then plane normal is nearer to X, Y or Z then any other. This information is used by the renderer to speed up some computations.

### Textures

```
Location @ HEADER.lumps[LUMP TYPES.TEXTURES].offset
+----------------------------------------+
| TEXTURES LUMP                          |
+----------------+-----------------------+
| textureCount   | uint                  |
| textureOffsets | uint[textureCount]    |
| textures       | TEXTURE[textureCount] |
+----------------+-----------------------+

+--------------------------------------------+
| TEXTURE                                    |
+---------------+----------------------------+
| name          | size                       |
+---------------+----------------------------+
| name          | char[16]                   |
| width         | uint                       |
| height        | uint                       |
| mipmapOffsets | uint[4]                    |
? if mipmapOffsets != 0 then                 ?
| mipmap1       | ubyte[width * height]      |
| mipmap2       | ubyte[width * height / 4]  |
| mipmap3       | ubyte[width * height / 16] |
| mipmap4       | ubyte[width * height / 64] |
| paletteSize   | ushort                     |
| palette       | color[paletteSize]         |
| padding       | byte[2]                    |
? else nothing                               ?
+---------------+----------------------------+
```

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

### Vertices

```
Location @ HEADER.lumps[LUMP TYPES.VERTICES].offset
+--------------------------------------------------+
| VERTICES LUMP                                    |
+--------+-----------------------------------------+
| vertex | vector3[sizeof(lump) / sizeof(vector3)] |
+--------+-----------------------------------------+
```

### Visibility

Each leaf in the `Leaves` lump holds an offset into the `Visibility` lump, and the data beginning from this offset is a bit array concerning which other leaves the given leaf can see.

For a bit `n` in the bit array, the given leaf:

Can see leaf `n` if bit `n` is 1.
Cannot see leaf `n` if bit `n` is 0.
For example, this bit array of 8 leaves:

```
01100000
```

implies that our given leaf can only see two other leaves - 1 and 2 - out of all leaves 0-7.

It should be noted that for any given leaf `n`, bit `n` should always be 1, as a leaf can always see itself. (If it were 0, the leaf would not be drawn when the player stands inside it.)

Since every leaf needs to store a bit corresponding to every other leaf, there are `n^2` bits required to store information about n leaves. This gets large quickly.

To help reduce the amount of space required to store the visibility data, the data is run-length encoded. This takes advantage of the assumption that, on the whole, any given leaf should only be able to see a small fraction of the total number of leaves in the map. Because of this, we should expect that the vast majority of bits in each leaf's bit array will be zero. If these zeroes are run-length encoded, the amount of space required to store the visibility data can be significantly reduced.

Because bytes are the smallest units of memory a computer can process at a time, run-length encoding only works for zero bytes - ie., bytes where all eight of their bits are zeroes. The rule is that, if a zero byte is encountered within the visibility data, the following byte will always specify the run length of zero bytes. This secondary byte will never itself be zero. This means that a run of up to 255 consecutive zero bytes can be encoded in the visibility data using just two bytes - one original zero, and one specifying the run length.

Note that if even one bit in a given byte is not zero, the data cannot be run-length encoded. For example, the following raw data:

```
         |          Run of 4 bytes         |
01100000 00000000 00000000 00000000 00000000 00000001 10000000 10011010
	(60 00 00 00 00 01 80 9A) - 8 bytes
```

is run-length encoded to:

```
         | Zero    Count                   |
01100000 00000000 00000100 -------- -------- 00000001 10000000 10011010
	(60 00 04 01 80 9A) - 6 bytes
```

```
// TODO
```

### Nodes

This lump is simple again and contains an array of binary structures, the nodes, which are a major part of the BSP tree.


```
Location @ HEADER.lumps[LUMP TYPES.NODES].offset
+-------------------------------------------+
| NODES LUMP                                |
+-------+-----------------------------------+
| nodes | NODE[sizeof(lump) / sizeof(NODE)] |
+-------+-----------------------------------+

+------------------------------------------------------------------------+
| NODE                                                                   |
+------------+----------+------------------------------------------------+
| planeIndex | uint     | index into PLANES lump                         |
| children   | short[2] | if > 0 index into NODES else index into LEAVES |
| mins       | short[3] | bounding box min coord                         |
| maxs       | short[3] | bounding box max coord                         |
| faceIndex  | ushort   | index into FACES lump                          |
| faceCount  | ushort   |                                                |
+------------+----------+------------------------------------------------+
```

Every NODE structure represents a node in the BSP tree and every node equals more or less a division step of the BSP algorithm. Therefore, each node has an index referring to a plane in the plane lump which devides the node into its two child nodes. The childnodes are also stored as indexes. Contrary to the plane index, the node index for the child is signed. If the index is larger than 0, the index indicates a child node. If it is equal to or smaller than zero (no valid array index), the bitwise inversed value of the index gives an index into the leaves lump.

Additionally two points (mins, maxs) span the bounding box (AABB, axis aligned bounding box) delimitting the space of the node.

Finally, faceIndex indexes into the face lump and specifies the first of faceCount surfaces contained in this node.

### Texinfo

The texinfo lump contains informations about how textures are applied to surfaces. The lump itself is an array of binary data structures.

```
Location @ HEADER.lumps[LUMP TYPES.TEXINFO].offset
+-----------------------------------------------------+
| TEXTURE INFO LUMP                                   |
+----------+------------------------------------------+
| texinfos | TEXINFO[sizeof(lump) / sizeof(TEXINFO)]) |
+----------+------------------------------------------+

+------------------------------------------------------------+
| TEXINFO                                                    |
+--------------+---------+-----------------------------------+
| s            | vector3 |                                   |
| sShift       | float   |                                   |
| t            | vector3 |                                   |
| tShift       | float   |                                   |
| textureIndex | uint    | index into TEXTURES lump          |
| flags        | uint    | 0 = has lightmap, 1 = no lightmap |
+--------------+---------+-----------------------------------+
```

`s`, `sShift`, `t` and `tShift` are face texture coordinates. To convert them to [UV coordinates](https://en.wikipedia.org/wiki/UV_mapping) use the following formula:
```
U[i] = (dotProduct(faceVertex[i], s) + sShift) / faceTextureWidth
V[i] = (dotProduct(faceVertex[i], t) + tShift) / faceTextureHeight
```

### Faces

```
Location @ HEADER.lumps[LUMP TYPES.FACES].offset
+--------------------------------------------+
| FACES LUMP                                 |
+-------+------------------------------------+
| faces | FACE[sizeof(lump) / sizeof(FACE)]) |
+-------+------------------------------------+

+------------------------------------------------------------------+
| FACE                                                             |
+----------------+----------+--------------------------------------+
| planeIndex     | ushort   | plane the face is parallel to        |
| planeSide      | ushort   | set if different normals orientation |
| edgeIndex      | uint     | index of the first surfedge          |
| edgeCount      | ushort   | number of consecutive surfedges      |
| texinfoIndex   | ushort   | index of the texture info structure  |
| styles         | ubyte[4] | specify lighting styles              |
| lightmapOffset | uint     | offsets into LIGHTMAP lump           |
+----------------+----------+--------------------------------------+
```

The first number of this data structure is an index into the planes lump giving a plane which is parallel to this face (meaning they share the same normal).

The second value may be seen as a boolean. If `planeSide` equals 0, then the normal vector of this face equals the one of the parallel plane exactly. Otherwise, the normal of the plane has to be multiplied by -1 to point into the right direction.

Afterwards we have an index into the surfedges lump, as well as the count of consecutive surfedges from that position.

Furthermore there is an index into the texture info lump, which is used to find the BSPTEXINFO structure needed to calculate the texture coordinates for this face.

Afterwards, there are four bytes giving some lighting information (partly used by the renderer to hide sky surfaces). 

Finally we have an offset in byes giving the beginning of the binary lightmap data of this face in the lighting lump.

### Lighting

This is one of the largest lumps in the BSP file. The lightmap lump stores all lightmaps used in the entire map. The lightmaps are arrays of triples of bytes (3 channel color, RGB) and stored continuously.

```
// TODO
```

### Clipnodes

```
Location @ HEADER.lumps[LUMP TYPES.CLIPNODES].offset
+-------------------------------------------------------+
| CLIPNODES LUMP                                        |
+-----------+-------------------------------------------+
| clipnodes | CLIPNODE[sizeof(lump) / sizeof(CLIPNODE)] |
+-----------+-------------------------------------------+

+------------------------+
| CLIPNODE               |
+------------+-----------+
| planeIndex | uint      |
| children   | ushort[2] |
+------------+-----------+
```

### Leaves

```
Location @ HEADER.lumps[LUMP TYPES.LEAVES].offset
+--------------------------------------------+
| LEAVES LUMP                                |
+-----------+--------------------------------+
| leaves | LEAF[sizeof(lump) / sizeof(LEAF)] |
+-----------+--------------------------------+

+-------------------------------------------------------------+
| LEAF                                                        |
+------------------+----------+-------------------------------+
| content          | int      | one of the CONTENTS_... below |
| visOffset        | uint     | offset into VISIBILITY lump   |
| mins             | short[3] | bounding box min coord        |
| maxs             | short[3] | bounding box max coord        |
| markSurfaceIndex | ushort   | index of the marksurface      |
| markSurfaceCount | ushort   |                               |
| ambientLevels    | ubyte[4] |  ambient sound levels         |
+------------------+----------+-------------------------------+

Content types:
-1 = CONTENTS_EMPTY
-2 = CONTENTS_SOLID
-3 = CONTENTS_WATER
-4 = CONTENTS_SLIME
-5 = CONTENTS_LAVA
-6 = CONTENTS_SKY
-7 = CONTENTS_ORIGIN
-8 = CONTENTS_CLIP
-9 = CONTENTS_CURRENT_0
-10 = CONTENTS_CURRENT_90
-11 = CONTENTS_CURRENT_180
-12 = CONTENTS_CURRENT_270
-13 = CONTENTS_CURRENT_UP
-14 = CONTENTS_CURRENT_DOWN
-15 = CONTENTS_TRANSLUCENT
```

The first entry of this struct is the type of the content of this leaf. It can be one of the predefined values, found in the compiler source codes, and is litte relevant for the actual rendering process.

All the more important is the next integer containing the offset into the vis lump. It defines the start of the raw PVS data for this leaf. If this value equals -1, no VIS lists are available for this leaf, usually if the map has been built without the VIS compiler.

The next two 16bit integer triples span the bounding box of this leaf. 

Furthermore, the struct contains an index pointing into the array of marksurfaces loaded from the marksufaces lump as well as the number of consecutive marksurfaces belonging to this leaf. The marksurfaces are looped through during the rendering process and point to the actual faces. 

The final 4 bytes somehow specify the volume of the ambient sounds.

### Marksurfaces

```
Location @ HEADER.lumps[LUMP TYPES.MARKSURFACES].offset
+------------------------------------------------------+
| MARKSURFACES LUMP                                     |
+--------------+---------------------------------------+
| marksurfaces | ushort[sizeof(lump) / sizeof(ushort)] |
+--------------+---------------------------------------+
```

The marksurfaces lump is a simple array of short integers. This lump is a simple table for redirecting the marksurfaces indexes in the leafs to the actial face indexes. A leaf inserts it's marksurface indexes into this array and gets the associated faces contained within this leaf.

### Edges

```
Location @ HEADER.lumps[LUMP TYPES.EDGES].offset
+-------------------------------------------+
| EDGES LUMP                                |
+-------+-----------------------------------+
| edges | EDGE[sizeof(lump) / sizeof(EDGE)] |
+-------+-----------------------------------+

+---------------------+
| EDGE                |
+---------+-----------+
| verices | ushort[2] |
+---------+-----------+
```

The edges delimit the face and further refer to the vertices of the face. Each edge is pointing to the start and end vertex of the edge.

### Surfedges

```
Location @ HEADER.lumps[LUMP TYPES.SURFEDGES].offset
+---------------------------------------------+
| SURFEDGES LUMP                              |
+-----------+---------------------------------+
| surfedges | int[sizeof(lump) | sizeof(int)] |
+-----------+---------------------------------+
```

This lump represents pretty much the same mechanism as the marksurfaces. A face can insert its surfedge indexes into this array to get the corresponding edges delimitting the face and further pointing to the vertexes, which are required for rendering. The index can be positive or negative. If the value of the surfedge is positive, the first vertex of the edge is used as vertex for rendering the face, otherwise, the value is multiplied by -1 and the second vertex of the indexed edge is used.

### Models

```
Location @ HEADER.lumps[LUMP TYPES.MODELS].offset
+-------------------------------------------------------+
| MODELS LUMP                                           |
+----------------+---------+----------------------------+
| mins           | vector3 | bounding box min coord     |
| maxs           | vector3 | bounding box max coord     |
| origin         | vector3 |                            |
| headNodesIndex | int[4]  | index into NODES lump      |
| visIndex       | int     | index into VISIBILITY lump |
| faceIndex      | int     | index info face lump       |
| faceCount      | int     | number of faces            |
+----------------+---------+----------------------------+
```

A model is kind of a mini BSP tree. Its size is determinded by the bounding box spaned by the first to members of this struct. Model 0 is the world, other models are brush entities.

There are 4 indexes into node arrays. The first one has proofed to index the root node of the mini BSP tree used for rendering. The other three indexes could probably be used for collision detection, meaning they point into the clipnodes, but I am not sure about this.

Finally their are direct indexes into the faces array, not taking the redirecting by the marksurfaces.