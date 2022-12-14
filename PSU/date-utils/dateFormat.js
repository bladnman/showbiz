"use strict";
const fLeft = require("../string-utils/fLeft.js");
const fBetween = require("../string-utils/fBetween.js");
const fRightBack = require("../string-utils/fRightBack.js");

function DF(ymdString) {
  /*
   *  Date Format 1.2.3
   *  (c) 2007-2009 Steven Levithan <stevenlevithan.com>
   *  MIT license
   *
   *  Includes enhancements by Scott Trenda <scott.trenda.net>
   *  and Kris Kowal <cixar.com/~kris.kowal/>
   *
   *  Accepts a date, a mask, or a date and a mask.
   *  Returns a formatted version of the given date.
   *  The date defaults to the current date/time.
   *  The mask defaults to dateFormat.masks.default.
   *
   *    dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   *      -> Saturday, June 9th, 2007, 5:46:21 PM
   *    dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   *      -> Saturday, June 9th, 2007, 5:46:21 PM
   *
   *  http://blog.stevenlevithan.com/archives/date-time-format
   */
  let a = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    b =
      /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    c = /[^-+\dA-Z]/g,
    d = function (a, b) {
      a = String(a);
      b = b || 2;
      while (a.length < b) a = "0" + a;
      return a;
    };
  return function (e, f, g) {
    let h = dateFormat;
    if (
      arguments.length == 1 &&
      Object.prototype.toString.call(e) == "[object String]" &&
      !/\d/.test(e)
    ) {
      f = e;
      e = undefined;
    }
    e = e ? new Date(e) : new Date();
    if (isNaN(e)) throw SyntaxError("invalid date");
    f = String(h.masks[f] || f || h.masks["default"]);
    if (f.slice(0, 4) == "UTC:") {
      f = f.slice(4);
      g = true;
    }
    let i = g ? "getUTC" : "get",
      j = e[i + "Date"](),
      k = e[i + "Day"](),
      l = e[i + "Month"](),
      m = e[i + "FullYear"](),
      n = e[i + "Hours"](),
      o = e[i + "Minutes"](),
      p = e[i + "Seconds"](),
      q = e[i + "Milliseconds"](),
      r = g ? 0 : e.getTimezoneOffset(),
      s = {
        d: j,
        dd: d(j),
        ddd: h.i18n.dayNames[k],
        dddd: h.i18n.dayNames[k + 7],
        m: l + 1,
        mm: d(l + 1),
        mmm: h.i18n.monthNames[l],
        mmmm: h.i18n.monthNames[l + 12],
        yy: String(m).slice(2),
        yyyy: m,
        h: n % 12 || 12,
        hh: d(n % 12 || 12),
        H: n,
        HH: d(n),
        M: o,
        MM: d(o),
        s: p,
        ss: d(p),
        l: d(q, 3),
        L: d(q > 99 ? Math.round(q / 10) : q),
        t: n < 12 ? "a" : "p",
        tt: n < 12 ? "am" : "pm",
        T: n < 12 ? "A" : "P",
        TT: n < 12 ? "AM" : "PM",
        Z: g ? "UTC" : (String(e).match(b) || [""]).pop().replace(c, ""),
        o:
          (r > 0 ? "-" : "+") +
          d(Math.floor(Math.abs(r) / 60) * 100 + (Math.abs(r) % 60), 4),
        S: ["th", "st", "nd", "rd"][
          j % 10 > 3 ? 0 : (((j % 100) - (j % 10) != 10) * j) % 10
        ],
      };
    return f.replace(a, function (a) {
      return a in s ? s[a] : a.slice(1, a.length - 1);
    });
  };
}
var dateFormat = DF();

dateFormat.masks = {
  default: "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
};
dateFormat.i18n = {
  dayNames: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

module.exports = dateFormat;
