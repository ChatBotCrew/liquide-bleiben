var express = require('express');
var app = express();
var fs = require('fs');
var { getDropdowns } = require('./meta-service');
var { getOffers } = require('./offer-service');

app.use(express.static('public'));

app.get('/api/offers', async (req, res) => {
  if (req.query.lok) fs.writeFile('log.txt', `${JSON.stringify(req.query)}\n`, { flag: 'a' }, e => { if(e) console.log(e); });
  res.send(getOffers(req.query));
});

app.get('/api/selects', async (req, res) => {
  res.send(getDropdowns())
});

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });
