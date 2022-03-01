const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    favorit_list:
        [mongoose.Schema.Types.Mixed],
    // mixed ==. object 
    profile: mongoose.Schema.Types.Mixed,
    // rate: Number,
    // reviews: [{
    //     Tutor_Id: mongoose.Schema.Types.ObjectId,
    //     rev_content: String,
    //     date: Date
    // }]
});
module.exports = mongoose.model('student', schema);