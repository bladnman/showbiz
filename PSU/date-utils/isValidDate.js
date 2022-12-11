"use strict";
const isDate = require("../type-utils/isDate.js");

/**
 * Helper that provides a definitive answer to whether or not an object
 * is a valid date.
 *
 * Why? JavaScript's Date constructor will always create and return an object
 * whose TYPE is Date -- even when we perform something like
 * `new Date(undefined)` or `new Date('I am Batman')`
 *
 */
module.exports = function isValidDate(value) {
  return isDate(value) && !isNaN(value.getTime());
};
