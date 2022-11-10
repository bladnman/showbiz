## Including in an Ember application

***NOTE***: This documentation is still a work-in-progress, as is the solution it's attempting to outline.  


#### Registering a bundle in ember-cli-build.js

The current solution for wiring up external node modules within Ember is to use the [broccoli-es6modules add-on](https://github.com/ember-cli/broccoli-es6modules).

This entails...

1) Installing the package as an npm module...  
```
npm install psu
```
2) Mapping the source directory of the module to a Broccoli tree within ```ember-cli-build.js```
```
/* global require, module */
var
  EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  ES6Modules = require('broccoli-es6modules'),
  mergeTrees = require('broccoli-merge-trees'),

  psuTree = './node_modules/psu/dist';


module.exports = function(defaults) {

  var
    app = new EmberApp(defaults, {
      // Add options here
    }),

    // make AMD bundle out of our vue-data package so that we
    // can them register it as a named module within Ember.
    //
    // e.g: import { sortAscending, sortDescending } from 'psu';
    // e.g: const PSU = require('psu');
    psuFiles = new ES6Modules(psuTree, {
      format: 'amd',
	  // create module definition
      esperantoOptions: {
        entry: 'index.js',
        amdName: 'psu',
        strict: true
      },

      // bundle into one file
      bundleOptions: {
        entry: 'index.js',
        name: 'psu'
      }
    });

  return mergeTrees( [ app.toTree(), psuFiles ] );

};

```
3) Sourcing the bundled JS file in app/index.html... just after Ember's default vendor ```<script>``` tag and before the main application tag:

```
<script src="assets/vendor.js"></script>
<script src="psu.js"></script>    
<script src="assets/vue-data-consumer-app.js"></script>
```

***TODO***: See if there's a way to build this directly into ```assets/vendor.js```

## Requiring as a CommonJS Node Module

***Question***: Is this even possible / desireable?
```
npm install --save-dev psu
```
