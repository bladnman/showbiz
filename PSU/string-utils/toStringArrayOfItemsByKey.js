'use strict';
module.exports = (array, key) => {

  if ( !array || array.length < 1 || !key ) {
    return null;
  }

  return array.reduce(function(previousValue, item) {
    return previousValue ? previousValue + ', ' + item[key] : item[key];
  }, '');
};
