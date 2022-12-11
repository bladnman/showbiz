"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function isDateBeforeDate(thisDate, thatDate) {
  if (isNoE(thisDate) || isNoE(thatDate)) {
    return false;
  }
  return thisDate.getTime() < thatDate.getTime();
};
