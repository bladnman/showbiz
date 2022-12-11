'use strict';
module.exports = function dateFromString(string) {
  let date = null;

  if (typeof string === 'string') {
    date = new Date(string);
    if (isNaN(date)) {
      date = null;
    }
  }

  return date;
};