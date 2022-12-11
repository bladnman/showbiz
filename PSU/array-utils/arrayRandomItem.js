"use strict";
const isNoE = require("../object-utils/isNoE.js");
const roll = require("../math-utils/roll.js");

module.exports = function arrayRandomItem(array) {
  if (isNoE(array)) {
    return null;
  }
  let randomIndex = roll(array.length);
  return array[randomIndex - 1];
};
