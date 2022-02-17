const bcrypt = require('bcrypt')
const user = require('./../models/users')
const tutor = require('./../models/tutors');
const student = require('./../models/student')

exports.registerTutor = (req, res) => {
    var { firstName, middleName, lastName,
        userName, password, email, phoneNumber,
        gender
    } = req.body.data;

    var { country, city,
        street, ZIP } = req.body.data.address




    //const hash = bcrypt.hashSync(password,10);
    //var flag=bcrypt.compareSync(password, hash); // true

    //password=hash

    // create document for user 

    var type = 0; // student 
    if (req.body.tutorData != null)
        type = 1 // tutor 

    const user1 = new user({
        name: {
            firstName: firstName,
            middleName,
            lastName,
        },
        userName,
        password,
        address: {
            country,
            city,
            street,
            ZIP
        },
        email,
        phoneNumber,
        gender:parseInt(gender),
        type
    })

    user1.save().then((response) => {
        if (type === 1) {
            var tutorData = req.body.tutorData;
            var newTutor = new tutor({
                dept_id: tutorData.dept_id,
                user_id: response._id,
                cardInfo: {
                    cardID: tutorData.cardID,
                    cardType: tutorData.cardType
                },
                profile:{
                    about:tutorData.about,
                    certifications:tutorData.certifications,
                    experience:tutorData.experience
                }
            }).save((response) => {
                console.log("the tutor has added")
            }).catch((error) => {
                console.log("there are some error when add tutor "+error)

            })
        }
        else {

            new student({
                user_id:response._id
            }).save().then((response)=>{
                console.log("the student has added")
            }).catch((error)=>{
                console.log("there are some error when add student "+error)
            })
        }
       
        res.json("add student is has be successfully ")
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}


exports.Login = (req, res) => {

    user.find({ userName: req.body.userName, password: req.body.password }).then((data) => {
        res.json(data);
        return;
    })
    //res.json('gg')
}