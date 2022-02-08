const mongoose  = require("mongoose");

const request =new mongoose.Schema({
    status:Number,
    isCompleted:Boolean,
    requestInfo:mongoose.Schema.Types.Mixed,
    timestap:{type:Date, default:Date.now},
    timeLesson:Date,
    tutor:mongoose.Schema.Types.ObjectId,
    student:mongoose.Schema.Types.Mixed


})

module.exports = mongoose.model('request',request);
