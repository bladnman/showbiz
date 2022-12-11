"use strict";
const arrayIndexOf = require("./arrayIndexOf.js");

module.exports = function arrayContains(array, element) {
  return arrayIndexOf(array, element) > -1;
};
