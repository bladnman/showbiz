"use strict";
const isItemInFuture = require("./isItemInFuture.js");
const isItemExpired = require("./isItemExpired.js");
const isItemLive = require("./isItemLive.js");
const BADGES = require("../../constants/badge-constants");

/**
 * Use this function to determine if an item is playable. it takes into account mobile and out of home restrictions.
 * If you are passing in an airing item you need to add the "isFavorite" flag on it in order for it to do the proper
 * checks. The isFavorite flag is on the parent program object, the mlbam data sadly doesnt give us that information.
 *
 * @memberof module:PSU
 * @method isItemPlayable
 * @param {ChannelItem|ProgramItem|AiringItem} item - the item to test it's playability
 * @param {boolean} [isMobile] (optional) - is the client mobile. default is false.
 * @param {boolean} [isOutOfHome] (optional) - is the client out of home
 * @return {boolean} a boolean value indicating whether the item is playable or not
 * */
module.exports = function isItemPlayable(item, isMobile, isOutOfHome) {
  if (!item) {
    return false;
  }

  // CHANNELS ARE PLAYABLE : for mobile restrictions we need to check mobile restrictions
  if (item.isChannelItem) {
    return true;
  }

  // NOT A PROGRAM OR NOT AIRING : not playable
  if (!item.isProgramItem && !item.isAiringItem) {
    return false;
  }

  // MOBILE CLIENT : content is restricted
  if (isMobile && item.isMobileRestricted) {
    return false;
  }

  // OUT OF HOME : content is restricted
  if (isOutOfHome && item.isOutOfHomeRestricted) {
    return false;
  }

  // OUT OF HOME DVR : content is dvr out of home restricted
  if (isOutOfHome && item.isFavorite && item.isDvrOutOfHomeRestricted) {
    return false;
  }

  // IN FUTURE : hasn't aired yet not playable
  if (isItemInFuture(item)) {
    return false;
  }

  // EXPIRED : not playable
  if (isItemExpired(item)) {
    return false;
  }

  // LIVE - playable
  if (isItemLive(item)) {
    return true;
  }

  // check badge code for playabiity
  const badgeCode = item.badgeCode;
  if (
    badgeCode === BADGES.CODES.DVR ||
    badgeCode === BADGES.CODES.CATCHUP ||
    badgeCode === BADGES.CODES.VOD
  ) {
    return true;
  }

  return false;
};
