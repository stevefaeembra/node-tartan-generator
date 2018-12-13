const palette = require('./palette');

const makeRandomTartan = function () {
  // makes a random sett
  let result = [];
  const keys = Object.keys(palette);
  let numberColoursAvailable = keys.length;
  let numberStripes = 2+Math.floor(Math.random() * Math.floor(3));
  let stripeColours = [];
  let maxBandWidth = 9;
  for (var ix=0; ix<numberStripes; ix++) {
    let index = Math.floor(Math.random() * Math.floor(numberColoursAvailable-1));
    let count = 1+Math.floor(Math.random() * Math.floor(maxBandWidth));
    let color = keys[index];
    stripeColours.push([count,color]);
  };

  // make it symmetrical.
  var listClone = stripeColours.slice(0);
  console.log(stripeColours);
  console.log(listClone.reverse);
  return stripeColours.concat(listClone.reverse());
};


module.exports = makeRandomTartan;
