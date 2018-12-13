const fs = require('fs');
const PNG = require('pngjs').PNG;
const palette = require('./palette.js');

// the sett defines the stitching pattern
// array of arrays
// each element is an array of [threadcount, colour key]

const sett = [
  [3,"K"],
  [18,"1"],
  [1,"W"],
  [4,"2"],
  [1,"K"],
  [4,"3"],
  [2,"K"],
  [4,"3"],
  [1,"K"],
  [4,"2"],
  [1,"W"],
  [18,"1"],
  [3,"K"]
];

const setPixel = function (image,x,y,r,g,b) {
  // set individual pixel of image
  var idx = (image.width * y + x) << 2;
  image.data[idx  ] = r;
  image.data[idx+1] = g;
  image.data[idx+2] = b;
  image.data[idx+3] = 255;
};

const countThreads = function (sett) {
  // get total number of threads in sett
  return sett.reduce((acc, item) => {
    return acc += item[0];
  },0);
}

const makeThreadSet = function (sett) {
  // get thread set (a list of individual thread colour keys)
  let result=[];
  sett.forEach((item) => {
    for (var t=0; t< item[0]; t++) {
      result.push(item[1]);
    }
  });
  return result;
}

const makeTartan = function (sett) {

  // make tartan from a sett description

  const threadCount = countThreads(sett);
  const threads = makeThreadSet(sett);
  const im = new PNG({width:threadCount, height:threadCount, filterType: -1});

  for (var y=0;y<im.height;y++) {
    for (var x=0;x<im.width;x++) {

      const mx = x % 2;
      const my = y % 2;
      let threadColour = [];

      if ((mx+my)%4 === 1) {
        threadColour = palette[threads[x]];
      } else {
        threadColour = palette[threads[y]];
      };

      const r=threadColour[0];
      const g=threadColour[1];
      const b=threadColour[2];
      setPixel(im,x,y,r,g,b);
    }
  };
  return im;
}

const myTartan = makeTartan(sett);
myTartan.pack().pipe(fs.createWriteStream('newOut.png'));
