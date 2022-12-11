"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function absDateFromDate(date) {
  if (isNoE(date)) {
    return null;
  }

  var newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
