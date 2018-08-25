[hlviewer.js](http://skyrim.github.io/hlviewer.js)
-----------

HLViewer is a simple to use javascript library for viewing maps  
and playing replays of GoldSrc engine based games entirely in browser.

[![Support via PayPal](https://cdn.rawgit.com/twolfson/paypal-github-button/1.0.0/dist/button.svg)](https://www.paypal.me/imquaker/5)

### Demo ###

You can check out the live demo [here](http://skyrim.github.io/hlviewer.js)

### Screenshot ###

![Screenshot](res/screenshot.png)

### Example Usage ###

Download the library from _dist_ directory and include it in your html.
```html
<script src="your/path/to/hlviewer.min.js"></script>
```

Create a target element where viewer will later be created.  
Width and height MUST be set.

```html
<div id="hlv-target" style="width:800px; height:600px"></div>
```

This code will initialize the state.

```javascript
var hlv = new HLViewer('#hlv-target', {
    // paths where files are stored on your server
    paths: {
        replays: 'res/replays',
        maps:    'res/maps',
        wads:    'res/wads'
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