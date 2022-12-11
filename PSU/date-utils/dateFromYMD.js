"use strict";
const fLeft = require("../string-utils/fLeft.js");
const fBetween = require("../string-utils/fBetween.js");
const fRightBack = require("../string-utils/fRightBack.js");

module.exports = function dateFromYMD(ymdString) {
  var year = fLeft(ymdString, "-");
  var month = fBetween(ymdString, "-", "-");
  var day = fRightBack(ymdString, "-");

  // bail
  if (year === "" || month === "" || day === "") {
    return null;
  }

  return new Date(year, month - 1, day);
};
