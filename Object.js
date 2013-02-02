/**
  DO NOT ACTUALLY PROTOTYPE-EXTEND THE 'Object' OBJECT!! You will suffer a very slow and painful death.
  You should only add static methods to it. 
 */

/**
 * Unsets a single key or array of keys from passed in obj.
 * @param obj
 * @param keys
 */
Object.delKeys = function(obj, keys) {
  keys = Array.prototype.concat(keys); // To array
  
  for (var i = keys.length; i--;) { 
    delete obj[keys[i]];
  }
  
  return obj;
};

Object.setKeys = function(obj, keys, val) {
  keys = Array.prototype.concat(keys); // To array
  
  for (var i = keys.length; i--;) {
    obj[keys[i]] = val;
  }
  
  return obj;
};

Object.keys = Object.keys || function(obj) {
  var keys = [];
  for (var k in obj) {
    keys.push(k);
  }
  return keys;
};

Object.values = function(obj) {
  var ret = [];
  for (var k in obj) {
    ret.push(obj[k]);
  }
  return ret;
};

Object.equals = function(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof(x[p]) !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!Object.equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
    // allows x[ p ] to be set to undefined
  }
  return true;
};
