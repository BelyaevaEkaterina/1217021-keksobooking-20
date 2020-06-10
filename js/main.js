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
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;
var MAP = document.querySelector('.map');
var FRAGMENT = document.createDocumentFragment();
var PIN_TEMPLATE = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var TYPE_OF_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var renderRandomValue = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var renderElement = function (arr) {
  var lastIndex = arr.length - 1;
  var i = Math.round(Math.random() * lastIndex);

  return arr[i];
};

var renderSomeElements = function (arr) {
  var newArr = [];
  var num = renderRandomValue(1, arr.length - 1);
  for (var i = 0; i < num; i++) {
    newArr[i] = renderElement(arr);
  }
  return newArr;
};

var renderAd = function (num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    var arrElement = {
      author: {
        avatar: 'img/avatars/user0' + String(i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: String(renderRandomValue(0, MAP.offsetWidth)) + ', ' + String(renderRandomValue(MIN_Y, MAX_Y)),
        price: renderRandomValue(MIN_PRICE, MAX_PRICE),
        type: renderElement(TYPE_OF_HOUSE),
        rooms: renderRandomValue(MIN_ROOMS, MAX_ROOMS),
        guests: renderRandomValue(MIN_GUESTS, MAX_GUESTS),
        checkin: renderElement(CHECK_TIME),
        checkout: renderElement(CHECK_TIME),
        features: renderSomeElements(FEATURES),
        description: 'Описание',
        photos: PHOTOS
      },
      location: {
        x: renderRandomValue(0, MAP.offsetWidth),
        y: renderRandomValue(MIN_Y, MAX_Y)
      }
    };
    arr[i] = arrElement;
  }

  return arr;
};

var renderPin = function (ad) {
  var pin = PIN_TEMPLATE.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + String(ad.location.x - PIN_WIDTH / 2) + 'px; top: ' +
    String(ad.location.y - PIN_HEIGHT) + 'px;';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;

  return pin;
};

MAP.classList.remove('map--faded');

var arrAd = renderAd(AMOUNT_AD);
for (var i = 0; i < AMOUNT_AD; i++) {
  FRAGMENT.appendChild(renderPin(arrAd[i]));
}
document.querySelector('.map__pins').appendChild(FRAGMENT);
