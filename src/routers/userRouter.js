const userController = require('./../controllers/userController')
module.exports=(app)=>{

    app.use('/',(req,res,next)=>{
        //res.json('hhh')
        next()
    })
    app.get('/',(req,res)=>{
        res.json('welcome')
    })
    
    app.get('/student/profile',userController.getStudent);
    app.post('/user/register', userController.registerTutor);
    app.post('/user/login',userController.Login);
    app.get('/user/fetchTutors',userController.fetchTutors)
    app.get('/user/getSession',userController.getSession);
    app.post('/user/updateImage' , userController.updateImg);
    app.post('/student/updateProfile',userController.updateStudentProfile)


    app.get('/fetch',userController.fetchImage)
}