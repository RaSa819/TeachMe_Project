const mongoose = require('mongoose');

const schema = mongoose.Schema({
    to:[
        mongoose.Schema.Types.ObjectId
    ],
    notificationInfo:{
        header:String,
        content:String,
        time: { type: Date, default: Date.now },
        type:Number// to determine kind of notification,

    }
});

module.exports = mongoose.model('notifications',schema);
