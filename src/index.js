
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const user = require('./models/users.js');
const dept = require('./models/department');
const router = require('./routers/fetchDataRouter')
const userRouter = require('./routers/userRouter')
const app = express()


mongoose.connect("mongodb+srv://RaSa819:Rr112233@teachme.hztfd.mongodb.net/teachme?retryWrites=true&w=majority")


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use('/',router);
app.use('/user',userRouter);
var cors = require('cors');
app.use(cors({
  cors:{
    origin:'*'
  }
}));

// app.get('/', (req, res) => {
//   // const deptData = dept.find({}).
//   //   then(response =>
//   //     res.json(response.data)).catch(err =>
//   //       res.json(err))
        
//   const d = new dept({
//     name:'ddd',
//     price:12323
//   })
//   d.save().then(
//     response=>res.json(response)
//   ).catch(err=>{
//     res.json(err)
//   })
// })

app.listen(4000, (req, res) => {
  console.log("The server is running on 4000 port ");
});
