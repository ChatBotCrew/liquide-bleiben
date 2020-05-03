var fetch = require('node-fetch')

var BASE_PATH = 'https://liquidebleiben.codebeamer.com/api/v3'
var HEADERS = {
  'Authorization': `Basic ${process.env.CB_BASIC_AUTH}`,
  'Content-Type': 'application/json'
};

const SHOW_STATUS_ID = 8;
const DETAILS_STATUS_ID = 10;

/** @type {FundingProgram[]} */
let offers = [];

/** @type {string[]} */
let clusters = [];

/**
 * List of columns which are to be shown to the end-user
 * @type {{ id: number, name: string, type: 'main' | 'details' }[]}
 */
let displayedColumns = [];

const dropdowns = [
  {
    id: 1000,
    name: 'state',
    options: []
  },
  {
    id: 1001,
    name: 'trade',
    options: []
  },
  {
    id: 1004,
    name: 'legal',
    options: []
  },
]

const wikiIndizes = [3136, 3140, 3144, 3146, 3149, 3153, 3192, 3240]
const wikiPages = []

async function retrieveWikiNameAndText(id) {
  return await fetch(`${BASE_PATH}/wikipages/${id}`, {
    method: 'GET',
    headers: HEADERS,
  })
    .then(res => res.json())
    .then(async wikiEntry => ({ name: wikiEntry.name, html: await retrieveWikiAsHtml(id, 'WIKI', wikiEntry.version, wikiEntry.markup)}))
}

async function retrieveWikiAsHtml(id, type, version, value) {
  return await fetch(`${BASE_PATH}/projects/2/wiki2html`, {
    method: 'POST',
    body: JSON.stringify({
      contextId: id,
      contextVersion: version,
      renderingContextType: type,
      markup: value
    }),
    headers: HEADERS,
  })
    .then(res => res.text());
}

async function retrieveOffers() {
  const cbOffers = await fetch(`${BASE_PATH}/trackers/2221/reports/3017/items?page=1&pageSize=500`, {
    method: 'GET',
    headers: HEADERS,
  })
    .then(res => res.json())
  offers = cbOffers.items.map(item => ({
    id: item.item.id,
    version: item.item.version,
    name: item.item.name,
    fields: item.item.customFields
  }));
  offers.forEach(offer => {
    offer.fields.forEach(async field => {
      if(field.type === "WikiTextFieldValue") {
        field.value = await retrieveWikiAsHtml(offer.id, 'TRACKER_ITEM', offer.version, field.value);
      }
    })
  });
}

async function retrieveColumnsAndClusters() {
  const cbSchema = await fetch(`${BASE_PATH}/trackers/2221/schema`, {
    method: 'GET',
    headers: HEADERS,
  })
    .then(res => res.json())
  displayedColumns = cbSchema
    .filter(col => col.mandatoryInStatuses.findIndex(status => [SHOW_STATUS_ID, DETAILS_STATUS_ID].includes(status.id)) > -1)
    .map(col => ({ id: col.id, name: col.name, type: col.mandatoryInStatuses.find(status => status.id === SHOW_STATUS_ID) ? 'main' : 'details' }));
  clusters = cbSchema.find(col => col.id === 1002).options.map(opt => opt.name).splice(1);
}

async function retrieveDropdownOptions(fieldId) {
  const dropdownValues = await fetch(`${BASE_PATH}/trackers/2221/fields/${fieldId}`, {
    method: 'GET',
    headers: HEADERS,
  }).then(res => res.json());
  return dropdownValues.options.splice(1).map(opt => ({ id: opt.id.toString(), name: opt.name }));
}

/**
 * Return the full list of offers stored in the cache
 * @returns {FundingProgram[]}
 */
function getOffers() {
  return offers;
}

/**
 * Return the full list of selectable values stored in the cache
 */
function getDropdowns() {
  return dropdowns;
}

function getColumns() {
  return displayedColumns;
}

function getClusters() {
  return clusters;
}

function getDescriptions() {
  return wikiPages;
}

/**
 * Query for all data which is stored in codebeamer to be saved in the in in-memory cache
 */
async function refreshData() {
  return Promise.all([
    retrieveOffers(),
    retrieveColumnsAndClusters(),
    Promise.all(dropdowns.map(async dd => {
      const ddOptions = await retrieveDropdownOptions(dd.id);
      if(dd.name === 'state') ddOptions.pop();
      dd.options = ddOptions;
    })),
    Promise.all(wikiIndizes.map(async (wp, idx) => {
      wikiPages[idx] = await retrieveWikiNameAndText(wp);
    }))
  ]);
}

setInterval(refreshData, 1800000);
refreshData();

module.exports = {
  getClusters,
  getColumns,
  getDescriptions,
  getDropdowns,
  getOffers
}