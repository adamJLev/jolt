/**
 * Escape string for use in a regex 
 */
RegExp.literal = function(str) {
  return str.replace(/[\|\=\:\/\$\^\*\+\?\!\.\(\)\{\}\[\]\,\\]/g, '\\$&');
};