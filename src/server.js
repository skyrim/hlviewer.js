var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
    var view = fs.readFileSync('./view/index.html', 'utf8');
    res.send(view);
});

app.use(express.static('./public'));
app.listen(3001);