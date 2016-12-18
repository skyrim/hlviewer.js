import App from './app.js'

window.addEventListener('load', () => {
    let app = new App('#app')
})

/*

1.
<html>
    <head>
        <script src="hlviewer.js"></script>
        <script>
            document.addEventListener('load', function() {
                var hlviewer = require('hlviewer')
                var hlapp = hlviewer('#hlviewer')
                hlapp.start()
            })
        </script>
    </head>
    <body>
        <div id="hlviewer"></div>
    </body>
</html>

or

- install node

- npm install hlviewer

- var hlviewer = require('hlviewer')
  // assuming there exists an element with id="hlv"
  var hlvapp = new hlviewer('#hlv')
  hlapp.start()

2. have a 
*/