"use strict";
const isNoE = require("../object-utils/isNoE.js");
const isString = require("../type-utils/isString.js");

module.exports = function endsWith(string, lookFor, caseInsensitive) {
  if (isNoE(string) || isNoE(lookFor) || !isString(string)) {
    return false;
  }

  if (caseInsensitive) {
    return (
      string.toLowerCase().slice(-lookFor.length) === lookFor.toLowerCase()
    );
  }

  return string.slice(-lookFor.length) === lookFor;
};
