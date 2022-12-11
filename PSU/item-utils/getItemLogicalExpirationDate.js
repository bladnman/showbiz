'use strict';
/**
 * @memberof module:PSU
 * @method getItemLogicalExpirationDate
 * @param {ProgramItem|AiringItem} item - the item get the expiration for
 * @return {Date} a date object indicating the expiration of the item. determined by "isFavorite" flag.
 * */
module.exports = function getItemLogicalExpirationDate(item) {
  if ( !item ) {
    return null;
  }

  if ( item.isFavorite ) {
    return item.dvrExpirationDate;
  }

  return item.expirationDate;
};
