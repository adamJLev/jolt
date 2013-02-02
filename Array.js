/**
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 */
Array.prototype.forEach = Array.prototype.forEach || function(fun /*, thisp */) {
  if (this === void 0 || this === null)
    throw new TypeError();

  var t = Object(this),
      len = t.length >>> 0;

  if (typeof fun !== "function")
    throw new TypeError();

  var thisp = arguments[1];
  for (var i = 0; i < len; i++) {
    if (i in t)
      fun.call(thisp, t[i], i, t);
  }
};

/**
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
 */
Array.prototype.map = Array.prototype.map || function(fun /*, thisp */) {
  if (this === void 0 || this === null)
    throw new TypeError();

  var t = Object(this),
      len = t.length >>> 0;
  if (typeof fun !== "function")
    throw new TypeError();

  var res = new Array(len);
  var thisp = arguments[1];
  for (var i = 0; i < len; i++) {
    if (i in t)
      res[i] = fun.call(thisp, t[i], i, t);
  }

  return res;
};

/**
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
 */
Array.prototype.every = Array.prototype.every || function(fun /*, thisp */) {  
  if (this === void 0 || this === null)  
    throw new TypeError();  

  var t = Object(this),
      len = t.length >>> 0;  
  if (typeof fun !== "function")  
    throw new TypeError();  

  var thisp = arguments[1];  
  for (var i = 0; i < len; i++) {  
    if (i in t && !fun.call(thisp, t[i], i, t))  
      return false;  
  }  

  return true;  
};

/**
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
 */
Array.prototype.some = Array.prototype.some || function(fun /*, thisp */) {
  if (this === void 0 || this === null)
    throw new TypeError();

  var t = Object(this),
      len = t.length >>> 0;
  if (typeof fun !== "function")
    throw new TypeError();

  var thisp = arguments[1];
  for (var i = 0; i < len; i++) {
    if (i in t && fun.call(thisp, t[i], i, t))
      return true;
  }

  return false;
};

/**
 * Idea taken from 
 *   http://www.prototypejs.org/api/enumerable/pluck
 */
Array.prototype.pluck = function(key) {
  return this.map(function(obj) {
    return obj[key];
  })
};


/**
 * Array Remove - By John Resig (MIT Licensed)
 *  http://ejohn.org/blog/javascript-array-remove/
 * 
 * destructive
 * @param from
 * @param to
 */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/**
 * Returns a new array with only the values that pass the iterator's test.
 * @param iterator
 */
Array.prototype.grep = function(iterator, inverse) {
  var ret = [],
      test = !inverse;
  
  for (var i = 0, l = this.length; i < l; i++) {
    iterator.call(null, this[i], i) === test && ret.push(this[i]);
  }
  return ret;
};

/**
 * Like grep, but only returns values that don't pass the test.
 * @param iterator
 */
Array.prototype.reject = function(iterator) {
  return this.grep(iterator, true);
};

/**
 * Binary search.
 * Could be faster if it wasn't for all this bullshit that is needed when you're sorting
 *  an array of objects and there's strings in there too.
 * @param obj
 * @param compareKey - If this is passed, it will use needle[compareKey] and item[compareKey] for each comparison.
 * @param caseInsensitive - If true, it will lowercase any Strings before comparing them.
 * @return index where obj would be inserted to maintain array order.
 */
Array.prototype.bisect = function(obj, compareKey, caseInsensitive) {
  if (!obj) return this.length;
  
  var floor = Math.floor,
      needle = compareKey ? obj[compareKey] : obj,
      lo = 0,
      mid,
      //mid = floor((lo + hi) / 2),
      hi = this.length,
      //hi = this.length - 1,
      val = caseInsensitive 
          ? function(x) { return typeof(x) === 'string' ? x.toLowerCase() : x; }
          : function(x) { return x; }; 
  
  if (!needle) throw("[bisect] needle can't be falsy");
  
  while (lo < hi) {
    mid = floor((lo + hi) / 2);
    
    if (val(needle) < val(compareKey ? this[mid][compareKey] : this[mid]))
      hi = mid;
    else
      lo = mid + 1;
  }
  return lo;
};

/**
 * Does a binary search on a sorted array and inserts object in right place.
 * 
 * NOTE: this method modifies the array in place
 * @param obj
 * @param compareKey
 * @param caseInsensitive
 * @param noDupes - If true, it will make sure the object doesn't already exist before inserting it.
 */
Array.prototype.insort = function(obj, compareKey, caseInsensitive, noDupes) {
  if (noDupes) {
    var index = this.bisect(obj, compareKey, caseInsensitive),
        item = this[index];
    
    if ((compareKey ? this[index][compareKey] : this[index]) == (compareKey ? obj[compareKey] : obj)) 
      return;
    
    this.splice(this.bisect(obj, compareKey, caseInsensitive), 0, obj);
  }
  else {
    this.splice(this.bisect(obj, compareKey, caseInsensitive), 0, obj);    
  }
};

/**
 * Similar to Array.indexOf, but takes a comparison function.
 */
Array.prototype.selectIndex = function(iterator) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (iterator(this[i]) === true) return i;
  }
  return -1;
};

/**
 * In place Fisher-Yates shuffle.
 *   http://dtm.livejournal.com/38725.html
 *   http://en.wikipedia.org/wiki/Fisher-Yates_shuffle
 */
Array.prototype.shuffle = function() {
  var j, tmp;
  for (var i = 1; i < this.length; i++) {
    j = Math.floor(Math.random() * (1 + i));  // choose j in [0..i]
    if (j != i) {
      tmp = this[i];                        // swap list[i] and list[j]
      this[i] = this[j];
      this[j] = tmp;
    }
  }
  
  return this;
};

/**
 * Like insort, but deletes the entry instead. It does NOT leave a gap in the array.
 * 
 * NOTE: this method modifies the array in place
 * @param obj
 * @param compareKey
 * @param caseInsensitive
 */
Array.prototype.uninsort = function(obj, compareKey, caseInsensitive) {
  this.remove(this.bisect(obj, compareKey, caseInsensitive) + 1);
};

/**
 * Faster algorithm than normal deduplication logic, but relies on values to be hashable. 
 *   Items get turned into Strings.
 *
 * non-destructive (returns new array) 
 * efficiency: O(n) ... O(2n)
 * @param ensureNumeric - If true, coherces each output array item to a number 
 */
Array.prototype.unique = function(ensureNumeric) {
  var len = this.length,
      ret = [],
      obj = {};

  for (var i = len; i--;) obj[this[i]] = true;
  
  if (ensureNumeric)
    for (var item in obj) ret.push(+item);
  else
    for (var item in obj) ret.push(item);
  
  return ret;
};

/** 
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
 */
Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement) {
  if (this === void 0 || this === null) {
    throw new TypeError();
  }
  
  var t = Object(this);
  var len = t.length >>> 0;
  
  if (len === 0) {
    return -1;
  }
  
  var n = 0;
  
  if (arguments.length > 0) {
    n = Number(arguments[1]);
    if (n !== n) { // shortcut for verifying if it's NaN
      n = 0;
    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
      n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
  }
  
  if (n >= len) {
    return -1;
  }
  
  var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
  
  for (; k < len; k++) {
    if (k in t && t[k] === searchElement) {
      return k;
    }
  }
  
  return -1;
}
