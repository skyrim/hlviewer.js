# [hlviewer.js](http://skyrim.github.io/hlviewer.js)

HLViewer is a simple to use javascript library for viewing maps  
and playing replays of GoldSrc engine based games entirely in browser.

## Demo ##

You can check out the live demo [here](http://skyrim.github.io/hlviewer.js)

## Screenshot ##

![Screenshot](res/screenshot.jpg)

## Example Usage ##

Download the library from __dist__ directory and include it in your html.
```html
<link rel="stylesheet" href="your/path/to/hlviewer.style">
<script src="your/path/to/hlviewer.min.js"></script>
```
or use a CDN
```html
<link rel="stylesheet" href="https://unpkg.com/hlviewer.js@0.8.3/dist/hlviewer.js.css">
<script src="https://unpkg.com/hlviewer.js@0.8.3/dist/hlviewer.min.js"></script>
```

Create a target element where viewer will later be created.  
Width and height MUST be set.

```html
<div id="hlv-target" style="width:800px; height:600px"></div>
```

This code will initialize the state.

```javascript
var hlv = HLViewer.init('#hlv-target', {
  // paths where files are stored on your server
  paths: {
    base:    '/',
    replays: 'res/replays',
    maps:    'res/maps',
    wads:    'res/wads',
    skies:   'res/skies',
    sounds:  'res/sounds'
  }
})
```

This will load both the replay and the map of that replay (and wad files).

```javascript
hlv.load('some_file.dem')
```

This will only load the map (and wad files).

```javascript
hlv.load('some_file.bsp')
```
