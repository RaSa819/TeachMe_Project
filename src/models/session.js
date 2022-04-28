const mongoose = require('mongoose')

const session = mongoose.Schema({
  sessionInfo:mongoose.Schema.Types.Mixed,
  timestamp:{type:Date,default:Date.now},
  startTime:{type:Date,default:Date.now},
  endTime:{type:Date,default:Date.now},

  webRTCOffer: mongoose.Schema.Types.Mixed,
  webRTCAnswer: mongoose.Schema.Types.Mixed,
  studentICECandidates: [mongoose.Schema.Types.Mixed],
  tutorICECandidates: [mongoose.Schema.Types.Mixed],

  // The information of payment operation 
  TransactionPayInfo:mongoose.Schema.Types.Mixed,
  request:mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('sessions',session);