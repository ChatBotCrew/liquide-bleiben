var { getColumns, getOffers } = require('./codebeamer.js');
var { getParameterSheet } = require('./googlesheets.js');

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

const filterOffersGS = async (filterParams) => {
  const rows = await getParameterSheet().getRows();
  const logic = rows[0]
  const columns = Object.keys(logic).filter(col => !col.startsWith('_'));
  const data = rows.slice(1);

  const filteredData = data.filter(el => {
    return columns.every(col => {
      if (OPERATORS[logic[col]]) {
        if(el[col] === undefined) {
          return false;
        } else if (logic[col] === '===') {
          if (el[col] && !OPERATORS[logic[col]](filterParams[LOGIC_MAPPING[col]], el[col])) return false;
        } else {
          const selectionVariable = parseFloat(filterParams[LOGIC_MAPPING[col]]);
          const columnValue = parseFloat(el[col]);
          if (!isNaN(selectionVariable) && !isNaN(columnValue)) {
            if (!OPERATORS[logic[col]](selectionVariable, columnValue)) return false;
          }
        }
      }
      return true;
    });
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

function filterOffers(filterParams) {
  let filteredOffers = getOffers();

  if (filterParams.state) {
    filteredOffers = filteredOffers.filter(off => {
      return off.fields
        .find(field => field.fieldId === 1000).values
        .find(val => val.name === filterParams.state || val.id === filterParams.state || val.id === 17)
    });
  }

  if (filterParams.trade) {
    filteredOffers = filteredOffers.filter(off => {
      return off.fields
        .find(field => field.fieldId === 1001).values
        .find(val => val.name !== filterParams.trade)
    });
  }

  if (filterParams.age) {
    filteredOffers = filteredOffers.filter(off => minMaxFilter(off.fields, 10000, 10010, filterParams.age));
  }

  if (filterParams.sales) {
    filteredOffers = filteredOffers.filter(off => minMaxFilter(off.fields, 10011, 10012, filterParams.sales));
  }

  if (filterParams.employees) {
    filteredOffers = filteredOffers.filter(off => minMaxFilter(off.fields, 10013, 10014, filterParams.employees));
  }

  if (filterParams.time) {
    filteredOffers = filteredOffers.filter(off => {
      return off.fields.find(field => field.fieldId === 1002).values[0].id !== 1
    });
  }

  return filteredOffers;
}

function minMaxFilter(rowFields, minId, maxId, filterValue) {
  return rowFields.find(field => field.fieldId === minId).value < filterValue &&
    rowFields.find(field => field.fieldId === maxId).value > filterValue;
}

function formatOffers(offers) {
  const columndIds = getColumns().map(col => col.id)
  return offers.map(off => ({
    name: off.name,
    fields: off.fields.filter(field => columndIds.includes(field.fieldId))
  }));
}

function formatOffersOld(offers) {
  const columndIds = getColumns().map(col => col.id)
  return offers.map(off => {
    const fieldsObject = {}
    off.fields.filter(field => columndIds.includes(field.fieldId)).forEach(field => {
      if (field.value) fieldsObject[field.name] = field.value
      else fieldsObject[field.name] = field.values.map(val => val.name).join(', ')
    })
    return {
      name: off.name,
      ...fieldsObject
    }
  });
}

function getOffersCtrl(filterParams) {
  console.log(formatOffersOld(filterOffers(filterParams)));
  return formatOffersOld(filterOffers(filterParams));
}

function getColumnsCtrl() {
  return getColumns().map(col => col.name);
}

function getClustersCtrl() {
  return {
    column: getColumns.find(col => col.id === 1002).name,
    names: Array.from(new Set(filteredData.map(offer => offer[columns.filter(col => logic[col] === 'cluster')[0]])))
  }
}

setTimeout(() => getColumnsCtrl(), 2000);

module.exports = {
  getClusters: getClustersCtrl,
  getColumns: getColumnsCtrl,
  getOffers: getOffersCtrl,
}