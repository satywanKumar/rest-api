const mongoose = require('mongoose');

productSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  title:String,
  ctgry:String,
  price:Number,
  description:String,
  productCode:String,
  photo:String
})

module.exports = mongoose.model('product',productSchema);
