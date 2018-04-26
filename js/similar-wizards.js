'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var numberOfSimilarWizards = 4;
  var setupSimilar = document.querySelector('.setup-similar');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireballWrap = document.querySelector('.setup-fireball-wrap');
  var hiddenInputEyesColor = document.querySelector('input[name="eyes-color"]');
  var hiddenInputFireballColor = document.querySelector('input[name="fireball-color"]');

  var onWizardEyesClick = function () {
    wizardEyes.style.fill = window.util.getRandomElement(window.wizardParameters.eyesColors);
    hiddenInputEyesColor.value = wizardEyes.style.fill;
  };
  var onFireballClick = function () {
    var fireballColor = window.util.getRandomElement(window.wizardParameters.fireballColors);
    fireballWrap.style.backgroundColor = fireballColor;
    hiddenInputFireballColor.value = fireballColor;
  };
  var createWizard = function () {
    var wizard = {
      name: window.util.getRandomElement(window.wizardParameters.names) + ' ' + window.util.getRandomElement(window.wizardParameters.surnames),
      coatColor: window.util.getRandomElement(window.wizardParameters.coatColors),
      eyesColor: window.util.getRandomElement(window.wizardParameters.eyesColors)
    };

    if (window.util.throwCoin()) {
      wizard.name = window.util.getRandomElement(window.wizardParameters.surnames) + ' ' + window.util.getRandomElement(window.wizardParameters.names);
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

  var wizards = createWizards(numberOfSimilarWizards);
  renderWizards(wizards);
  setupSimilar.classList.remove('hidden');
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireballWrap.addEventListener('click', onFireballClick);
})();
