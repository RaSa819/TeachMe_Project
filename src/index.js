const { response } = require('express');
const express =require('express');
const mongoose =require('mongoose');
const user = require('./models/users.js');


const app = express()
mongoose.connect("mongodb+srv://RaSa819:Rr112233@teachme.hztfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

app.get('/',(req,res)=>{

  res.json("Welcome in nodeJS app ")
})

app.listen(4000,(req,res)=>{
  console.log("The server is running on 4000 port ");
});
