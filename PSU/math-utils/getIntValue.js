"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function getIntValue(value) {
  if (isNoE(value)) {
    return 0;
  } else {
    var intValue = 0;
    try {
      intValue = parseInt(value);
      if (isNaN(intValue)) {
        intValue = 0;
      }
    } catch (ex) {}

    return Math.floor(intValue);
  }
};
