const mongoose = require('mongoose')

const session = mongoose.Schema({
  sessionInfo:mongoose.Schema.Types.Mixed,
  timestamp:{type:Date,default:Date.now},
  startTime:Date,
  endTime:Date,

  // The information of payment operation 
  TransactionPayInfo:mongoose.Schema.Types.Mixed,
  request:mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('sessions',session);