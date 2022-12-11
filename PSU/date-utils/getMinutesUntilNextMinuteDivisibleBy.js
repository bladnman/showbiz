"use strict";
const getNextIntDivisibleBy = require("../math-utils/getNextIntDivisibleBy.js");

module.exports = function getMinutesUntilNextMinuteDivisibleBy(divisibleBy) {
  var currentMinute = new Date().getMinutes();

  // we want this value aligned to the x-minute point on a clock
  var nextMinutesToRefresh = getNextIntDivisibleBy(currentMinute, divisibleBy);

  // minutes - must be within an hour
  if (nextMinutesToRefresh > 60) {
    return divisibleBy;
  }

  return nextMinutesToRefresh - currentMinute;
};
