"use strict";
const isNoE = require("../object-utils/isNoE.js");
const isDateAfterOrEqualToDate = require("./isDateAfterOrEqualToDate.js");
const isDateBeforeOrEqualToDate = require("./isDateBeforeOrEqualToDate.js");

module.exports = function isDateBetweenDates(
  dateInQuestion,
  earlierDate,
  laterDate
) {
  if (isNoE(dateInQuestion) || isNoE(earlierDate) || isNoE(laterDate)) {
    return false;
  }
  return (
    isDateAfterOrEqualToDate(dateInQuestion, earlierDate) &&
    isDateBeforeOrEqualToDate(dateInQuestion, laterDate)
  );
};
