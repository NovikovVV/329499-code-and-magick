'use strict';

(function () {
  var dialogHandler = document.querySelector('.setup-user-pic');
  var artifactsShop = document.querySelector('.setup-artifacts-shop');
  var artifactsCells = document.querySelectorAll('.setup-artifacts-cell');
  var playerArtifacts = document.querySelector('.setup-artifacts');
  var draggedItem = null;

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

      window.util.setup.style.top = (window.util.setup.offsetTop - offset.y) + 'px';
      window.util.setup.style.left = (window.util.setup.offsetLeft - offset.x) + 'px';
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

  dialogHandler.addEventListener('mousedown', onDialogHadlerMouseDown);
  enableDragAndDrop(artifactsCells);
  artifactsShop.addEventListener('dragstart', onArtifactsShopDragStart);
  playerArtifacts.addEventListener('dragover', onPlayerArtifactsDragOver);
  playerArtifacts.addEventListener('drop', onPlayerArtifactsDrop);
  playerArtifacts.addEventListener('dragenter', onPlayerArtifactsDragEnter);
  playerArtifacts.addEventListener('dragleave', onPlayerArtifactsDragLeave);
})();
