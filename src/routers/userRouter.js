const userController = require('./../controllers/userController')

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

        socket.emit('res','Hello mr mohammed');
    });

    app.use('/', (req, res, next) => {
        //res.json('hhh')
        next()
    })
    app.get('/', (req, res) => {
        res.json('welcome')
    })

    app.get('/student/profile', userController.getStudent);
    app.post('/user/register', userController.registerTutor);
    app.post('/user/login', userController.Login);
    app.get('/user/fetchTutors', userController.fetchTutors)
    app.get('/user/getSession', userController.getSession);
    app.post('/user/updateImage', userController.updateImg);
    app.post('/student/updateProfile', userController.updateStudentProfile)


    app.get('/fetch', userController.fetchImage)
}