const express =require('express');
const mongoose =require('mongoose');
const user = require('./models/users.js');
const tutor = require('./models/tutors.js');

const app = express()




app.listen(4000,(req,res)=>{
  console.log("The server is running on 4000 port ");
})
