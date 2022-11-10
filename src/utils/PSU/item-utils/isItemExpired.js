'use strict';
const getItemLogicalExpirationDate = require('./getItemLogicalExpirationDate');
const isDate = require('../type-utils/isDate');
const isDateAfterDate = require('../date-utils/isDateAfterDate');
const now = require('../date-utils/now');

/**
 * @memberof module:PSU
 * @method isItemExpired
 * @param {ProgramItem|AiringItem} item - the item to check for expiration
 * @return {boolean} a boolean value indicating whether the item is expired. expiration is dependent on "isFavorite" property
 * */
module.exports = function isItemExpired(item) {
  if ( !item ) {
    return false;
  }

  var expireDateToCheck   = getItemLogicalExpirationDate(item);

  // no valid date - default to non-expired
  if ( !expireDateToCheck || ! isDate(expireDateToCheck)) {
    return false;
  }

  return isDateAfterDate(now(), expireDateToCheck);
};
