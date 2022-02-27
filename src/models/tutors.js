const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    dept_id : mongoose.Schema.Types.ObjectId,
    user_id:mongoose.Schema.Types.ObjectId,
    // cardInfo:{
    //     cardNumber:String,
    //     cardHolderName:String,
    //     security_code:String,
    //     exp_date:Date
    // },

    // if the tutor is busy or available
    status:{type:Number,default:1},
    cardInfo:mongoose.Schema.Types.Mixed,
    price:Number,
    profile:{
        about:String,
        style:String,
        certifications:String,
        experience:String
    }
});

module.exports = mongoose.model('tutor' , schema)