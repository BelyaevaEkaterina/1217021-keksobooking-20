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
var GAP_X = Math.round(PIN_WIDTH / 2);

var TYPE_OF_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var fragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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
    var randomNum = generateRandomNumber(0, tempArray.length-1);
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

var renderPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style = 'left: ' + String(ad.location.x - PIN_WIDTH / 2) + 'px; top: ' +
    String(ad.location.y - PIN_HEIGHT) + 'px;';
  pinImage.src = ad.author.avatar;
  pinImage.alt = ad.offer.title;

  return pin;
};

map.classList.remove('map--faded');

var advertisements = generateAds(AMOUNT_AD);
for (var i = 0; i < AMOUNT_AD; i++) {
  fragment.appendChild(renderPin(advertisements[i]));
}
document.querySelector('.map__pins').appendChild(fragment);
