"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function startsWith(string, lookFor, caseInsensitive) {
  if (isNoE(string) || isNoE(lookFor)) {
    return false;
  }

  if (caseInsensitive) {
    return (
      string.toLowerCase().slice(0, lookFor.length) === lookFor.toLowerCase()
    );
  }

  return string.slice(0, lookFor.length) === lookFor;
};
