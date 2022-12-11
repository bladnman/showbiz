"use strict";
const random = require("./random.js");

module.exports = function flipIsHeads() {
  var r = random(1);
  return r === 1;
};
