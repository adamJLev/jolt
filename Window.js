/**
 * GLOBAL FUNCTIONS THAT JAVASCRIPT SHOULD HAVE.
 */

/**
 * http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844#1830844
 */
function isNumber(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
}

function isElement(obj) {
  return !!(obj && obj.nodeType);
}

function isString(obj) {
  return typeof(obj) == 'string'; 
}