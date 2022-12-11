"use strict";
const isDateBeforeDate = require("./isDateBeforeDate.js");

module.exports = function isDateAfterOrEqualToDate(thisDate, thatDate) {
  return !isDateBeforeDate(thisDate, thatDate);
};
