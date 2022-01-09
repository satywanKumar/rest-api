const mongoose = require('mongoose');
categorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
})

module.exports = mongoose.model('category',categorySchema);