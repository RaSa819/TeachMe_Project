<<<<<<< HEAD
<<<<<<< HEAD
const { Mongoose } = require("mongoose");
Mongoose.connect('mongodb://localhost/Teach_ME')
.then(()=> console.log('connection done'))
.catch((err)=> console.log('connection failed'))

const schema = new mongoose.schema({
    Studentid : mongoose.schema.Objectid,
    rev_content:String,
    data:Date
})
=======
=======
>>>>>>> cf0627b8ff4e9710564ebd778b41c86411a85e66
const mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost/Teach_ME')
.then(()=> console.log('connection done'))
.catch((err)=> console.log('connection failed'))

const schema = new mongoose.Schema({
    user : mongoose.Schema.Types.Objectid,
    favorit_list:
   [mongoose.Schema.Types.Mixed],
    profile:mongoose.Schema.Types.Mixed
});
<<<<<<< HEAD
module.exports=mongoose.model('student',schema);
>>>>>>> cf0627b8ff4e9710564ebd778b41c86411a85e66
=======
module.exports=mongoose.model('student',schema);
>>>>>>> cf0627b8ff4e9710564ebd778b41c86411a85e66
