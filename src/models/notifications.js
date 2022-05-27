const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    to:[
        mongoose.Schema.Types.ObjectId
    ],
    notificationInfo:{
        title:String,
        content:String,
        time: { type: Date, default: Date.now },
    }
});

module.exports = mongoose.model('notifications',schema);
