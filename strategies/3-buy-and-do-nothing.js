// helpers
var _ = require('lodash');
var log = require('../core/log.js');

// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function () {
  // keep state about the current trend
  // here, on every new candle we use this
  // state object to check if we need to
  // report it.
  this.status = {
    bought: false
  };

  // how many candles do we need as a base
  // before we can start giving advice?
  this.requiredHistory = 0;
}

// what happens on every new candle?
method.update = function (candle) {
  // nothing!
}

// for debugging purposes: log the last calculated
// EMAs and diff.
method.log = function () {
  // nothing
}

method.check = function () {
  if (!this.status.bought) {
    this.advice('long');
    this.status.bought = true;
  } else {
    this.advice();
  }
}

module.exports = method;
