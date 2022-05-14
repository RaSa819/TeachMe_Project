const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        firstName: String,
        middleName: String,
        lastName: String
    },
    userName: { type: String, unique: true },
    password: String,
    address: {
        country: String,
        city: String,
        street: String,
        ZIP: String
    },
    email: String,
    phoneNumber: [],
    gender: Number,
    type: Number, // one => tutor . zero => student . two => admin
    date: { type: Date, default: Date.now },
    token: String,
    img: { type: String, default: 'unknow.png' },
    rate: { type: Number, default: 0 },
    reviews: { type: [mongoose.Schema.Types.Mixed], default: [] }
})

module.exports = mongoose.model('users', schema);