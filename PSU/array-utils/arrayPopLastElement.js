"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function arrayPopLastElement(array) {
  if (isNoE(array)) {
    return null;
  }
  return array.pop();
};
