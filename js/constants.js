'use strict';

(function () {
  var AMOUNT_AD = 8;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 0;
  var MAX_PRICE = 10000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 100;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_PIN_SIZE = 65;
  var GAP_X = Math.round(PIN_WIDTH / 2);

  window.constants = {
    AMOUNT_AD: AMOUNT_AD,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAP_PIN_SIZE: MAP_PIN_SIZE,
    GAP_X: GAP_X
  };
})();
