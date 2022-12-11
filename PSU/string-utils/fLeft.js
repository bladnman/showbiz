"use strict";
const isNoE = require("../object-utils/isNoE.js");
const getStringValue = require("./getStringValue.js");

module.exports = function fLeft(string, delim) {
  if (isNoE(string) || isNoE(delim)) {
    return "";
  }

  string = getStringValue(string);
  delim = getStringValue(delim);

  var theSpot = string.indexOf(delim);
  if (theSpot > -1) {
    return string.substring(0, theSpot);
  }
  return "";
};
