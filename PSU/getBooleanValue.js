"use strict";

const isBoolean = require("./type-utils/isBoolean.js");
const getStringValue = require("./string-utils/getStringValue.js");

module.exports = function getBooleanValue(object) {
  // boolean
  if (isBoolean(object)) {
    return object;
  }

  switch (getStringValue(object).toLowerCase()) {
    case "true":
    case "t":
    case "1":
    case "yes":
    case "y":
    case "checked":
    case "selected":
    case "on":
      return true;
    default:
      return false;
  }
};
