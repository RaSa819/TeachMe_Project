const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    dep_id : mongoose.Schema.Types.ObjectId,
    user_id:mongoose.Schema.Types.ObjectId,
    cardInfo:{
        cardNumber:String,
        cardHolderName:String,
        security_code:String,
        exp_date:Date
    },
    rate:Number,
    reviews:[{
        Studentid :mongoose.Schema.Types.ObjectId,
        rev_content : String,
        date : Date
        }],
    price:Number,
});

module.exports = mongoose.model('tutor' , schema)

