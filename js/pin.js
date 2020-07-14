'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin.setPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style = 'left: ' + String(ad.location.x - window.constants.PIN_WIDTH / 2) + 'px; top: ' +
      String(ad.location.y - window.constants.PIN_HEIGHT) + 'px;';
    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;

    return pin;
  };
})();
