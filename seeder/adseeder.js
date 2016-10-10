var Ad = require('../models/ad');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/clixx');


var ads = [
  new Ad({
  title: 'MotoG',
  owner: 'Afiz',
  price: 3000,
  category: 'electronics',
  subcategory: 'phones',
  desc: 'Awesome phone with broken screen :)',
  images: ['http://i.ebayimg.com/00/s/ODAwWDYwMA==/z/xN0AAOSw-itXuwav/$_35.JPG'],
}),

new Ad({
title: 'Moto X',
owner: 'Afiz',
price: 5000,
category: 'electronics',
subcategory: 'phones',
desc: 'Awesome phone with broken screen :)',
images: ['http://phandroid.s3.amazonaws.com/wp-content/uploads/2014/09/Moto-X-2014-DSC07019.jpg'],
}),
];
var done =0;
for(var i=0; i<ads.length; i++){
  ads[i].save(function(err, results){
    done++;
    if(done == ads.length){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
}
