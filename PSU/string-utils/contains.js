"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function contains(string, substr, caseInsensitive) {
  if (isNoE(substr)) {
    return false;
  }

  if (typeof string === "string") {
    if (caseInsensitive) {
      return string.toLowerCase().indexOf(substr.toLowerCase()) > -1;
    } else {
      return string.indexOf(substr) > -1;
    }
  }

  return false;
};
