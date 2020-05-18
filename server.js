var express = require('express');
var app = express();
var fs = require('fs');
var { getDescriptions } = require('./description-service');
var { getDropdowns } = require('./meta-service');
var { getOffers } = require('./offer-service');

app.use(express.static('public'));

app.get('/api/offers', async (req, res) => {
  if (req.query.lok) fs.writeFile('log.txt', `${JSON.stringify(req.query)}\n`, { flag: 'a' }, e => { if(e) console.log(e); });
  res.send(getOffers(req.query));
});

app.get('/api/countries', async (req, res) => {
  res.send(JSON.parse(fs.readFileSync('./data/countries.json', 'utf8')));
});

app.get('/api/questions/:country', async (req, res) => {
  switch (req.params.country) {
    case 'de':
      res.send(JSON.parse(fs.readFileSync('./data/germany.json', 'utf8')));
      break;
    case 'fr':
      res.send(JSON.parse(fs.readFileSync('./data/france.json', 'utf8')));
      break;
    default:
      break;
  }
  
});

app.get('/api/selects', async (req, res) => {
  res.send(getDropdowns())
});

app.get('/api/descriptions', async (req, res) => {
  res.send(getDescriptions())
});

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });
