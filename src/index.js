const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const user = require('./models/users.js');
const dept = require('./models/department');
const router = require('./routers/fetchDataRouter')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const app = express()
const session = require('express-session')

const server = require('http').createServer(app);
mongoose.connect("mongodb+srv://RaSa819:Rr112233@teachme.hztfd.mongodb.net/teachme?retryWrites=true&w=majority")

console.warn = () => {};


// to allow to app to send and recieve data as json format 
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// to allow browser to send and recieve data from Javascript source
var cors = require('cors');
app.use(cors());

// set session 


// Router 
app.use('/',router)
app.use('/user',userRouter)
app.use('/admin',adminRouter)

// The server will listen on 4000 port 
server.listen(4000, (req, res) => {
  console.log("The server is running on 4000 port ");
});
