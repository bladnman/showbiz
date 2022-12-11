"use strict";
const isDateBeforeDate = require("../date-utils/isDateBeforeDate.js");
const now = require("../date-utils/now.js");

/**
 * @memberof module:PSU
 * @method isItemInFuture
 * @param {ProgramItem|AiringItem} item - the item to check
 * @return {boolean} a boolean value indicating whether the item has aired in the past
 * */
module.exports = function isItemInFuture(item) {
  if (!item) {
    return false;
  }

  if (isDateBeforeDate(now(), item.airingDate)) {
    return true;
  }

  return false;
};
