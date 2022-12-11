"use strict";
const isDateAfterDate = require("./isDateAfterDate.js");

module.exports = function isDateBeforeOrEqualToDate(thisDate, thatDate) {
  return !isDateAfterDate(thisDate, thatDate);
};
