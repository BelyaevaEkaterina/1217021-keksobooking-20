'use strict';

(function () {

  var TYPE_OF_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generateAds = function (num) {

    var map = document.querySelector('.map');
    var ads = [];
    for (var i = 0; i < num; i++) {
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + String(i + 1) + '.png'
        },
        offer: {
          title: 'Заголовок',
          address: String(window.util.generateRandomNumber(0, map.offsetWidth)) + ', ' + String(window.util.generateRandomNumber(window.constants.MIN_Y, window.constants.MAX_Y)),
          price: window.util.generateRandomNumber(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
          type: window.util.getRandomElementOfArray(TYPE_OF_HOUSE),
          rooms: window.util.generateRandomNumber(window.constants.MIN_ROOMS, window.constants.MAX_ROOMS),
          guests: window.util.generateRandomNumber(window.constants.MIN_GUESTS, window.constants.MAX_GUESTS),
          checkin: window.util.getRandomElementOfArray(CHECK_TIME),
          checkout: window.util.getRandomElementOfArray(CHECK_TIME),
          features: window.util.getSomeElementsFromArray(FEATURES),
          description: 'Описание',
          photos: window.util.getSomeElementsFromArray(PHOTOS)
        },
        location: {
          x: window.util.generateRandomNumber(window.constants.GAP_X, map.offsetWidth - window.constants.GAP_X),
          y: window.util.generateRandomNumber(window.constants.MIN_Y, window.constants.MAX_Y)
        }
      };
      ads[i] = ad;
    }

    return ads;
  };

  window.data = {
    generateAds: generateAds
  };

})();
