'use strict';
/**
 * PlayStation Utilities
 * @module PSU
 */


// Object Utils
const merge = require('./object-utils/merge');
const extendClass = require('./object-utils/extendClass');
const extendClasses = require('./object-utils/extend-classes');
const setVal = require('./object-utils/setVal');
const getVal = require('./object-utils/getVal');
const isAnyNoE = require('./object-utils/isAnyNoE');
const isNoE = require('./object-utils/isNoE');
const isA = require('./object-utils/isA');
const valueFromObject = require('./object-utils/valueFromObject');


// String Utils
const fLeft = require('./string-utils/fLeft');
const fLeftBack = require('./string-utils/fLeftBack');
const fRight = require('./string-utils/fRight');
const fRightBack = require('./string-utils/fRightBack');
const fBetween = require('./string-utils/fBetween');
const fBetweenOuter = require('./string-utils/fBetweenOuter');
const getURLParamValue = require('./string-utils/getURLParamValue');
const getStringValue = require('./string-utils/getStringValue');
const startsWith = require('./string-utils/startsWith');
const endsWith = require('./string-utils/endsWith');
const contains = require('./string-utils/contains');
const replaceFor = require('./string-utils/replaceFor');
const replaceKeys = require('./string-utils/replaceKeys');
const toStringArrayOfItemsByKey = require('./string-utils/toStringArrayOfItemsByKey');


// Math Utils
const getFloatValue = require('./math-utils/getFloatValue');
const getIntValue = require('./math-utils/getIntValue');
const getIntValueByRounding = require('./math-utils/getIntValueByRounding');
const returnDecimalPlaces = require('./math-utils/returnDecimalPlaces');
const getNextIntDivisibleBy = require('./math-utils/getNextIntDivisibleBy');
const flipIsHeads = require('./math-utils/flipIsHeads');
const random = require('./math-utils/random');
const roll = require('./math-utils/roll');



// Type Utils
const isArray = require('./type-utils/isArray');
const isString = require('./type-utils/isString');
const isDate = require('./type-utils/isDate');
const isNumber = require('./type-utils/isNumber');
const isRegExp = require('./type-utils/isRegExp');
const isBoolean = require('./type-utils/isBoolean');
const isInt = require('./type-utils/isInt');
const isFunction = require('./type-utils/isFunction');
const isObject = require('./type-utils/isObject');
const isJquery = require('./type-utils/isJquery');


// Array Utils
const arrayIndexOf = require('./array-utils/arrayIndexOf');
const arrayContains = require('./array-utils/arrayContains');
const arrayPopElement = require('./array-utils/arrayPopElement');
const arrayPopFirstElement = require('./array-utils/arrayPopFirstElement');
const arrayPopLastElement = require('./array-utils/arrayPopLastElement');
const arrayPushUnique = require('./array-utils/arrayPushUnique');
const arrayRotateFirstToLast = require('./array-utils/arrayRotateFirstToLast');
const arrayRandomItem = require('./array-utils/arrayRandomItem');
const arrayCopy = require('./array-utils/arrayCopy');


// Date Utils
const now = require('./date-utils/now');
const nowTime = require('./date-utils/nowTime');
const secondsDiff = require('./date-utils/secondsDiff');
const secondsFromDate = require('./date-utils/secondsFromDate');
const secondsFromTimecode = require('./date-utils/secondsFromTimecode');
const yearsFromSeconds = require('./date-utils/yearsFromSeconds');
const timecodeFromSeconds = require('./date-utils/timecodeFromSeconds');
const absDateFromDate = require('./date-utils/absDateFromDate');
const dateByAddingDaysToDate = require('./date-utils/dateByAddingDaysToDate');
const dateByAddingHoursToDate = require('./date-utils/dateByAddingHoursToDate');
const dateByAddingMinutesToDate = require('./date-utils/dateByAddingMinutesToDate');
const dateByAddingSecondsToDate = require('./date-utils/dateByAddingSecondsToDate');
const dateFromISO = require('./date-utils/dateFromISO');
const dateFromString = require('./date-utils/dateFromString');
const dateFromYMD = require('./date-utils/dateFromYMD');
const trimmedISOUTCFromDate = require('./date-utils/trimmedISOUTCFromDate');
const isValidDate = require('./date-utils/isValidDate');
const isDateAfterOrEqualToDate = require('./date-utils/isDateAfterOrEqualToDate');
const isDateBeforeOrEqualToDate = require('./date-utils/isDateBeforeOrEqualToDate');
const isDateBeforeDate = require('./date-utils/isDateBeforeDate');
const isDateAfterDate = require('./date-utils/isDateAfterDate');
const isDateBetweenDates = require('./date-utils/isDateBetweenDates');
const getMinutesUntilNextMinuteDivisibleBy = require('./date-utils/getMinutesUntilNextMinuteDivisibleBy');
const dateFormat = require('./date-utils/dateFormat');

