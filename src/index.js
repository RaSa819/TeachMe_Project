const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const user = require('./models/users.js');
const dept = require('./models/department');
const router = require('./routers/fetchDataRouter')
const userRouter = require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const tutorRouter = require('./routers/tutorRouter')
const app = express()
const session = require('express-session')



const server = require('http').Server(app);

// mongoose.connect("mongodb+srv://RaSa819:Rr112233@teachme.hztfd.mongodb.net/teachme?retryWrites=true&w=majority", (err) => {
//   if (err)
//     throw err;
// })


mongoose.connect('mongodb://localhost:27017/teachme');


app.use(express.static('public'));


// to allow to app to send and recieve data as json format 
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())



// to allow browser to send and recieve data from Javascript source
var cors = require('cors');
app.use(cors());


// package will use as real time server 
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})
// set session 
app.use(session({
  secret: 'my session'
}))

app.use((req, res, next) => {
  req.session.token = 1234;

  // req.originalUrl ==> get the path like user/fetchUser
  // fetchDept 
  if (req.originalUrl === '/')
    console.log('welcome in Teach me website ')

  next();
})

// -----------Router--------------

require('./controllers/testController')(app)
require('./routers/userRouter')(app,io)
require('./routers/adminRouter')(app)
require('./routers/fetchDataRouter')(app)



// The server will listen on 4000 port 
server.listen(4000, (req, res) => {
  console.log("The server is running on 4000 port ");
});


// when i want get the IP address it return 
//::1 is the compressed format IPV6 loopback address 0:0:0:0:0:0:0:1.
// It is the equivalent of the IPV4 address 127.0.0.1.


