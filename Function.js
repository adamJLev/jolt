/**
 * Returns a curried function.
 * See http://ejohn.org/blog/partial-functions-in-javascript/
 */
Function.prototype.curry = function() {
  var fn = this,
      args = Array.prototype.slice.call(arguments);
  
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
};

/**
 * Returns a partial function.
 * See http://ejohn.org/blog/partial-functions-in-javascript/
 */
Function.prototype.partial = function() {
  var fn = this,
      args = Array.prototype.slice.call(arguments);
  return function() {
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined)
        args[i] = arguments[arg++];
    return fn.apply(this, args);
  };
};

/**
 * Idea from http://osteele.com/sources/javascript/functional/
 * This method returns a wrapper function which discards the first "n", or all arguments.
 */
Function.prototype.aritize = function(n) {
  var fn = this;
  return function() {
    return fn.apply(this, Array.prototype.slice.call(arguments, 0, n || 0));
  }
};

/**
 * Idea from http://documentcloud.github.com/underscore/#wrap
 * @param wrapper
 */
Function.prototype.wrap = function(wrapper) {
  var fn = this;
  return function() {
    return wrapper.apply(wrapper, [fn].concat(Array.prototype.slice.call(arguments)));
  };
};

/**
 * Delays a function call.
 * Idea from http://api.prototypejs.org/language/function/prototype/delay/
 * @param ms
 */
Function.prototype.delay = function(ms /*[, arg...]*/) {
  var fn = this,
      args = Array.prototype.slice.call(arguments, 1);
  
  return window.setTimeout(function() {
    return fn.apply(fn, args);
  }, ms);
};

/**
 * Schedules the function to run as soon as the interpreter is idle.
 */
Function.prototype.defer = Function.prototype.delay.curry(0);

/**
 * Memoizes function. Cache key is JSON.stringify(arguments)
 */
Function.prototype.memoize = function() {
  var fn = this,
      cache = {};
  
  return function () {
    var hash = JSON.stringify(Array.prototype.slice.call(arguments));
    
    return (hash in cache) 
      ? cache[hash] 
      : cache[hash] = fn.apply(this, arguments);
  };
};

/**
 * Wrapper to poll some value via pollFn before calling the function.
 * NOTE: this function does not pass any arguments to the original function.
 * @param pollFn - This needs to be function that returns true when the original is ready to be called.
 * @param pollingInterval
 * 
 * EXAMPLE:
 * 
    (function(){
      doSomeShit(); // This fn depends on something async (ajax, etc)
    })
    .pollFor(function(){
      return something.isReady;
    });
 * 
 */
Function.prototype.pollFor = function(pollFn, pollingInterval) {
  var fn = this;
  
  if (pollFn()) {
    fn();
    return;
  }
  
  var intervalId = setInterval(function() {
    if (pollFn()) { 
      fn();
      clearInterval(intervalId);
    }
  }, pollingInterval || 333)
};


/**
 * http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
 * @param threshold
 * @param execAsap
 */
Function.prototype.debounce = function (threshold, execAsap) {
  var func = this, // reference to original function
      timeout; // handle to setTimeout async task (detection period)
  // return the new debounced function which executes the original function only once
  // until the detection period expires
  return function debounced() {
    var obj = this, // reference to original context object
        args = arguments; // arguments at execution time
    // this is the detection function. it will be executed if/when the threshold expires
    function delayed() {
      // if we're executing at the end of the detection period
      if (!execAsap)
        func.apply(obj, args); // execute now
      // clear timeout handle
      timeout = null;
    }

    // stop any current detection period
    if (timeout)
      clearTimeout(timeout);
    // otherwise, if we're not already waiting and we're executing at the beginning of the waiting period
    else if (execAsap)
      func.apply(obj, args); // execute now
    // reset the waiting period
    timeout = setTimeout(delayed, threshold || 100);
  };
};
