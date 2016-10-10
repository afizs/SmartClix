var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type:String, required:true},
  owner: {type:String, required:true},
  price: {type:Number},
  category: {type:String, required:true},
  subcategory: {type: String},
  fields:  { type : Array , "default" : [] },
  desc: {type: String},
  images:  { type : Array , "default" : [] },
  rejectionComments: {type: String},
  status: {type: String}, 
  postdate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Ad',schema);
