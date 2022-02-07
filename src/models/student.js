const { Mongoose } = require("mongoose");
Mongoose.connect('mongodb://localhost/Teach_ME')
.then(()=> console.log('connection done'))
.catch((err)=> console.log('connection failed'))

const schema = new mongoose.schema({
    Studentid : mongoose.schema.Objectid,
    rev_content:String,
    data:Date
})
