var User = require('../models/user');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/clixx');


var users = [
  new User({
    name: 'Afiz',
    email: 'afiz@email.com',
    username: 'afiz',
    password: 'hash',
    role:'user'
  }),
  new User({
    name: 'Pandey',
    email: 'pandey@email.com',
    username: 'sp',
    password: 'hash',
    role:'user'
  })
];

var done =0;
for(var i=0;i<users.length; i++){
  users[i].save(function(err, results){
    done++;
    if(done == users.length){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
}
