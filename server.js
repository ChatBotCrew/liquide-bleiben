var express = require('express');
var app = express();
var { GoogleSpreadsheet } = require('google-spreadsheet');

let doc;
if (process.env.GOOGLE_SHEET_URL && process.env.GOOGLE_API_KEY) {
  doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_URL);
  doc.useApiKey(process.env.GOOGLE_API_KEY);
  
  (async () => {
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
  })()
}


const columns = [
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Bundesland",
    key: "land",
  },
  {
    name: "Fördersumme",
    key: "summe",
  },
  {
    name: "Mitarbeiter",
    key: "mitarbeiter",
  },
  {
    name: "Jahresabschluss",
    key: "jahresabschluss",
  },
  {
    name: "Weitere Infos",
    key: "infolink",
  },
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
  res.send({ columns, offers })
});

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });

const filterOffers = () => {

}