const palette = require('./palette');

const randomNumberBetween = function(min,max) {
  return min+Math.floor(Math.random() * Math.floor(max));
};

const makeRandomTartan = function () {
  // makes a random sett
  let result = [];
  const keys = Object.keys(palette);
  let numberColoursAvailable = keys.length;
  let numberStripes = randomNumberBetween(3,8);
  let stripeColours = [];
  for (var ix=0; ix<numberStripes; ix++) {
    let index = randomNumberBetween(0,numberColoursAvailable);
    let count = randomNumberBetween(1,10);
    let color = keys[index];
    stripeColours.push([count,color]);
  };

  // make it symmetrical. take the array, flip it and append.
  var listClone = stripeColours.slice(0);
  return stripeColours.concat(listClone.reverse());
};


module.exports = makeRandomTartan;
