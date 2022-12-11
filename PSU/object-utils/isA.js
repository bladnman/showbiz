"use strict";
const isNoE = require("./isNoE.js");

/**
 * Simple function to denote if an object is not null or empty
 * @memberof module:PSU
 * @function isA
 */
module.exports = function isA(object) {
  return !isNoE(object);
};
