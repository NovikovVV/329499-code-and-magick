'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserNameInput = setup.querySelector('.setup-user-name');
var wizardEyes = document.querySelector('.wizard-eyes');
var hiddenInputEyesColor = document.querySelector('input[name="eyes-color"]');
var hiddenInputFireballColor = document.querySelector('input[name="fireball-color"]');
var fireballWrap = document.querySelector('.setup-fireball-wrap');
var setupSimilar = document.querySelector('.setup-similar');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupSimilarList = document.querySelector('.setup-similar-list');
var numberOfSimilarWizards = 4;
var dialogHandler = document.querySelector('.setup-user-pic');
var artifactsShop = document.querySelector('.setup-artifacts-shop');
var artifactsCells = document.querySelectorAll('.setup-artifacts-cell');
var playerArtifacts = document.querySelector('.setup-artifacts');
var draggedItem = null;

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
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

var getRandomElement = function (array) {
  var element = array[Math.floor(Math.random() * array.length)];

  return element;
};

var throwCoin = function () {
  var value = Math.round(Math.random());

  return value;
};

var createWizard = function () {
  var wizard = {
    name: getRandomElement(names) + ' ' + getRandomElement(surnames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  };

  if (throwCoin()) {
    wizard.name = getRandomElement(surnames) + ' ' + getRandomElement(names);
  }

  return wizard;
};

var createWizards = function (howMany) {
  var wizards = [];
  for (var i = 0; i < howMany; i++) {
    var wizard = createWizard();
    wizards[i] = wizard;
  }

  return wizards;
};

var renderWizards = function (wizardsCollection) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsCollection.length; i++) {
    var wizardElement = wizardTemplate.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoatColor = wizardElement.querySelector('.wizard-coat');
    var wizardEyesColor = wizardElement.querySelector('.wizard-eyes');
    wizardName.textContent = wizardsCollection[i].name;
    wizardCoatColor.style.fill = wizardsCollection[i].coatColor;
    wizardEyesColor.style.fill = wizardsCollection[i].eyesColor;
    fragment.appendChild(wizardElement);
  }

  setupSimilarList.appendChild(fragment);
};

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
  wizardEyes.style.fill = getRandomElement(eyesColors);
  hiddenInputEyesColor.value = wizardEyes.style.fill;
};

var onFireballClick = function () {
  var fireballColor = getRandomElement(fireballColors);
  fireballWrap.style.backgroundColor = fireballColor;
  hiddenInputFireballColor.value = fireballColor;
};

var onDialogHadlerMouseDown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (evtMove) {
    var offset = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY
    };

    startCoords.x = evtMove.clientX;
    startCoords.y = evtMove.clientY;

    setup.style.top = (setup.offsetTop - offset.y) + 'px';
    setup.style.left = (setup.offsetLeft - offset.x) + 'px';
  };
  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var onArtifactsShopDragStart = function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
};

var enableDragAndDrop = function (array) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    if (element.firstChild && !element.draggble === true) {
      element.firstChild.draggable = true;
    }
  }
};

var onPlayerArtifactsDrop = function (evt) {
  if (evt.target.tagName.toLowerCase() === 'div' && !evt.target.firstChild) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  }
};

var onPlayerArtifactsDragEnter = function (evt) {
  evt.target.style = 'outline: 2px dashed red';
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
};

var onPlayerArtifactsDragLeave = function (evt) {
  evt.target.style = '';
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
};

var onPlayerArtifactsDragOver = function (evt) {
  evt.preventDefault();
  return false;
};

var wizards = createWizards(numberOfSimilarWizards);
renderWizards(wizards);
setupSimilar.classList.remove('hidden');
setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupCloseEnterPress);
wizardEyes.addEventListener('click', onWizardEyesClick);
fireballWrap.addEventListener('click', onFireballClick);
dialogHandler.addEventListener('mousedown', onDialogHadlerMouseDown);
enableDragAndDrop(artifactsCells);
artifactsShop.addEventListener('dragstart', onArtifactsShopDragStart);
playerArtifacts.addEventListener('dragover', onPlayerArtifactsDragOver);
playerArtifacts.addEventListener('drop', onPlayerArtifactsDrop);
playerArtifacts.addEventListener('dragenter', onPlayerArtifactsDragEnter);
playerArtifacts.addEventListener('dragleave', onPlayerArtifactsDragLeave);
