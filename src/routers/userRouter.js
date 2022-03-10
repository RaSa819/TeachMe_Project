const { default: mongoose } = require('mongoose');
const userController = require('./../controllers/userController')
const request = require('./../models/request')
const ObjectId = mongoose.Types.ObjectId

module.exports = (app, io) => {

    // event when the client connect to the server
    io.on('connection', socket => {
        // to get the IP of client 
        //console.log(socket.request.connection.remoteAddress)
        //console.log(socket.conn.remoteAddress);

        // The query of client
        //console.log(socket.handshake.query);
        // The header of client
        //console.log(socket.handshake.headers);
        console.log('connection is done')

        socket.emit('res', 'Hello mr mohammed');
        socket.on('request', (data) => {
            console.log(data)

            let from = ObjectId(data.student)
            let to = ObjectId(data.to)

            let info ={
                time:parseInt(data.time),
                title:data.title,
                description:data.description
            }

            let newRequest = new request({
                student:from,
                tutor:to,
                requestInfo:info
            }).save((data)=>{
                console.log(data)
            })
        })
    });

    app.use('/', (req, res, next) => {
        //res.json('hhh')
        next()
    })
    app.get('/', (req, res) => {
        res.json('welcome')
    })

    app.get('/IsExisted/:token', userController.isExisted);
    app.get('/student/profile', userController.getStudent);
    app.post('/user/register', userController.registerTutor);

    app.post('/user/login', userController.Login);
    app.get('/user/fetchTutors/:id', userController.fetchTutors)
    app.get('/user/getSession', userController.getSession);
    app.post('/user/updateImage', userController.updateImg);
    app.get('/middleware/isUsernameValid/:email', userController.isUsernameValid)
    app.post('/student/updateProfile', userController.updateStudentProfile)
    app.get('/student/fetchTutorsByDeptID/:id',userController.fetchTutorsByDeptID)

    app.get('/tutor/fetchRequest/:id',userController.fetchTutorRequest)
    app.get('/student/fetchHistory/:id',userController.fetchStudentHistory)
    app.get('/tutor/fetchHistory/:id',userController.fetchTutorHistory)

    app.post('/tutor/editRequestStatus',userController.editRequestStatus)

    app.get('/fetch', userController.fetchImage)
}