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
  isStudentSharingScreen: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isTutorSharingScreen: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  isEnded: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },

  quiz: {
    required: false,
    type: {
      question: mongoose.Schema.Types.String,
      options: [mongoose.Schema.Types.String],
      answer: mongoose.Schema.Types.Number,
    },
  },

  // The information of payment operation 
  TransactionPayInfo:mongoose.Schema.Types.Mixed,
  request:mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('sessions',session);