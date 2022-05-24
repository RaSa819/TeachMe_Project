const mongoose  = require("mongoose");

const schema =new mongoose.Schema({
    rate:{type:Number,default:1},
    request:mongoose.Schema.Types.ObjectId,
    ratingTo:{type:String},
    tutor:mongoose.Schema.Types.ObjectId,
    student:mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('ratings',schema);
