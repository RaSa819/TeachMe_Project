const bcrypt = require('bcrypt');
const user = require('./../models/users')
const tutor = require('./../models/tutors');
const student = require('./../models/student')
const mongoose = require('mongoose')

// utilities, we use it to merge between objects
const _ = require('lodash');
const { dirname } = require('path');
const { dir } = require('console');
const { has } = require('lodash');


exports.registerTutor = (req, res) => {
    var { firstName, middleName, lastName,
        userName, password, email, phoneNumber,
        gender
    } = req.body.data;

    var { country, city,
        street, ZIP } = req.body.data.address






  

    const hash = bcrypt.hashSync(password,10);
    var flag=bcrypt.compareSync(password, hash); // true


    password=hash

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
        password:hash,
        address: {
            country,
            city,
            street,
            ZIP
        },
        email,
        phoneNumber,
        gender: parseInt(gender),
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
                profile: {
                    about: tutorData.about,
                    certifications: tutorData.certifications,
                    experience: tutorData.experience
                }
            }).save((response) => {
                console.log("the tutor has added")
            }).catch((error) => {
                console.log("there are some error when add tutor " + error)

            })
        }
        else {

            new student({
                user_id: response._id
            }).save().then((response) => {
                console.log("the student has added")
            }).catch((error) => {
                console.log("there are some error when add student " + error)
            })
        }

        res.json({msg:"The added has been successfully",token:response._id})
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}


exports.Login = (req, res) => {

    user.findOne({ userName: req.body.userName, password: req.body.password }).then((data) => {
        if (data != null) {
            req.session.token = data._id
            res.json({ id: data._id, type: data.type })
        }
        else {
            res.json('there is no user ')
        }
    }).catch((error) => {
        res.json('the error is ' + error)
    })
}


exports.fetchTutors = async (req, res) => {

    // fetch ID from the user collection 
    const getTutorsID = () => {
        return new Promise((resolve, reject) => {
            user.find({ type: 1 }, {
                _id: 1,
                name: 1,
                date: 1,
                gender: 1
            }, (err, data) => {
                if (err)
                    reject(err)
                else {
                    if (data.length >= 0) {
                        resolve(data)
                    }
                    else
                        reject('the data notFound ')
                }
            })
        })
    }


    // Fetch data about tutor from the tutor collection
    const getTutor = (ID) => {
        return new Promise((resolve, reject) => {
            tutor.find({}, {
                status: 1,
                _id: 0,
                rate: 1,
                profile: 1
            }).where('user_id').in(ID).exec((err, data) => {
                if (err)
                    reject('error')
                else
                    resolve(data)
            })
        })
    }


       
    getTutorsID().then((data) => {
        var IDs = data.map(({ _id }) => _id)

        // format the data 
        getTutor(IDs).then((tutor) => {

            var newData = []
            for (var i = 0; i < data.length; i++) {
                var row = _.merge(data[i], tutor[i])
                newData.push(row)
            }

            res.json(newData)
        })
    })
}

exports.getSession = (req, res) => {
    req.session.view = 1;
    res.json(req.session.token);
}

exports.updateImg = (req, res) => {

}

exports.getStudent = (req, res) => {
    var id = req.query.id;

    user.findOne({ _id: id }).
        then((data) => {
            res.json(data)
        }).
        catch((error) => {
            res.json('the error is ' + error)
        })
}

exports.fetchImage = (req, res) => {
    var path = require('path')
    res.sendFile(path.resolve('public/images/unknow.png'))
}

exports.updateStudentProfile = (req, res) => {
    const { userName, email } = req.body.data;
    const { address } = req.body.data.address
    const { country, city, street, ZIP } = req.body.data.address;



    user.updateOne({ _id: req.body.id },
        {
            userName: userName,
            email: email,
            address: {
                country: country,
                city: city,
                street: street,
                ZIP: ZIP
            }
        },
        (err, data) => {
            res.json(data)
        })
}