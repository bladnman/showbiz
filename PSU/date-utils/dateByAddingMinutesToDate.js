"use strict";
const dateByAddingSecondsToDate = require("./dateByAddingSecondsToDate.js");

module.exports = function dateByAddingMinutesToDate(date, minutes) {
  return dateByAddingSecondsToDate(date, minutes * 60);
};
