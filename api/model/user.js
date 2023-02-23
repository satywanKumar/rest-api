const mongoose = require('mongoose');
userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    password:String,
    phone:Number,
    email:String,
    address:String,
    city:String,
    state:String,
    pin:String,
    userType:String
})

module.exports = mongoose.model('user',userSchema);