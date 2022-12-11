"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function getIntValueByRounding(value) {
  if (isNoE(value)) {
    return 0;
  } else {
    var intValue = 0;
    try {
      intValue = Math.round(value);

      if (isNaN(intValue)) {
        intValue = 0;
      }
    } catch (ex) {}

    return intValue;
  }
};
