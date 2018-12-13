const fs = require('fs');
const PNG = require('pngjs').PNG;
const palette = require('./palette.js');

const setPixel = function (image,x,y,r,g,b) {

  // set individual pixel of image

  var idx = (image.width * y + x) << 2;
  image.data[idx] = r;
  image.data[idx+1] = g;
  image.data[idx+2] = b;
  image.data[idx+3] = 255;
};

const countThreads = function (sett, scale=1) {
  // get total number of threads in sett
  return sett.reduce((acc, item) => {
    return acc += item[0] * scale;
  },0);
}

const makeThreadSet = function (sett, scale=1) {

  // get thread set (a list of individual thread colour keys)

  let result=[];
  sett.forEach((item) => {
    for (var t=0; t< item[0]*scale; t++) {
      result.push(item[1]);
    };
  });
  return result;
}

const makeTartan = function (sett, scale=1) {

  // make tartan from a sett description and scale
  // scale needs to be a power of 2 (e.g. 1=2, 2=4, 3=8 etc)
  // returns PNG instance

  const scaleUp = 2**scale;
  const threadCount = countThreads(sett, scaleUp);
  const threads = makeThreadSet(sett, scaleUp);
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
};

module.exports = makeTartan;
