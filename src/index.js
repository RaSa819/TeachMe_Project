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


const request = require('./models/request')

const student = require('./models/student')
const ObjectId = mongoose.Types.ObjectId
const server = require('http').Server(app);


mongoose.connect("mongodb+srv://Mohammad:mm112233@cluster0.r3n4y.mongodb.net/test", (err) => {
    if (err) 
        throw err;
    


})


app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// to allow browser to send and recieve data from Javascript source
var cors = require('cors');
app.use(cors());


// package will use as real time server
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
// set session
app.use(session({secret: 'my session'}))

app.use((req, res, next) => {
    req.session.token = 1234;

    // req.originalUrl ==> get the path like user/fetchUser
    // fetchDept
    if (req.originalUrl === '/') 
        console.log('welcome in Teach me website ')


    


    next();
})


var users = Array()
var usersZoom = Array()
// socket io
// let Chat= io.of("/chat")
// Chat.on('connection', socket => {
//     console.log("hayyyyyy")
// })
io.on('connection', socket => {
    // to get the IP of client
    // console.log(socket.request.connection.remoteAddress)
    // console.log(socket.conn.remoteAddress);



    console.log('the socket is connect '+socket.id);
    
    socket.on('hi',()=>{
        console.log('hi event is emitted ')
    })

    var handshakeData = socket.request._query;
    // var data= socket.handshake.query.data;
    // console.log("handshakeData",handshakeData.id)
    socket.join(handshakeData.id)

    let token = null
    let data = null
    let start = null

    var dt = handshakeData;
    if (dt['token']) {
        token = dt['token']
    }

    if (dt['data']) {
        data = dt['data'].split(';')
        start = data[4]
        token = data[0]

        
      
        // 
        // console.log(users)
    }
    var temp = {
        id: socket.id,
        token: token
    }
    users.push(temp)
    //users = users.filter((item) => item.token != token );
    //console.log(users);


    socket.on('getIDOf',(data)=>{

        let count = users.length;
        for(var i = count-1; i>=0; i--)
        {
            if(users[i].token==data)
               {socket.emit('res1',users[i].id);
               break;
            }
        }
    })


    socket.on('EndSession',(data)=>{
        let count = users.length;
        for(var i = count-1; i>=0; i--)
        {
            if(users[i].token==data)
               {
                   io.to(users[i].id).emit('EndSession');
                   console.log('hello')
                   break;
            }
        }
    })
    //console.log(token)
   
    //console.log(users);
    // var token = handshakeData._query['token'];
    // var studentID = handshakeData._query['studentID'];
    // var tutorID = handshakeData._query['tutorID'];
    // var sessionID = handshakeData._query['sessionID'];
    // var start = handshakeData._query['start'];
    socket.emit('me', socket.id)  
    if (start == 'true') {
        socket.emit('me', socket.id)        
    }

    socket.on('send', () => {
        console.log('welcome')
    })

    socket.on('disconnect', () => { // socket.broadcast.emit('callEnded') // when end the calling, the socket will emit to all connected sockets except itself


    })

    socket.emit('res', 'Hello mr mohammed');
    socket.on('request', (data) => {
        console.log(data)

        let from = ObjectId(data.student)
        let to = ObjectId(data.to)

        let info = {
            time: parseInt(data.time),
            title: data.title,
            description: data.description
        }

        let newRequest = new request({student: from, tutor: to, requestInfo: info}).save((error, data) => {
            const {_id} = data;
            const temp = {
                socketId: socket.id,
                requestId: _id
            }

            users.push(temp);
        })

    })

    socket.on('addFavorite', (data) => {
        let id = ObjectId(data.id)
        let tutor_id = ObjectId(data.tutor_id)
        student.updateOne({
            user_id: id
        }, {
            $push: {
                favorit_list: [tutor_id]
            }
        }, (err, data) => {
            if (!err) 
                console.log(data)
             else 
                console.log('the error is ' + err)


            


        })
    })

    // start session
    /* here all event about session will happend  */


    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', {
            signal: data.signalData,
            from: data.from,
            name: data.name
        })
    })


    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal)
    })
    socket.on('NewMeessage',(message)=>{
        io.to(message.to).emit('NewMeessage', message)
    })
    // end session
    // socket.on('NewMeessage',(daata)=>{
    //     let {id, status} = daata;


    //     id = ObjectId(id)
    //     users.map((data) => {
    //         console.log(data)
    //         console.log(users)
    //             io.to(data.id).emit('NewMeessage', {
    //                 student: student,
    //                 sessionID: id,
    //                 m:daata.m
    //             });
    //             // io.to(data.id).emit('NewMeessage', {
    //             //     student: student,
    //             //     sessionID: id,
    //             //     m:daata.m
    //             // });
            
    //     })
        
    // })
    socket.on('editRequestStatus', (data) => {
        let {id, status} = data;


        id = ObjectId(id)


        request.findOne({_id: id}).then((data) => {


            let {student} = data;
            student = ObjectId(student);
            let {tutor} = data;
            tutor = ObjectId(tutor);

            let checkTutor = false; // when the tutor get the openSession the value will change to true
            let checkStudent = false; // when the student get the openSession the value will change to true
            let studentID = null;
            let tutorID = null;
            users.map((data) => {

                if (data.token == tutor) {

                    tutorID = data.id;
                    checkTutor = true;
                } else if (data.token == student) {
                    studentID = data.id;
                    checkStudent = true;
                }

                if (checkStudent === true && checkTutor === true) {
                    
                    io.to(studentID).emit('openSession', {
                        student: student,
                        tutor: tutor,
                        sessionID: id
                    });
                    io.to(tutorID).emit('openSession', {
                        student: student,
                        tutor: tutor,
                        sessionID: id
                    });
                }
            })

        }).catch((error) => {
            console.log({error})
        })


        // socket.emit('open')
        // users.map((data)=>data.requestId ==)
        // console.log('the data is :')
        // console.log({data})

        // request.findOne({_id: id}).then((data) => {
        //     console.log(data)
        // })
        //         id = objectID(id)
        //
        //         request.updateOne({
        //             _id: id
        //         }, {
        //             status: status
        //         }, (error, data) => {
        //             if (!error) {
        //                 console.log(data)
        //                 if (status === 1) {
        //                     addSession(id)
        //                 }
        //             }
        //         })
    })


    socket.on('endCall', (data) => {
        let id = ObjectId(data.sessionID);

        request.findOne({_id: id}).then((data, error) => {
            let {student} = data;
            let {tutor} = data;

            users.map((data) => {
                if (data.token == student) {
                    io.to(data.id).emit('endCall');
                }
                if (data.token == tutor) {
                    io.to(data.id).emit('endCall');
                }
            })
        })
    })


    socket.on('removeFavorite', (data) => {

        let id = ObjectId(data.id)
        let tutor_id = ObjectId(data.tutor_id)
        student.updateOne({
            user_id: id
        }, {
            $pull: {
                favorit_list: {
                    $in: [tutor_id]
                }
            }
        }, (err, data) => {
            if (!err) 
                console.log(data)
             else 
                console.log('the error is ' + err)


            


        })


    })

});


function addSession(idRequest) {
    const dataOfPayment = {
        datePay: Date.now,
        idTransaction: '123-3242-431-23-2333'
    }

    const info = {
        title: 'this is title of session'

    }
    const newSession = new session({request: objectID(idRequest), TransactionPayInfo: dataOfPayment, sessionInfo: info});

    newSession.save().then((data) => {
        res.json(data)
    }).catch((error) => {})

}

// -----------Router--------------

require('./controllers/testController')(app)
require('./routers/userRouter')(app, io)
require('./routers/adminRouter')(app)
require('./routers/fetchDataRouter')(app)


// The server will listen on 4000 port
server.listen(4000, (req, res) => {
    console.log("The server is running on 4000 port ");
});

app.get('/add/:id', (req, res) => {
    res.json(req.params.id)
})

// when i want get the IP address it return
// ::1 is the compressed format IPV6 loopback address 0:0:0:0:0:0:0:1.
// It is the equivalent of the IPV4 address 127.0.0.1.