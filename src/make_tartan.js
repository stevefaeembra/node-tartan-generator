const fs = require('fs');
const makeTartan = require('./weaver.js');
const makeRandomTartan = require('./random_tartan');

// the sett defines the stitching pattern
// array of arrays
// each element is an array of [threadcount, colour key]

// const sett = [
//   [3,"K"],
//   [18,"1"],
//   [1,"W"],
//   [4,"2"],
//   [1,"K"],
//   [4,"3"],
//   [2,"K"],
//   [4,"3"],
//   [1,"K"],
//   [4,"2"],
//   [1,"W"],
//   [18,"1"],
//   [3,"K"]
// ];

//const myTartan = makeTartan(sett,3);

const sett = makeRandomTartan();
const myTartan = makeTartan(sett,2);
myTartan.pack().pipe(fs.createWriteStream('newOut.png'));
