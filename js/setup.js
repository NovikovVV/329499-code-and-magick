'use strict';

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupSimilarList = document.querySelector('.setup-similar-list');
var numberOfSimilarWizards = 4;
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

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = wizardTemplate.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoatColor = wizardElement.querySelector('.wizard-coat');
    var wizardEyesColor = wizardElement.querySelector('.wizard-eyes');
    wizardName.textContent = wizards[i].name;
    wizardCoatColor.style.fill = wizards[i].coatColor;
    wizardEyesColor.style.fill = wizards[i].eyesColor;
    fragment.appendChild(wizardElement);
  }

  setupSimilarList.appendChild(fragment);
};

var wizards = createWizards(numberOfSimilarWizards);
renderWizards(wizards);
setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
