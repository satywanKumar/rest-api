const mongoose = require('mongoose');

productSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  productId:String,
  productCode:String,
  fullName:String,
  email:String,
  phone:String,
  address:String,
  city:String,
  pincode:Number,
  quantity:Number,
  status:String,
  date:Date
})

module.exports = mongoose.model('product',productSchema);
