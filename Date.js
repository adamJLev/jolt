
Date.now = Date.now || function() { // For IE 7-8
  return +new Date();
};

Date.random = function() {
  return Date.now() + '_' + Math.floor(Math.random() * 10000000);
};