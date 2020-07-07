'use strict';

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

var TYPE_OF_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var fragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var mapPin = document.querySelector('.map__pin--main');
var pinAddress = document.querySelector('#address');

var generateRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var getRandomElementOfArray = function (arr) {
  var lastIndex = arr.length - 1;
  var i = Math.round(Math.random() * lastIndex);

  return arr[i];
};

var getSomeElementsFromArray = function (arr) {
  var newArr = [];
  var tempArray = arr.slice();
  var num = generateRandomNumber(1, arr.length - 1);
  for (var i = 0; i < num; i++) {
    var randomNum = generateRandomNumber(0, tempArray.length - 1);
    newArr[i] = tempArray[randomNum];
    tempArray.splice(randomNum, 1);
  }
  return newArr;
};

var generateAds = function (num) {
  var ads = [];
  for (var i = 0; i < num; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + String(i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: String(generateRandomNumber(0, map.offsetWidth)) + ', ' + String(generateRandomNumber(MIN_Y, MAX_Y)),
        price: generateRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomElementOfArray(TYPE_OF_HOUSE),
        rooms: generateRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: generateRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomElementOfArray(CHECK_TIME),
        checkout: getRandomElementOfArray(CHECK_TIME),
        features: getSomeElementsFromArray(FEATURES),
        description: 'Описание',
        photos: getSomeElementsFromArray(PHOTOS)
      },
      location: {
        x: generateRandomNumber(GAP_X, map.offsetWidth - GAP_X),
        y: generateRandomNumber(MIN_Y, MAX_Y)
      }
    };
    ads[i] = ad;
  }

  return ads;
};

var setPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + String(ad.location.x - PIN_WIDTH / 2) + 'px; top: ' +
    String(ad.location.y - PIN_HEIGHT) + 'px;';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;

  return pin;
};

var adFormHeader = document.querySelector('.ad-form-header');
adFormHeader.setAttribute('disabled', 'disabled');

var adFormElements = document.querySelectorAll('.ad-form__element');
for (var i = 0; i < adFormElements.length; i++) {
  adFormElements[i].setAttribute('disabled', 'disabled');
}

var setAddress = function (active) {
  var address = '';
  if (active) {
    address = String(Math.round(mapPin.getBoundingClientRect().left + PIN_WIDTH / 2 + pageXOffset)) + ', ' +
      String(Math.round(mapPin.getBoundingClientRect().top + PIN_HEIGHT / 2 + pageYOffset));
  } else {
    address = String(Math.round(mapPin.getBoundingClientRect().left + MAP_PIN_SIZE / 2 + pageXOffset)) + ', ' +
      String(Math.round(mapPin.getBoundingClientRect().top + MAP_PIN_SIZE / 2 + pageYOffset));
  }
  return address;
};

pinAddress.value = setAddress(false);

var activatePage = function () {
  var advertisements = generateAds(AMOUNT_AD);
  for (var j = 0; j < AMOUNT_AD; j++) {
    fragment.appendChild(setPin(advertisements[j]));
  }
  document.querySelector('.map__pins').appendChild(fragment);

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.removeAttribute('disabled');
  for (i = 0; i < adFormElements.length; i++) {
    adFormElements[i].removeAttribute('disabled');
  }
  pinAddress.setAttribute('readonly', 'readonly');

  pinAddress.value = setAddress(true);

  mapPin.removeEventListener('mouseup', onPinMouseDown);
  mapPin.removeEventListener('keydown', onPinKeyEnter);
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

mapPin.addEventListener('mouseup', onPinMouseDown);
mapPin.addEventListener('keydown', onPinKeyEnter);

var changeOption = function () {
  roomNumber.setCustomValidity('');
  if ((roomNumber.value > 3) & (capacity.value > 0)) {
    roomNumber.setCustomValidity('100 комнат не для гостей!');
  } else if (roomNumber.value < capacity.value) {
    roomNumber.setCustomValidity('Не хватает комнат для такого количества гостей');
  }
};

var roomNumber = document.querySelector('#room_number');
roomNumber.addEventListener('change', changeOption);

var capacity = document.querySelector('#capacity');
capacity.addEventListener('change', changeOption);
