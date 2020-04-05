var fetch = require('node-fetch')

var BASE_PATH = 'https://liquidebleiben.codebeamer.com/api/v3'
var AUTH_HEADER = { 
  'Authorization': `Basic ${process.env.CB_BASIC_AUTH}`,
  'Content-Type': 'application/json'
};

const SHOW_STATUS_ID = 8;
const DETAILS_STATUS_ID = 10;
const SPECIAL_REQ_ID = 10002;
const ADDITIONAL_INFOS_ID = 10003;

let offers = [];
let clusters = [];
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

async function retrieveWikiAsHtml(id, value) {
  return await fetch(`${BASE_PATH}/projects/2/wiki2html`, {
    method: 'POST',
    body: JSON.stringify({
      contextId: id,
      contextVersion: 1,
      renderingContextType: 'TRACKER_ITEM',
      markup: value
    }),
    headers: AUTH_HEADER,
  })
    .then(res => res.text())
}

async function retrieveOffers() {
  const cbOffers = await fetch(`${BASE_PATH}/trackers/2221/reports/3017/items?page=1&pageSize=500`, {
    method: 'GET',
    headers: AUTH_HEADER,
  })
    .then(res => res.json())
  offers = await Promise.all(cbOffers.items.map(async item => {
      return await ({
        id: item.item.id,
        name: item.item.name,
        fields: await Promise.all(item.item.customFields
          .map(async field => {
            if([SPECIAL_REQ_ID, ADDITIONAL_INFOS_ID].includes(field.fieldId) && field.value.includes('~')) {
              return await retrieveWikiAsHtml(item.item.id, field.value).then(value => ({
                ...field,
                value
              }))
            } 
            else {
              return field;
            }
          })
        )
      })
    }));
}

async function retrieveColumnsAndClusters() {
  const cbSchema = await fetch(`${BASE_PATH}/trackers/2221/schema`, {
    method: 'GET',
    headers: AUTH_HEADER,
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
    headers: AUTH_HEADER,
  }).then(res => res.json());
  return dropdownValues.options.splice(1).map(opt => ({ id: opt.id.toString(), name: opt.name }));
}

function getOffers() {
  return offers;
}

function getDropdowns() {
  return dropdowns;
}

function getColumns() {
  return displayedColumns;
}

function getClusters() {
  return clusters;
}

function refreshData() {
  retrieveOffers();
  retrieveColumnsAndClusters();
  dropdowns.forEach(async dd => {
    const ddOptions = await retrieveDropdownOptions(dd.id);
    if(dd.name === 'state') ddOptions.pop();
    dropdowns.find(dropdown => dropdown.id == dd.id).options = ddOptions;
  });
}

setInterval(refreshData, 1800000);
refreshData();

module.exports = {
  getClusters,
  getColumns,
  getDropdowns,
  getOffers
}