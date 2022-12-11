"use strict";
const isString = require("../type-utils/isString.js");

module.exports = function getStringValue(object) {
  // string
  if (isString(object)) {
    return object;
  }

  // null or empty
  if (typeof object === "undefined" || object === null) {
    return "";
  }

  try {
    return object.toString();
  } catch (e) {
    return "";
  }
};
