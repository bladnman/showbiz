"use strict";
const isNoE = require("../object-utils/isNoE.js");

module.exports = function getURLParamValue(name) {
  if (!window || !window.location || !window.location.href || isNoE(name)) {
    return null;
  }

  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS, "i"); // i - case insensitive (always at this point)
  var results = regex.exec(window.location.href);
  return results === null ? "" : results[1];
};
