const mongoose = require('mongoose')

const admin =new mongoose.Schema({
  adminInfo: mongoose.Schema.Types.Mixed,
  user: mongoose.Schema.Types.ObjectId
})


module.exports = mongoose.model('admin',admin);