'use strict';

var CLOUD_COLOR = '#ffffff';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_OFFSET = 10;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT_SIZE = '16px';
var FONT_FAMILY = 'PT Mono';
var FONT_COLOR = '#000000';
var TITLE_X = 120;
var TITLE_Y = 50;
var TITLE_OFFSET = 20;
var GRAPH_WIDTH = 40;
var GRAPH_MARGIN = 50;
var MAX_GRAPH_HEIGHT = 150;
var GRAPH_Y = 250;
var GRAPH_X = 150;
var PLAYER_NAME_Y = 265;
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var TIMES_TEXT_OFFSET = 25;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderTitle = function (ctx, size, family, color) {
  ctx.font = size + ' ' + family;
  ctx.fillStyle = color;
  ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + TITLE_OFFSET);
};

var getMaxValue = function (array) {
  var maxValue = array[0];
  for (var i = 1; i < array.length; i++) {
    if (maxValue < array[i]) {
      maxValue = array[i];
    }
  }
  return maxValue;
};

var renderGraph = function (ctx, names, times) {
  var maxValue = Math.round(getMaxValue(times));
  var graphOffset = 0;
  for (var i = 0; i < names.length; i++) {
    var currentGraphHeight = Math.round(times[i] / maxValue * MAX_GRAPH_HEIGHT);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.' + Math.ceil(Math.random() * 9) + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = USER_COLOR;
    }
    ctx.fillRect(GRAPH_X + graphOffset, GRAPH_Y, GRAPH_WIDTH, -currentGraphHeight);
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(names[i], GRAPH_X + graphOffset, PLAYER_NAME_Y);
    ctx.fillText(Math.round(times[i]), GRAPH_X + graphOffset, CLOUD_HEIGHT - currentGraphHeight - TIMES_TEXT_OFFSET);
    graphOffset += GRAPH_MARGIN + GRAPH_WIDTH;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_OFFSET, CLOUD_Y + CLOUD_OFFSET, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderTitle(ctx, FONT_SIZE, FONT_FAMILY, FONT_COLOR);
  renderGraph(ctx, names, times);
};
