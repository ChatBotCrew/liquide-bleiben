var { getClusters, getColumns, getOffers } = require('./codebeamer.js');

function filterOffers(filterParams) {
  let filteredOffers = getOffers();

  if (filterParams.state) {
    filteredOffers = filteredOffers.filter(off => {
      return off.fields
        .find(field => field.fieldId === 1000).values
        .find(val => val.name === filterParams.state || val.id == filterParams.state || val.id === 17)
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
      if (field.value) {
        if (typeof field.value === 'boolean') {
          fieldsObject[field.name] = field.value ? 'Ja' : 'Nein';
        } else {
          fieldsObject[field.name] = field.value.replace(/[\\\~]/g, '');
        }
      } else {
        fieldsObject[field.name] = field.values.map(val => val.name).join(', ');
      }
    })
    return {
      'Name': off.name,
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
  return getClusters();
}

setTimeout(() => getColumnsCtrl(), 2000);

module.exports = {
  getClusters: getClustersCtrl,
  getColumns: getColumnsCtrl,
  getOffers: getOffersCtrl,
}