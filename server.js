var express = require('express');
var app = express();

const columnNames = [
  "Name",
  "Land",
  "Fördersumme",
  "Mitarbeiter",
  "Jahresabschluss"
]

const offers = [
  {
    name: 'Akutkredit LfA',
    land: 'NRW',
    summe: 10000,
    mitarbeiter: 500,
    jahresabschluss: 0,
  },
  {
    name: 'L-Bank',
    land: 'Hessen',
    summe: 25000,
    mitarbeiter: 100,
    jahresabschluss: 2,
  },
  {
    name: 'Bayernfonds',
    land: 'Bayern',
    summe: 10000,
    mitarbeiter: 5,
    jahresabschluss: 1,
  },
];

app.use(express.static('public'));

app.get('/api/offers', (req, res) => {
  res.send({ columnNames, offers })
});

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });