const mongoose = require('mongoose')

const admin = mongoose.Schema({
  adminInfo: mongoose.Schema.Types.Mixed,
  user: mongoose.Schema.Types.ObjectId
})


molude.exports = mongoose.model('admin',admin);
