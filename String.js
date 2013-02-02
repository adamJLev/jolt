/**
 * Quick string placeholder replacing.
 * Example:
 *   "My name is {0}, and I love {1}".format('Adam', 'steak');
 */
String.prototype.format = String.prototype.f = function() {
    var txt = this,
        i = arguments.length;
  
    while (i--) {
        txt = txt.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return txt;
};

/**
 * Borrowed from MooTools, see docs for usage: http://mootools.net/docs/core/Native/String#String:substitute
 * @param obj
 * @param regex
 */
String.prototype.substitute = function(obj, regex) {
	return this.replace(regex || (/\\?\{([^{}]+)\}/g), function(match, name) {
    
    if (match.charAt(0) == '\\')
      return match.slice(1);
    
    return (obj[name] != undefined) ? obj[name] : '';
  });
};

/**
 * Capitalizes the first letter of the string.
 */
String.prototype.capitalizeFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Duh
 */
String.prototype.startsWith = function(str) {
  // Simple way:
  // return this.indexOf(str) === 0;
  
  // But this is a lot faster for long strings. See http://jsperf.com/start-of-string-check/3 
  return this.substr(0, str.length) === str;
};

/**
 * Duh v2
 */
String.prototype.endsWith = function(str) {
  return this.substr(this.length - str.length) === str;
};

/**
 * http://www.prototypejs.org/api/string/camelize
 */
String.prototype.camelize = function() {
  var parts = this.split('-'),
      len = parts.length;
  
  if (len == 1) return parts[0];

  var camelized = this.charAt(0) == '-' ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1) : parts[0];

  for (var i = 1; i < len; i++)
    camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

  return camelized;
}

/**
 * http://www.mootools.net/docs/core/Types/String#String:hyphenate
 */

String.prototype.hyphenate = function() {
  return this.replace(/[A-Z]/g, function(match) {
    return '-' + match.charAt(0).toLowerCase();
  });
};

/**
 * Meant to make pretty and safe urls.
 * Strips out ilegal url vars, and replaces things like _ with -
 */
String.prototype.slugify = function(maxLen) {
  return this.replace('/', '-')
             .replace(/&[a-z]+;/gi, '')
             .replace(/[_ ]+/gi, '-')
             .replace(/[^\$\w\s-]+/gi, '')
             .replace(/-{2,}/gi, '-')
             .slice(0, maxLen || 30)
             .strip('-');
};

/**
 * Strips whitespace or characers, from both ends of string.
 * @param chars - Optional
 */
String.prototype.strip = function(chars) {
  return this.lstrip(chars).rstrip(chars);
};

/**
 * Strips whitespace or characers, from the beginning of string.
 * @param chars - Optional
 */
String.prototype.lstrip = function (/* optional */chars) {
  return chars
    ? this.replace(new RegExp('^[' + chars + ']+'), '')
    : this.replace(/^\s+/, '');
};

/**
 * Strips whitespace or characers, from the beginning of string.
 * @param chars - Optional
 */
String.prototype.rstrip = function (/* optional */chars) {
  return chars
    ? this.replace(new RegExp('[' + chars + ']+$'), '')
    : this.replace(/\s+$/, '');
};

/**
 * Strips HTML tags
 */
String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>/gi, '');
};

/**
 * http://www.prototypejs.org/api/string/truncate
 * @param len
 * @param truncation
 */
String.prototype.truncate = function(len, truncation) {
  len = len || 50;
  truncation = truncation === undefined ? '...' : truncation;
  return ((this.length > len) ? this.substr(0, len - truncation.length) + truncation : this).toString(); // Note about the toString: http://stackoverflow.com/questions/5146591/javascript-wtf-string-is-not-a-string
};

/**
 * http://gotochriswest.com/blog/2011/07/25/javascript-string-prototype-replaceall/
 */
String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
