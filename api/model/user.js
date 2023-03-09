const mongoose = require('mongoose');
userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    password:String,
    phone:Number,
    email:String,
})

module.exports = mongoose.model('user',userSchema);
