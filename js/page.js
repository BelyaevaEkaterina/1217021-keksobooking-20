'use strict';

(function () {

  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var pinAddress = document.querySelector('#address');
  var mapPin = document.querySelector('.map__pin--main');

  var activatePage = function () {
    var advertisements = window.data.generateAds(window.constants.AMOUNT_AD);
    for (var j = 0; j < window.constants.AMOUNT_AD; j++) {
      fragment.appendChild(window.pin.setPin(advertisements[j]));
    }
    document.querySelector('.map__pins').appendChild(fragment);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.removeAttribute('disabled');
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].removeAttribute('disabled');
    }
    pinAddress.setAttribute('readonly', 'readonly');

    pinAddress.value = window.form.setAddress(true);

    mapPin.removeEventListener('mouseup', window.page.onPinMouseDown);
    mapPin.removeEventListener('keydown', window.page.onPinKeyEnter);
  };

  var onPinMouseDown = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  var onPinKeyEnter = function (evt) {
    if (evt.keyCode === 13) {
      activatePage();
    }
  };

  window.page = {
    onPinMouseDown: onPinMouseDown,
    onPinKeyEnter: onPinKeyEnter
  };
})();
