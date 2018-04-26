'use strict';
(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserNameInput = document.querySelector('.setup-user-name');

  var openSetup = function () {
    window.util.setup.classList.remove('hidden');
    setupUserNameInput.addEventListener('focus', onInputFocus);
    setupUserNameInput.addEventListener('blur', onInputBlur);
    document.addEventListener('keydown', onSetupEscPress);
  };

  var closeSetup = function () {
    window.util.setup.classList.add('hidden');
    setupUserNameInput.removeEventListener('focus', onInputFocus);
    setupUserNameInput.removeEventListener('blur', onInputBlur);
    document.removeEventListener('keydown', onSetupEscPress);
    window.util.setup.style = null;
  };

  var onInputFocus = function () {
    document.removeEventListener('keydown', onSetupEscPress);
  };

  var onInputBlur = function () {
    document.addEventListener('keydown', onSetupEscPress);
  };

  var onSetupOpenClick = function () {
    openSetup();
  };

  var onSetupOpenEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openSetup();
    }
  };

  var onSetupCloseClick = function () {
    closeSetup();
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closeSetup();
    }
  };

  var onSetupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSetup();
    }
  };

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
})();
