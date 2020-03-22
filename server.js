var express = require('express');
var app = express();
var { GoogleSpreadsheet } = require('google-spreadsheet');

const OPERATORS = { 
  '>=': (a,b) => a >= b,
  '<=': (a,b) => a <= b,
  '===': (a,b) => a === b,
};
const LOGIC_MAPPING = { 
  "Mitarbeiter MIN": "employees", 
  "Mitarbeiter MAX": "employees", 
  "Umsatz MIN": "sales", 
  "Umsatz MAX": "sales", 
  "Unternehmenshistorie MIN": "age", 
  "Unternehmenshistorie MAX": "age",
  "Bundesland": "state"
}

let doc;
let parameterSheet;
if (process.env.GOOGLE_SHEET_URL && process.env.GOOGLE_API_KEY) {
  doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_URL);
  doc.useApiKey(process.env.GOOGLE_API_KEY);
  (async () => {
    await doc.loadInfo(); // loads document properties and worksheets
    parameterSheet = doc.sheetsByIndex[0];
  })();
}

app.use(express.static('public'));

app.get('/api/offers', async (req, res) => {
  res.send(await filterOffers(req.query))
});

app.listen(8080, function () { console.log('"Wir bleiben Liquide" running on 8080!'); });

const filterOffers = async (filterParams) => {
  const rows = await parameterSheet.getRows();
  const logic = rows[0]
  const columns = Object.keys(logic).filter(col => !col.startsWith('_'));
  const data = rows.slice(1);

  const filteredData = data.filter(el => {
    let include = true;
    columns.forEach(col => {
      if (OPERATORS[logic[col]]) {
        if (logic[col] === '===') {
          if (!OPERATORS[logic[col]](filterParams[LOGIC_MAPPING[col]], el[col])) include = false;
        } else {
          const selectionVariable = parseFloat(filterParams[LOGIC_MAPPING[col]]);
          const columnValue = parseFloat(el[col]);
          if (!isNaN(selectionVariable) && !isNaN(columnValue)) {
            if (!OPERATORS[logic[col]](selectionVariable, columnValue)) include = false;
          }
        }
      }
    });
    return include;
  })

  return { 
    columns: columns.filter(col => logic[col] === 'show'), 
    offers: filteredData.map(el => {
      const displayedFields = {};
      columns.forEach(col => logic[col] === 'show' || logic[col] === 'cluster' ? displayedFields[col] = el[col] : null);
      return displayedFields;
    }), 
    cluster: {
      column: columns.filter(col => logic[col] === 'cluster')[0],
      names: Array.from(new Set(filteredData.map(offer => offer[columns.filter(col => logic[col] === 'cluster')[0]])))
    }
  }
}
