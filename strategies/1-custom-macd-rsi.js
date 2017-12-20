// This is a basic example strategy for Gekko.
// For more information on everything please refer
// to this document:
//
// https://gekko.wizb.it/docs/strategies/creating_a_strategy.html
//
// The example below is pretty bad investment advice: on every new candle there is
// a 10% chance it will recommend to change your position (to either
// long or short).



/*

TODO

1. RSI
2. MACD
3. Bollinger Bands
4. Supertrend indicator 

5. Indicator confluence = Alles samen

- vorige support punten checken + 3 bijhouden ofzo. En dan kijken of huidige low gelijk is aan die lows en dan kopen. 
    Zo niet kunnen we misschien nog even wachten met kopen of tot het terug begint te stijgen.




*/



var log = require('../core/log');

// Let's create our own strat
var strat = {};

// Prepare everything our method needs
strat.init = function() {
  this.input = 'candle';
  this.currentTrend = 'long';
  this.requiredHistory = 0;

  // this.addTulipIndicator('myadx', 'adx', { 'optInTimePeriod': 10 });
  this.addTulipIndicator('mybb', 'bbands', { 'optInTimePeriod': 2, 'optInNbStdDevs': 100});
  //this.addTulipIndicator('mystoch', 'stoch', customMACDSettings);
  //this.addTulipIndicator('mycci', 'cci', customMACDSettings);
}

// What happens on every new candle?
strat.update = function(candle) {
}

// For debugging purposes.
strat.log = function() {

}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {

  var price = candle.close;
  var result = this.tulipIndicators.mybb.result;

  var lower = result['bbandsLower'];
  var medium = result['bbandsMiddle'];
  var upper = result['bbandsUpper'];

  log.debug('price', price);
  log.debug('lower', lower);
  log.debug('medium', medium);
  log.debug('upper', upper);

  if(price > upper) {
    log.debug('BREAK OUT UPPER');
  } else if(price < lower) {
    log.debug('BREAK OUT LOWER');
  }

  if(this.currentTrend === 'long') {

    // If it was long, set it to short
    this.currentTrend = 'short';
    this.advice('short');

  } else {

    // If it was short, set it to long
    this.currentTrend = 'long';
    this.advice('long');

  }

  log.debug('=========================');
}

module.exports = strat;
