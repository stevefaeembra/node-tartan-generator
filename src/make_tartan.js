const fs = require('fs');
const PNG = require('pngjs').PNG;

const im = new PNG({width:256, height:256, filterType: -1});

// colour keys

const palette = {
  "K" : [0,0,0], //black
  "B" : [0,0,255], //blue
  "G" : [0,255,0], //green
  "R" : [255,0,0], //red
  "W" : [255,255,255], //white
  "P" : [255,0,255], //purple
  "Y" : [255,255,0], // yellow
  "1" : [145,16,71],
  "2" : [45,78,198],
  "3" : [12,190,190]
};

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
  var idx = (image.width * y + x) << 2;
  image.data[idx  ] = r;
  image.data[idx+1] = g;
  image.data[idx+2] = b;
  image.data[idx+3] = 255;
};

const size = sett.reduce((acc, item) => {
  return acc += item[0];
},0);
console.log(size);

for (var y=0;y<im.height;y++) {
  for (var x=0;x<im.width;x++) {
    var rgb = palette["G"];
    const r=rgb[0];
    const g=rgb[1];
    const b=rgb[2];
    setPixel(im,x,y,r,g,b);
  }
};

im.pack().pipe(fs.createWriteStream('newOut.png'));