module.exports = {
  breath: require('./breath'),
  getArrayValue: require('./getArrayValue'),
  getBooleanValue: require('./getBooleanValue'),
  kochava: require('./kochava'),

  isA: isA,
  isNoE: isNoE,
  isNullOrEmpty: isNoE,
  isAnyNoE: isAnyNoE,
  getStringValue: getStringValue,
  getFloatValue: getFloatValue,
  getIntValue: getIntValue,
  getIntValueByRounding: getIntValueByRounding,
  getVal: getVal,
  setVal: setVal,
  random: random,
  flipIsHeads: flipIsHeads,
  roll: roll,
  fLeft: fLeft,
  fLeftBack: fLeftBack,
  fRight: fRight,
  fRightBack: fRightBack,
  fBetween: fBetween,
  fBetweenOuter: fBetweenOuter,
  replaceFor: replaceFor,
  contains: contains,
  endsWith: endsWith,
  startsWith: startsWith,
  returnDecimalPlaces: returnDecimalPlaces,
  merge: merge,
  extendClass: extendClass,
  extendClasses: extendClasses,
  getURLParamValue: getURLParamValue,
  getNextIntDivisibleBy: getNextIntDivisibleBy,
  isArray: isArray,
  isString: isString,
  isDate: isDate,
  isNumber: isNumber,
  isRegExp: isRegExp,
  isBoolean: isBoolean,
  isInt: isInt,
  isFunction: isFunction,
  isObject: isObject,
  isJquery: isJquery,
  arrayIndexOf: arrayIndexOf,
  arrayContains: arrayContains,
  arrayPopElement: arrayPopElement,
  arrayPopFirstElement: arrayPopFirstElement,
  arrayPopLastElement: arrayPopLastElement,
  arrayPushUnique: arrayPushUnique,
  arrayRotateFirstToLast: arrayRotateFirstToLast,
  arrayRandomItem: arrayRandomItem,
  arrayCopy: arrayCopy,
  now: now,
  nowTime: nowTime,
  dateFromISO: dateFromISO,
  secondsDiff: secondsDiff,
  secondsFromDate: secondsFromDate,
  secondsFromTimecode: secondsFromTimecode,
  yearsFromSeconds: yearsFromSeconds,
  timecodeFromSeconds: timecodeFromSeconds,
  absDateFromDate: absDateFromDate,
  dateByAddingDaysToDate: dateByAddingDaysToDate,
  dateByAddingHoursToDate: dateByAddingHoursToDate,
  dateByAddingMinutesToDate: dateByAddingMinutesToDate,
  dateByAddingSecondsToDate: dateByAddingSecondsToDate,
  dateFromYMD: dateFromYMD,
  dateFromString: dateFromString,
  isDateAfterOrEqualToDate: isDateAfterOrEqualToDate,
  isDateBeforeOrEqualToDate: isDateBeforeOrEqualToDate,
  isDateBeforeDate: isDateBeforeDate,
  isDateAfterDate: isDateAfterDate,
  isDateBetweenDates: isDateBetweenDates,
  getMinutesUntilNextMinuteDivisibleBy: getMinutesUntilNextMinuteDivisibleBy,
  trimmedISOUTCFromDate: trimmedISOUTCFromDate,
  isValidDate: isValidDate,
  dateFormat : dateFormat,
  toStringArrayOfItemsByKey: toStringArrayOfItemsByKey,
  valueFromObject: valueFromObject,
  replaceKeys: replaceKeys,

  // item-utils
  getItemLogicalExpirationDate: require('./item-utils/getItemLogicalExpirationDate'),
  isItemExpired: require('./item-utils/isItemExpired'),
  isItemInFuture: require('./item-utils/isItemInFuture'),
  isItemLive: require('./item-utils/isItemLive'),
  isItemPlayable: require('./item-utils/isItemPlayable')
};
