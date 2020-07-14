'use strict';

var mapPin = document.querySelector('.map__pin--main');
var pinAddress = document.querySelector('#address');

var adFormHeader = document.querySelector('.ad-form-header');
adFormHeader.setAttribute('disabled', 'disabled');

var adFormElements = document.querySelectorAll('.ad-form__element');
for (var i = 0; i < adFormElements.length; i++) {
  adFormElements[i].setAttribute('disabled', 'disabled');
}

pinAddress.value = window.form.setAddress(false);

mapPin.addEventListener('mouseup', window.page.onPinMouseDown);
mapPin.addEventListener('keydown', window.page.onPinKeyEnter);

var roomNumber = document.querySelector('#room_number');
roomNumber.addEventListener('change', window.form.changeOption);

var capacity = document.querySelector('#capacity');
capacity.addEventListener('change', window.form.changeOption);
