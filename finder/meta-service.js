var { getDropdowns } = require('./codebeamer.js');

function getDropdownsCtrl() {
  return getDropdowns();
}

module.exports = {
  getDropdowns: getDropdownsCtrl
}