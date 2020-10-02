var { getClusters, getColumns, getOffers } = require('./codebeamer.js');

const FIELD_IDS = {
  MIN_AGE: 10000,
  MAX_AGE: 10010,
  MIN_SALES: 10011,
  MAX_SALES: 10012,
  MIN_EMPLOYEES: 10013,
  MAX_EMPLOYEES: 10014,
  MAX_TOTAL_ASSETS: 10015,
  LEGAL: 1004,
};

/**
 * Filter the complete list of funding programs based on the provided filterParams
 * @param {FilterParams} filterParams parameters used for filtering the funding programs
 */
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
      return !tradeField.values.find(val => val.id == filterParams.trade)
    });
  }
  
  if (filterParams.age) {
    filteredOffers = filteredOffers.filter(off => minMaxFilter(off.fields, FIELD_IDS.MIN_AGE, FIELD_IDS.MAX_AGE, filterParams.age));
  }

  if (filterParams.sales) {
    filteredOffers = filteredOffers.filter(off => {
      return minMaxFilter(off.fields, FIELD_IDS.MIN_SALES, FIELD_IDS.MAX_SALES, filterParams.sales) ||
      maxFilter(off.fields, FIELD_IDS.MAX_TOTAL_ASSETS, filterParams.totalAssets)
    });
  }
  
  const getLegalFilter = (offer) => {
    return offer.fields.find(f=>f.fieldId == FIELD_IDS.LEGAL);
  }

  if (filterParams.legal) {
    filteredOffers = filteredOffers.filter(offer=>{
      let legalFilter = getLegalFilter(offer);
      if(legalFilter == undefined) {
        return true;
      }
      return !!legalFilter.values.find(value=>value.id==filterParams.legal);
    });
  }

  if (filterParams.employees) {
    filteredOffers = filteredOffers.filter(off => minMaxFilter(off.fields, FIELD_IDS.MIN_EMPLOYEES, FIELD_IDS.MAX_EMPLOYEES, filterParams.employees));
  }

  return filteredOffers;
}

function maxFilter(rowFields, maxId, filterValue) {
  const maxField = rowFields.find(field => field.fieldId === maxId);
  if (!maxField) return false;
  return maxField.value >= filterValue;
}

function selectFilter(rowFields, maxId, filterValue) {
  const maxField = rowFields.find(field => field.fieldId === maxId);
  if (!maxField) return false;
  return maxField.value >= filterValue;
}
/**
 * Filter an by comparing a filter parameter integer value with the lower and upper bounds for a funding program
 * @param {any[]} rowFields list of fields which includes the specified IDs
 * @param {integer} minId field to be used as lower boundary
 * @param {integer} maxId field to be used as upper boundary
 * @param {integer} filterValue 
 */
function minMaxFilter(rowFields, minId, maxId, filterValue) {
  const minField = rowFields.find(field => field.fieldId === minId);
  const maxField = rowFields.find(field => field.fieldId === maxId);
  if (!minField && !maxField) return true;
  if (!minField) return maxField.value >= filterValue;
  if (!maxField) return minField.value <= filterValue;
  return minField.value <= filterValue && maxField.value >= filterValue;
}

/**
 * Structure programs to be uniform
 * @param {FundingProgram} offer
 * @returns {FundingProgramFormatted}
 */
function formatOffer(offer) {
  return {
    id: offer.id,
    name: offer.name,
    fields: {
      main: filterFieldsByDisplayType(offer.fields, 'main').map(formatField),
      details: filterFieldsByDisplayType(offer.fields, 'details').map(formatField)
    }
  };
}

/**
 * Filter fields for different section granularity (as specified in the codebeamer data base)
 * @param {any} fields
 * @param {'main' | 'details'} type
 * @returns {any[]}
 */
function filterFieldsByDisplayType(fields, type) {
  return fields.filter(field => {
    const displayField = getColumns().find(col => col.id === field.fieldId)
    if (!displayField) return false;
    return displayField.type === type;
  });
}
/**
 * Transform codebeamer field format into uniform application field format
 * @param {any} field Semi-structured field
 * @returns {FundingProgramField}
 */
function formatField(field) {
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
  return { id: field.fieldId, name: field.name, value }
}

/**
 * Structure funding programs into clusters
 * @param {FundingProgram[]} offers
 * @returns {FundingProgramCluster[]}
 */
function formatOffersClustered(offers) {
  return getClusters().map(clusterName => {
    return {
      name: clusterName,
      offers: offers
        .filter(off => off.fields.find(field => field.fieldId === 1002).values.map(val => val.name).includes(clusterName))
        .map(off => formatOffer(off, getColumns()))
      };
  });
}

/**
 * Process the retrieval of funding programs
 * @param {FilterParams} filterParams
 */
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