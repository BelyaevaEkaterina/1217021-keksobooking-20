'use strict';

(function () {

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

  window.util = {
    generateRandomNumber: generateRandomNumber,
    getRandomElementOfArray: getRandomElementOfArray,
    getSomeElementsFromArray: getSomeElementsFromArray
  };

})();
