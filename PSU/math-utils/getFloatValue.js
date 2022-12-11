"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function getFloatValue(value) {
  if (isNoE(value)) {
    return 0.0;
  } else {
    var floatValue = 0.0;
    try {
      floatValue = parseFloat(value);
      if (isNaN(floatValue)) {
        floatValue = 0.0;
      }
    } catch (ex) {}

    return floatValue;
  }
};
