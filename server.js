var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });