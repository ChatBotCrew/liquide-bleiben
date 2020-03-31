var { getClusters, getColumns, getOffers } = require('./codebeamer.js');

function filterOffers(filterParams) {
  let filteredOffers = getOffers();

  if (filterParams.state) {
    filteredOffers = filteredOffers.filter(off => {
      return off.fields
        .find(field => field.fieldId === 1000).values
        .find(val => val.id == filterParams.state || val.id === 17)
    });
  }

  if (filterParams.trade) {
    filteredOffers = filteredOffers.filter(off => {
      const tradeField = off.fields.find(field => field.fieldId === 1001);
      if (!tradeField) return true;
      return tradeField.values.find(val => val.id !== filterParams.trade)
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
      return off.fields.find(field => field.fieldId === 1002).values[0].id != filterParams.time
    });
  }

  return filteredOffers;
}

function minMaxFilter(rowFields, minId, maxId, filterValue) {
  const minField = rowFields.find(field => field.fieldId === minId);
  const maxField = rowFields.find(field => field.fieldId === maxId);
  if (!minField && !maxField) return true;
  if (!minField) return maxField.value > filterValue;
  if (!maxField) return minField.value < filterValue;
  return minField.value < filterValue && maxField.value > filterValue;
}

function formatOffer(offer, columndIds) {
  return {
    name: offer.name,
    fields: offer.fields.filter(field => columndIds.includes(field.fieldId)).map(field => {
      let value;
      if (field.value !== undefined) {
        if (typeof field.value === 'boolean') {
          value = field.value ? 'Ja' : 'Nein';
        } else {
          value = field.value.replace(/[\\\~]/g, '');
        }
      } else {
        value = field.values.map(val => val.name).join(', ');
      }
      return { name: field.name, value }
    })
  };
}

function formatOffersClustered(offers) {
  const columndIds = getColumns().map(col => col.id)
  return getClusters().map(clusterName => {
    return {
      name: clusterName,
      offers: offers
        .filter(off => off.fields.find(field => field.fieldId === 1002).values.map(val => val.name).includes(clusterName))
        .map(off => formatOffer(off, columndIds))
      };
  });
}

function getOffersCtrl(filterParams) {
  return formatOffersClustered(filterOffers(filterParams));
}

function getColumnsCtrl() {
  return getColumns().map(col => col.name);
}

function getClustersCtrl() {
  return getClusters();
}

module.exports = {
  getClusters: getClustersCtrl,
  getColumns: getColumnsCtrl,
  getOffers: getOffersCtrl,
}