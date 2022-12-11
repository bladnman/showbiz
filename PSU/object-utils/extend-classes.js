"use strict";
const merge = require("./merge.js");

module.exports =
  function extendClasses(/* ChildClass, ParentClass1, ParentClass1, ...*/) {
    let ChildClass = arguments[0];

    if (!ChildClass) {
      return ChildClass;
    }

    // MERGE ALL PARENT PROTOTYPES
    let parentPrototype = {};

    for (var i = 1; i < arguments.length; ++i) {
      merge(parentPrototype, arguments[i].prototype);
    }

    // MERGE CHILD CLASS ON TOP OF PARENT CLASS
    ChildClass.prototype = merge(parentPrototype, ChildClass.prototype);
    return ChildClass;
  };
