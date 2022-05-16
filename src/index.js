require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

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
const tutors = require('./models/tutors');
const student = require('./models/student')
const sessionModel = require('./models/session');
const ObjectId = mongoose.Types.ObjectId
const server = require('http').Server(app);


mongoose.connect("mongodb+srv://raghad8:rasa112233@cluster0.r3n4y.mongodb.net/test", (err) => {
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



    
    
    
    //console.log('the socket is connect '+socket.id);
    
    socket.on('hi',()=>{
        console.log('hi event is emitted ')
    })
  


    socket.on('closeSession',(data)=>{
        io.to(data).emit('closeSession')
        console.log('the user want to close session is '+data)
    })
    var handshakeData = socket.request._query;
    // var data= socket.handshake.query.data;
    // console.log("handshakeData",handshakeData.id)
    //socket.join(handshakeData.id)

    // let token = null
    // let data = null
    // let start = null

    // var dt = handshakeData;
    // if (dt['token']) {
    //     token = dt['token']
    // }

    // if (dt['data']) {
    //     data = dt['data'].split(';')
    //     start = data[4]
    //     token = data[0]

        
      
    //     // 
    //     // console.log(users)
    // }
    // var temp = {
    //     id: socket.id,
    //     token: token
    // }
    // users.push(temp)
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
    // if (start == 'true') {
    //     socket.emit('me', socket.id)        
    // }

    // socket.on('send', () => {
    //     console.log('welcome')
    // })

    socket.on('disconnect', () => { // socket.broadcast.emit('callEnded') // when end the calling, the socket will emit to all connected sockets except itself


    })

    socket.on('sendID',(data)=>{
       let temp ={
           id:socket.id,
           token:data
       }
       let flag = false
       const indexOfObject = users.findIndex((obj) => {
        // if the current object name key matches the string
        // return boolean value true
        if (obj.token === data) {
            flag = true
          return true;
          
        }
      
        // else return boolean value false
        return false;
      });


      if(flag)
         users[indexOfObject]=temp
       else 
        users.push(temp)

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

        let newRequest = new request({
            student: from,
            tutor: to,
            requestInfo: info,
            timeLesson: data.time,
        }).save((error, data) => {
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

        //console.log('the one '+data.from +'want to call to '+data.userToCall)
    })


    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal)

        console.log('the one  answer :'+data.to)
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

    socket.on('editRequestStatus', async (data) => {
        let {id, status} = data;


        id = ObjectId(id)

        console.log('hello editRequest event and the id is '+socket.id)
        await request.findByIdAndUpdate(id, { status });
        


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

    socket.on('verifyPayment', async ({ checkoutHash, requestID }) => {
        let { data } = await axios.get('order', {
            baseURL: process.env.PADDLE_CHECKOUT_BASE_URL,
            params: new URLSearchParams({ checkout_id: checkoutHash }),
        });

        while (data.state === 'processing') {
            await new Promise(resolve => setTimeout(resolve, 3000));
            ({ data } = await axios.get('order', {
                baseURL: process.env.PADDLE_CHECKOUT_BASE_URL,
                params: new URLSearchParams({ checkout_id: checkoutHash }),
            }));
        }
        
        if (data.state === 'processed') {
            await sessionModel.create({
                request: requestID,
                studentICECandidates: [],
                tutorICECandidates: [],
            });
        }
    })

    socket.on('ice-candidates-update', async ({ sessionID, type, candidates }) => {
        if (type === 0) { // student
            await sessionModel.updateOne({ _id: sessionID }, {
                $set: {
                    studentICECandidates: candidates,
                },
            });
        } else { // tutor
            await sessionModel.updateOne({ _id: sessionID }, {
                $set: {
                    tutorICECandidates: candidates,
                },
            });
        }
    });

    socket.on('tutor-call-offer', async ({ sessionID, callOffer }, callback) => {
        try {
          const updateResult = await sessionModel.updateOne({ _id: sessionID }, {
                $set: { webRTCOffer: callOffer },
            });
            if (updateResult.matchedCount === 0) {
                callback(false);
            } else {
                callback(true);
            }  
        } catch (err) {
            callback(false);
        }
    });

    socket.on('check-session', async ({ sessionID }, callback) => {
        try {
            callback(await sessionModel.exists({ _id: sessionID }));
        } catch (err) {
            callback(false);
        }
    });

    socket.on('student-call-answer', async ({ sessionID, callAnswer }) => {
        await sessionModel.updateOne({ _id: sessionID }, {
            $set: { webRTCAnswer: callAnswer },
        });
    });

    socket.on('screen-sharing-start', async ({ sessionID, type }) => {
        await sessionModel.updateOne({ _id: sessionID }, {
            $set: type === 0 ? { isStudentSharingScreen: true } : { isTutorSharingScreen: true },
        });
    });

    socket.on('screen-sharing-end', async ({ sessionID, type }) => {
        await sessionModel.updateOne({ _id: sessionID }, {
            $set: type === 0 ? { isStudentSharingScreen: false } : { isTutorSharingScreen: false },
        });
    });

    socket.on('end-call', async ({ sessionID }) => {
        await sessionModel.updateOne({ _id: sessionID }, { $set: { isEnded: true } });
    });


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

request.watch({ fullDocument: 'updateLookup' }).on('change', async ({ operationType, fullDocument, documentKey }) => {
    if (operationType === 'update') {
        if (fullDocument.status === 1) { // accepted
            const id = documentKey._id.toString();
            const { student, tutor, timeLesson } = fullDocument;
            const tutorObject = await tutors.findOne({ user_id: tutor });
            const departmentObject = await dept.findById(tutorObject.dept_id);
            const tutorUser = await user.findById(tutorObject.user_id);

            const tutorSocket = users.find(({ token }) => token == tutor);
            const studentSocket = users.find(({ token }) => token == student);

            if (tutorSocket || studentSocket) {
                const { data: paddleData } = await axios.post('product/generate_pay_link', new URLSearchParams({
                    vendor_id: process.env.PADDLE_VENDOR_ID,
                    vendor_auth_code: process.env.PADDLE_VENDOR_AUTH_CODE,
                    product_id: process.env.PADDLE_PRODUCT_ID,
                    'prices[0]': `USD:${departmentObject.price.toFixed(2)}`,
                    custom_message: `${timeLesson}-hour session with ${tutorUser.name.firstName} ${tutorUser.name.lastName}`,
                    return_url: `http://localhost:3000/user/Payment?request_id=${id}&checkout_hash={checkout_hash}`,
                    quantity: timeLesson,
                    quantity_variable: 0,
                }), {
                    baseURL: process.env.PADDLE_BASE_URL,
                });

                if (!paddleData.success) {
                    throw new Error(paddleData.error.message);
                }

                if (studentSocket) {
                    io.to(studentSocket.id).emit('gotoPayment', {
                        student: student,
                        tutor: tutor,
                        sessionID: id,
                        checkoutURL: paddleData.response.url,
                    });
                }
                

                if (tutorSocket) {
                    io.to(tutorSocket.id).emit('gotoPayment', {
                        student: student,
                        tutor: tutor,
                        sessionID: id
                    });
                }
            }
        }
    }
});

sessionModel.watch({ fullDocument: 'updateLookup' }).on('change', async ({ operationType, updateDescription, fullDocument }) => {
    const { tutor, student } = await request.findById(fullDocument.request);
    const tutorUser = users.find(({ token }) => token == tutor);
    const studentUser = users.find(({ token }) => token == student);

    if (operationType === 'insert') {
        if (studentUser) {
            io.to(studentUser.id).emit('openSession', { sessionID: fullDocument._id });
        }

        if (tutorUser) {
            setTimeout(() => {
                io.to(tutorUser.id).emit('openSession', { sessionID: fullDocument._id });
            }, 2000);
        }
    }

    if (operationType === 'update') {
        if (updateDescription.updatedFields.studentICECandidates && tutorUser) {
            io.to(tutorUser.id).emit('ice-candidates-update', updateDescription.updatedFields.studentICECandidates)
        }

        if (updateDescription.updatedFields.tutorICECandidates && studentUser) {
            io.to(studentUser.id).emit('ice-candidates-update', updateDescription.updatedFields.tutorICECandidates);
        }

        if (updateDescription.updatedFields.webRTCOffer && studentUser) {
            io.to(studentUser.id).emit('webrtc-offer', updateDescription.updatedFields.webRTCOffer);
        }

        if (updateDescription.updatedFields.webRTCAnswer && tutorUser) {
            io.to(tutorUser.id).emit('webrtc-answer', updateDescription.updatedFields.webRTCAnswer);
        }

        if (updateDescription.updatedFields.isStudentSharingScreen === true && tutorUser) {
            io.to(tutorUser.id).emit('screen-sharing-start');
        }

        if (updateDescription.updatedFields.isStudentSharingScreen === false && tutorUser) {
            io.to(tutorUser.id).emit('screen-sharing-end');
        }

        if (updateDescription.updatedFields.isTutorSharingScreen === true && studentUser) {
            io.to(studentUser.id).emit('screen-sharing-start');
        }

        if (updateDescription.updatedFields.isTutorSharingScreen === false && studentUser) {
            io.to(studentUser.id).emit('screen-sharing-end');
        }

        if (updateDescription.updatedFields.isEnded === true) {
            if (studentUser) {
                io.to(studentUser.id).emit('end-call');
            }

            if (tutorUser) {
                io.to(tutorUser.id).emit('end-call');
            }
        }
    }
});


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