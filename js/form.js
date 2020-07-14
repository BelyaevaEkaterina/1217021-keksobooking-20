'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var setAddress = function (active) {
    var address = '';
    if (active) {
      address = String(Math.round(mapPin.getBoundingClientRect().left + window.constants.PIN_WIDTH / 2 + pageXOffset)) + ', ' +
        String(Math.round(mapPin.getBoundingClientRect().top + window.constants.PIN_HEIGHT / 2 + pageYOffset));
    } else {
      address = String(Math.round(mapPin.getBoundingClientRect().left + window.constants.MAP_PIN_SIZE / 2 + pageXOffset)) + ', ' +
        String(Math.round(mapPin.getBoundingClientRect().top + window.constants.MAP_PIN_SIZE / 2 + pageYOffset));
    }
    return address;
  };

  var changeOption = function () {
    roomNumber.setCustomValidity('');
    if ((roomNumber.value > 3) && (capacity.value > 0)) {
      roomNumber.setCustomValidity('100 комнат не для гостей!');
    } else if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity('Не хватает комнат для такого количества гостей');
    }
  };

  window.form = {
    setAddress: setAddress,
    changeOption: changeOption
  };

})();
