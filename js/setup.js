'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserNameInput = document.querySelector('.setup-user-name');
  var setup = document.querySelector('.setup');
  var mainForm = document.querySelector('.setup-wizard-form');
  var hiddenInputEyesColor = document.querySelector('input[name="eyes-color"]');
  var hiddenInputFireballColor = document.querySelector('input[name="fireball-color"]');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireballWrap = document.querySelector('.setup-fireball-wrap');


  var openSetup = function () {
    setup.classList.remove('hidden');
    setupUserNameInput.addEventListener('focus', onInputFocus);
    setupUserNameInput.addEventListener('blur', onInputBlur);
    document.addEventListener('keydown', onSetupEscPress);
  };

  var closeSetup = function () {
    setup.classList.add('hidden');
    setupUserNameInput.removeEventListener('focus', onInputFocus);
    setupUserNameInput.removeEventListener('blur', onInputBlur);
    document.removeEventListener('keydown', onSetupEscPress);
    setup.style = null;
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
    if (evt.keyCode === ENTER_KEYCODE) {
      openSetup();
    }
  };

  var onSetupCloseClick = function () {
    closeSetup();
  };

  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeSetup();
    }
  };

  var onSetupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSetup();
    }
  };

  var onWizardEyesClick = function () {
    wizardEyes.style.fill = window.util.getRandomElement(eyesColors);
    hiddenInputEyesColor.value = wizardEyes.style.fill;
  };

  var onFireballClick = function () {
    var fireballColor = window.util.getRandomElement(fireballColors);
    fireballWrap.style.backgroundColor = fireballColor;
    hiddenInputFireballColor.value = fireballColor;
  };

  var onMainFormError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onMainFormSuccess = function () {
    setup.classList.add('hidden');
  };

  var onMainFormSubmit = function (evt) {
    window.backend.save(new FormData(mainForm), onMainFormSuccess, onMainFormError);
    evt.preventDefault();
  };

  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireballWrap.addEventListener('click', onFireballClick);
  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  mainForm.addEventListener('submit', onMainFormSubmit);
})();
