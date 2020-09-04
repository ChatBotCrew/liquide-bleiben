var { getDescriptions } = require('./codebeamer.js');

function validate(description) {
  for (const key in description) {
    if (description.hasOwnProperty(key) && description[key] == null) {
      return false;
    }
  }
  return true;
}

function getDescriptionsCtrl() {
  for (let i = 0; i < 10; i++) {
    let descriptions = getDescriptions();
    if(validate(descriptions)){
      return descriptions;
    }
  }
  return {};
}

module.exports = {
  getDescriptions: getDescriptionsCtrl,
}