const fs = require('fs');
const makeTartan = require('./weaver.js');
const makeRandomTartan = require('./random_tartan');

// the sett defines the stitching pattern
// array of arrays
// each element is an array of [threadcount, colour key]

const sett = makeRandomTartan();

// make a tartan image and save it
const myTartan = makeTartan(sett,2);
myTartan.pack().pipe(fs.createWriteStream('newOut.png'));
