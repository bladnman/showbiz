"use strict";
const isDateBetweenDates = require("../date-utils/isDateBetweenDates.js");
const now = require("../date-utils/now.js");

/**
 * @memberof module:PSU
 * @method isItemLive
 * @param {ProgramItem|AiringItem} item - the item to check for liveness
 * @return {boolean} a boolean value indicating whether the item is currently live
 * */
module.exports = function isItemLive(item) {
  if (!item) {
    return false;
  }

  // NOW DATE IS BETWEEN AIRING END DATE AND START DATE
  if (isDateBetweenDates(now(), item.airingDate, item.airingEnddate)) {
    return true;
  }

  return false;
};
