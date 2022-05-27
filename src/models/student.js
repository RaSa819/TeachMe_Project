const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    favorit_list:
        [mongoose.Schema.Types.Mixed],
    profile: mongoose.Schema.Types.Mixed,
});
module.exports = mongoose.model('student', schema);