"use strict";
const isNoE = require("../object-utils/isNoE.js");
const getStringValue = require("./getStringValue.js");

module.exports = function fRightBack(string, delim) {
  if (isNoE(string) || isNoE(delim)) {
    return "";
  }

  string = getStringValue(string);
  delim = getStringValue(delim);

  var theSpot = string.lastIndexOf(delim);
  if (theSpot > -1) {
    return string.substring(theSpot + delim.length, string.length);
  }

  return "";
};
