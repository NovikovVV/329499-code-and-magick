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
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    setup: document.querySelector('.setup')
  };
})();
