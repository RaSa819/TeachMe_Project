const bcrypt = require('bcrypt');
const user = require('./../models/users')
const tutor = require('./../models/tutors')
const student = require('./../models/student')
const request = require('./../models/request')
const mongoose = require('mongoose')

// utilities, we use it to merge between objects
const _ = require('lodash');
const { intersection } = require('lodash');
const { collection } = require('./../models/users');

const objectID = mongoose.Types.ObjectId

exports.registerTutor = (req, res) => {



    console.log(req.body)




    var { firstName, middleName, lastName,
        userName, password, email, phoneNumber,
        gender, country, city,
        street, ZIP, type
    } = req.body.data;


    type = parseInt(type)

    const hash = bcrypt.hashSync(password, 10);


    password = hash

    // create document for user 

    const user1 = new user({
        name: {
            firstName,
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
        gender: parseInt(gender),
        type
    })


    var stackOperation = "";

    user1.save().then((response) => {
        if (type === 1) {
            var tutorData = req.body.tutorData;
            var newTutor = new tutor({
                dept_id: tutorData.dept,
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
                stackOperation += "The tutor has been  successfully added"
                console.log(stackOperation)
            })
        }
        else {

            new student({
                user_id: response._id
            }).save().then((response) => {

                stackOperation += "\nThe student has been succfully added "
                console.log(stackOperation)

            }).catch((error) => {
                stackOperation += "We got errors when trying adding student : " + error;
                console.log(stackOperation)
            })
        }

        res.json({ msg: stackOperation, token: response._id })
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}


exports.Login = (req, res) => {
    user.findOne({ userName: req.body.userName }).then((data) => {
        if (data != null) {
            var a = bcrypt.compareSync(req.body.password, data.password)
            if (a === true) {
                res.json({ id: data._id, type: data.type })
            }
        }
        else {
            res.json('no')
        }
    }).catch((error) => {
        res.json('the error is ' + error)
    })
}



// to check if the token is available or not 
exports.isExisted = (req, response) => {
    let token = req.params.token;
    user.findOne({ _id: token }).then((data) => {
        if (data === null)
            response.json({ res: null })
        else
            response.json({ res: 1 })
    }).catch((error) => {
        response.json({ error: error })
    })

}


exports.fetchTutorsByDeptID = (req, res) => {


    let id = req.params.id
    const objectID = mongoose.Types.ObjectId
    mongoose.model('tutor').aggregate([
        {
            $match: {
                dept_id: objectID(id)
            }
        },

        {
            "$lookup": {
                "from": "users",
                "localField": "_id",
                "foreignField": "user_id",
                "as": "result"
            }

        }
    ]).exec((err, data) => {
        if (!err)
            res.json(data.length)
        else
            res.json(err)
    })

}


exports.fetchTutors = async (req, res) => {

    const objectID = mongoose.Types.ObjectId
    // mongoose.model('users').aggregate([
    //     {
    //         $match:{
    //             type:1
    //         }
    //     }
    //     ,{
    //         "$lookup": {
    //             "from": "tutors",
    //             "localField": "_id",
    //             "foreignField": "user_id",
    //             "as": "result"
    //         }

    //     },

    // ]).exec((err, data) => {
    //     if (!err)
    //         res.json(data)
    //     else
    //         res.json(err)
    // })





    let id = req.params.id
    // fetch ID from the user collection 
    const getTutorsID = (ID) => {
        return new Promise((resolve, reject) => {
            user.find({ type: 1 }, {
                _id: 1,
                name: 1,
                date: 1,
                gender: 1,
                type: 1
            }).where('_id').in(ID).exec((err, data) => {
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
    const getTutor = () => {
        return new Promise((resolve, reject) => {
            tutor.find({ dept_id: objectID(id) }, {
                status: 1,
                _id: 0,
                rate: 1,
                profile: 1,
                user_id: 1
            }, (err, data) => {
                if (err)
                    reject('error')
                else
                    resolve(data)
            })
        })
    }



    getTutor().then((data) => {
        var IDs = data.map(({ user_id }) => user_id)

        // format the data 
        getTutorsID(IDs).then((tutor) => {

            var newData = []
            for (var i = 0; i < data.length; i++) {
                {
                    var row = _.merge(data[i], tutor[i])
                    newData.push(row)
                }
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


// to check if the enterd username is valid or not
exports.isUsernameValid = (req, res) => {
    user.findOne({ userName: req.params.email }).then((data) => {
        if (data === null)
            res.json('yes')
        else
            res.json('no')
    }).catch((error) => {
        res.json(error)
    })
}



// to fetch the pending request 
exports.fetchTutorRequest = (req, res) => {
    let id = req.params.id
    id = objectID(id)
    request.aggregate([
        {
            $match: {
                tutor: id
            }
        },
        {
            $match: {
                status: 2
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "student",
                foreignField: "_id",
                as: "info"
            }
        },
        {
            $unwind: '$info'
        },
        {
            $project: {
                _id: 1,
                info: {
                    _id: 1,
                    name: {
                        firstName: 1,
                        lastName: 1
                    },
                    rate: 1
                },
                requestInfo: {
                    title: 1
                }
            }
        },
    ]).exec((error, result) => {
        if (!error) {
            res.json(result)
            console.log(result)
        }
        else
            res.json('the error', error)
    })

}

function getNameOfStudent() {

}

exports.fetchTutorHistory = (req, res) => {
    let id = req.params.id;
    id = objectID(id)

    request.aggregate([
        {
            $match: {
                tutor: id
            }
        },
        {
            $match: {
                status: 1
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "student",
                foreignField: "_id",
                as: "info"
            }
        },
        {
            $unwind: '$info'
        },
        {
            $project: {
                _id: 1,
                info: {
                    _id: 1,
                    name: {
                        firstName: 1,
                        lastName: 1
                    },
                    rate: 1
                },
                requestInfo: {
                    title: 1
                }
            }
        },
    ]).exec((error, result) => {
        if (!error) {
            res.json(result)
            console.log(result)
        }
        else
            res.json('the error', error)
    })
}

exports.fetchStudentHistory = (req, res) => {
    let id = req.params.id;
    id = objectID(id)


    request.aggregate([
        {
            $match: {
                student: id
            }

        },
        {
            $lookup: {
                from: "users",
                localField: "tutor",
                foreignField: "_id",
                as: "info"
            }
        },
        {
            $unwind: '$info'
        },
        {
            $project: {
                _id: 1,
                info: {
                    _id: 1,
                    name: {
                        firstName: 1,
                        lastName: 1
                    },
                    rate: 1
                },
                requestInfo: {
                    title: 1
                }
            }
        },
    ]).exec((error, result) => {
        if (!error) {
            res.json(result)
            console.log(result)
        }
        else
            res.json('the error', error)
    })
}

exports.editRequestStatus = (req, res) => {
    let { id, status } = req.body;

    id = objectID(id)

    request.updateOne({
        _id: id,
    },
        {
            status: status
        }, (error, data) => {
            if (!error) {
                res.json(data)
                console.log(data)
            }
        })
}
