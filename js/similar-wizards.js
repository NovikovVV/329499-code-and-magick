'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var numberOfSimilarWizards = 4;
  var setupSimilar = document.querySelector('.setup-similar');

  var onSuccess = function (wizardsCollection) {
    var fragment = document.createDocumentFragment();
    var copy = window.util.shuffle(wizardsCollection).slice();

    for (var i = 0; i < numberOfSimilarWizards; i++) {
      var wizardElement = wizardTemplate.cloneNode(true);
      var wizardName = wizardElement.querySelector('.setup-similar-label');
      var wizardCoatColor = wizardElement.querySelector('.wizard-coat');
      var wizardEyesColor = wizardElement.querySelector('.wizard-eyes');
      wizardName.textContent = copy[i].name;
      wizardCoatColor.style.fill = copy[i].colorCoat;
      wizardEyesColor.style.fill = copy[i].colorEyes;
      fragment.appendChild(wizardElement);
    }

    setupSimilarList.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);
  setupSimilar.classList.remove('hidden');
})();
