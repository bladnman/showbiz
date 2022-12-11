"use strict";
const isNumber = require("./isNumber.js");

module.exports = function isInt(obj) {
  return isNumber(obj) && obj % 1 === 0;
};
