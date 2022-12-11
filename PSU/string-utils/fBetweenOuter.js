"use strict";
const fLeftBack = require("./fLeftBack.js");
const fRight = require("./fRight.js");

module.exports = function fBetweenOuter(string, delimLeft, delimRight) {
  return fLeftBack(fRight(string, delimLeft), delimRight);
};
