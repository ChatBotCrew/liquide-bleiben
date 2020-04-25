var { getDescriptions } = require('./codebeamer.js');

function getDescriptionsCtrl() {
  return getDescriptions();
}

module.exports = {
  getDescriptions: getDescriptionsCtrl,
}