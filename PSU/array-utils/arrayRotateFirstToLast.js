"use strict";
const isNoE = require("../object-utils/isNoE.js");
const arrayPopFirstElement = require("./arrayPopFirstElement.js");

module.exports = function arrayRotateFirstToLast(array) {
  if (isNoE(array)) {
    return null;
  }
  var firstElem = arrayPopFirstElement(array);
  array.push(firstElem);
  return array;
};
