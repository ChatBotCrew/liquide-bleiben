var express = require('express');
var app = express();
var fs = require('fs');
var { getClusters, getColumns, getOffers } = require('./offer-service');

app.use(express.static('public'));

app.get('/api/offers', async (req, res) => {
  if (req.query.lok) fs.writeFile('log.txt', `${JSON.stringify(req.query)}\n`, { flag: 'a' }, e => { if(e) console.log(e); });
  res.send({
    columns: getColumns(),
    offers: getOffers(req.query),
    clusters: getClusters(),
  })
});

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });