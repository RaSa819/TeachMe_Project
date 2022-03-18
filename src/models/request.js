const mongoose  = require("mongoose");

const request =new mongoose.Schema({
    // explain for status field 
    // is acceptable or decline , defaultly it waiting ..
    // 2 ==> waiting for request 
    // 1 ==> acceptable 
    // 0 ==> decline 
    status:{type:Number,default:2},
    isCompleted:{type:Boolean,default:false},
    requestInfo:mongoose.Schema.Types.Mixed,
    timestap:{type:Date, default:Date.now},
    timeLesson:Number,
    tutor:mongoose.Schema.Types.ObjectId,
    student:mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('request',request);
