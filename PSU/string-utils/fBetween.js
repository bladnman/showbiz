"use strict";
const fLeft = require("./fLeft.js");
const fRight = require("./fRight.js");

module.exports = function fBetween(string, delimLeft, delimRight) {
  return fLeft(fRight(string, delimLeft), delimRight);
};
