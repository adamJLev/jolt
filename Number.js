/**
 * from http://www.prototypejs.org/api/number/times
 * @param iterator
 * @param context
 */
Number.prototype.times = function(iterator, context) {
  for (var i = 0; i < this; i++) iterator.call(context, i);
};

/**
 * Some sugar for easy/readable conversion to milliseconds
 * 
 * (2).hours() -> 7200000 ms
 */
Number.prototype.seconds = function() { return this * 1000; };
Number.prototype.minutes = function() { return this * 1000 * 60; };
Number.prototype.hours   = function() { return this * 1000 * 3600; };
Number.prototype.days    = function() { return this * 1000 * 3600 * 24; };