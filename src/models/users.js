const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        firstName:String,
        middleName:String,
        lastName:String
    },
    userName: String, 
    password: String, 
    address:{
        country:String,
        city:String,
        street:String,
        ZIP:String
    },
    email:String,
    phoneNumber:[],
    gender:Number,
    type:Number,
    date:{type:Date, default:Date.now}
})

module.exports = mongoose.model('users' , schema);