var { GoogleSpreadsheet } = require('google-spreadsheet');

let doc;
let parameterSheet;

if (process.env.GOOGLE_SHEET_URL && process.env.GOOGLE_API_KEY) {
  doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_URL);
  doc.useApiKey(process.env.GOOGLE_API_KEY);
  const getDocInfo = async () => {
    await doc.loadInfo(); // loads document properties and worksheets
    parameterSheet = doc.sheetsByIndex[0];
  };
  setTimeout(getDocInfo, 300000);
  getDocInfo();
}

function getParameterSheet() {
  return parameterSheet;
}

module.exports = {
  getParameterSheet
}