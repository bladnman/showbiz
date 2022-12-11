"use strict";
const getIntValue = require("../math-utils/getIntValue.js");

module.exports = function secondsFromDate(date) {
  try {
    return getIntValue(date.getTime() / 1000);
  } catch (e) {}

  return null;
};
