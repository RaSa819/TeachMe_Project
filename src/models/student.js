const mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost/Teach_ME')
.then(()=> console.log('connection done'))
.catch((err)=> console.log('connection failed'))

const schema =  mongoose.Schema({
    user : mongoose.Schema.Types.Objectid,
    favorit_list:
   [mongoose.Schema.Types.Mixed],
    profile:mongoose.Schema.Types.Mixed
});
module.exports=mongoose.model('student',schema);