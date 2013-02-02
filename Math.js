/**
 * Returns a random number between min and max                                            
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/random       
 */
Math.getRandomArbitrary = function(min, max) {  
  return Math.random() * (max - min) + min;  
};