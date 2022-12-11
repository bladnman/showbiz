"use strict";
/**
 * PlayStation Utilities
 * @module PSU
 */

// Object Utils
const merge = require("./object-utils/merge.js");
const extendClass = require("./object-utils/extendClass.js");
const extendClasses = require("./object-utils/extend-classes.js");
const setVal = require("./object-utils/setVal.js");
const getVal = require("./object-utils/getVal.js");
const isAnyNoE = require("./object-utils/isAnyNoE.js");
const isNoE = require("./object-utils/isNoE.js");
const isA = require("./object-utils/isA.js");
const valueFromObject = require("./object-utils/valueFromObject.js");

// String Utils
const fLeft = require("./string-utils/fLeft.js");
const fLeftBack = require("./string-utils/fLeftBack.js");
const fRight = require("./string-utils/fRight.js");
const fRightBack = require("./string-utils/fRightBack.js");
const fBetween = require("./string-utils/fBetween.js");
const fBetweenOuter = require("./string-utils/fBetweenOuter.js");
const getURLParamValue = require("./string-utils/getURLParamValue.js");
const getStringValue = require("./string-utils/getStringValue.js");
const startsWith = require("./string-utils/startsWith.js");
const endsWith = require("./string-utils/endsWith.js");
const contains = require("./string-utils/contains.js");
const replaceFor = require("./string-utils/replaceFor.js");
const replaceKeys = require("./string-utils/replaceKeys.js");
const toStringArrayOfItemsByKey = require("./string-utils/toStringArrayOfItemsByKey.js");

// Math Utils
const getFloatValue = require("./math-utils/getFloatValue.js");
const getIntValue = require("./math-utils/getIntValue.js");
const getIntValueByRounding = require("./math-utils/getIntValueByRounding.js");
const returnDecimalPlaces = require("./math-utils/returnDecimalPlaces.js");
const getNextIntDivisibleBy = require("./math-utils/getNextIntDivisibleBy.js");
const flipIsHeads = require("./math-utils/flipIsHeads.js");
const random = require("./math-utils/random.js");
const roll = require("./math-utils/roll.js");

// Type Utils
const isArray = require("./type-utils/isArray.js");
const isString = require("./type-utils/isString.js");
const isDate = require("./type-utils/isDate.js");
const isNumber = require("./type-utils/isNumber.js");
const isRegExp = require("./type-utils/isRegExp.js");
const isBoolean = require("./type-utils/isBoolean.js");
const isInt = require("./type-utils/isInt.js");
const isFunction = require("./type-utils/isFunction.js");
const isObject = require("./type-utils/isObject.js");
const isJquery = require("./type-utils/isJquery.js");

// Array Utils
const arrayIndexOf = require("./array-utils/arrayIndexOf.js");
const arrayContains = require("./array-utils/arrayContains.js");
const arrayPopElement = require("./array-utils/arrayPopElement.js");
const arrayPopFirstElement = require("./array-utils/arrayPopFirstElement.js");
const arrayPopLastElement = require("./array-utils/arrayPopLastElement.js");
const arrayPushUnique = require("./array-utils/arrayPushUnique.js");
const arrayRotateFirstToLast = require("./array-utils/arrayRotateFirstToLast.js");
const arrayRandomItem = require("./array-utils/arrayRandomItem.js");
const arrayCopy = require("./array-utils/arrayCopy.js");

// Date Utils
const now = require("./date-utils/now.js");
const nowTime = require("./date-utils/nowTime.js");
const secondsDiff = require("./date-utils/secondsDiff.js");
const secondsFromDate = require("./date-utils/secondsFromDate.js");
const secondsFromTimecode = require("./date-utils/secondsFromTimecode.js");
const yearsFromSeconds = require("./date-utils/yearsFromSeconds.js");
const timecodeFromSeconds = require("./date-utils/timecodeFromSeconds.js");
const absDateFromDate = require("./date-utils/absDateFromDate.js");
const dateByAddingDaysToDate = require("./date-utils/dateByAddingDaysToDate.js");
const dateByAddingHoursToDate = require("./date-utils/dateByAddingHoursToDate.js");
const dateByAddingMinutesToDate = require("./date-utils/dateByAddingMinutesToDate.js");
const dateByAddingSecondsToDate = require("./date-utils/dateByAddingSecondsToDate.js");
const dateFromISO = require("./date-utils/dateFromISO.js");
const dateFromString = require("./date-utils/dateFromString.js");
const dateFromYMD = require("./date-utils/dateFromYMD.js");
const trimmedISOUTCFromDate = require("./date-utils/trimmedISOUTCFromDate.js");
const isValidDate = require("./date-utils/isValidDate.js");
const isDateAfterOrEqualToDate = require("./date-utils/isDateAfterOrEqualToDate.js");
const isDateBeforeOrEqualToDate = require("./date-utils/isDateBeforeOrEqualToDate.js");
const isDateBeforeDate = require("./date-utils/isDateBeforeDate.js");
const isDateAfterDate = require("./date-utils/isDateAfterDate.js");
const isDateBetweenDates = require("./date-utils/isDateBetweenDates.js");
const getMinutesUntilNextMinuteDivisibleBy = require("./date-utils/getMinutesUntilNextMinuteDivisibleBy.js");
const dateFormat = require("./date-utils/dateFormat.js");

module.exports = {
  breath: require("./breath.js"),
  getArrayValue: require("./getArrayValue.js"),
  getBooleanValue: require("./getBooleanValue.js"),
  kochava: require("./kochava.js"),

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
  dateFormat: dateFormat,
  toStringArrayOfItemsByKey: toStringArrayOfItemsByKey,
  valueFromObject: valueFromObject,
  replaceKeys: replaceKeys,

  // item-utils
  getItemLogicalExpirationDate: require("./item-utils/getItemLogicalExpirationDate.js"),
  isItemExpired: require("./item-utils/isItemExpired.js"),
  isItemInFuture: require("./item-utils/isItemInFuture.js"),
  isItemLive: require("./item-utils/isItemLive.js"),
  isItemPlayable: require("./item-utils/isItemPlayable.js"),
};
