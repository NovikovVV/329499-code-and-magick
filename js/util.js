'use strict';

(function () {
  window.util = {
    getRandomElement: function (array) {
      var element = array[Math.floor(Math.random() * array.length)];
      return element;
    },
    throwCoin: function () {
      var value = Math.round(Math.random());
      return value;
    },
    shuffle: function (array) {
      var i = 0;
      var j = 0;
      var temp = null;
      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  };
})();
