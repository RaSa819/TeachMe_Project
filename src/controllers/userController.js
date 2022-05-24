const bcrypt = require('bcrypt');
const user = require('./../models/users')
const tutor = require('./../models/tutors')
const student = require('./../models/student')
const request = require('./../models/request')
const ratings = require('./../models/ratings')
const session = require('./../models/session')
const mongoose = require('mongoose')

// utilities, we use it to merge between objects
const _ = require('lodash');
const { intersection, reject } = require('lodash');
const { collection } = require('./../models/users');
const { resolve } = require('path');

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
        response.password = null
        res.json({ msg: stackOperation, token: response._id, data: response })
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}


exports.Login = async (req, res) => {
    user.findOne({ userName: req.body.userName }).then(async (data) => {
        if (data != null) {
            var a = bcrypt.compareSync(req.body.password, data.password)
            if (a === true) {
                let userData = {}
                data.password = null
                if (data.type === 1) {
                    let tutorD = await tutor.findOne({user_id: data._id});
                    if (tutorD) {
                        userData = _.merge(data, tutorD)
                    }
                } else if (data.type === 0) {
                    let studentD = await student.findOne({user_id: data._id});
                    if (studentD) {
                        userData = _.merge(data, studentD)
                    }
                } else {
                    userData = data
                }
                res.json(userData)
            } else {
                res.json('no')
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
    // fetch ID from the user collection 
    const getTutorsID = (ID) => {
        let userFilter = { type: 1 }
        if (req.query.tutorName && req.query.tutorName !== '') {
            userFilter.$or = []
            userFilter.$or.push({"name.firstName": { $regex: req.query.tutorName + '.*' }})
            userFilter.$or.push({"name.middleName": { $regex: req.query.tutorName + '.*' }})
            userFilter.$or.push({"name.lastName": { $regex: req.query.tutorName + '.*' }})
        }
        return new Promise((resolve, reject) => {
            user.find(userFilter, {
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
            let filter = {}
            if (req.query.department && req.query.department !== '') {
                filter.dept_id = objectID(req.query.department)
            }
            tutor.find(filter, {
                status: 1,
                _id: 0,
                rate: 1,
                cardInfo: 1,
                profile: 1,
                user_id: 1,
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
                const indexOfObject = tutor.findIndex((obj) => {
                    if (obj._id.toString() ===data[i].user_id.toString()) {
                      return true;
                    }
                });
                if (indexOfObject >=0) {
                    var row = _.merge(data[i], tutor[indexOfObject])
                    newData.push(row)
                }
            }
            // console.log(newData)
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
                status: 1,
                randomID: 1,
                info: {
                    _id: 1,
                    name: {
                        firstName: 1,
                        lastName: 1
                    },
                    rate: 1
                },
                timeLession: 1,
                requestInfo: {
                    title: 1,
                    description: 1,
                    time: 1
                }
            }
        },
    ]).exec((error, result) => {
        if (!error) {
            res.json(result)
            //console.log(result)
        }
        else
            res.json('the error', error)
    })

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
                status: 1,
                randomID: 1,
                info: {
                    _id: 1,
                    name: {
                        firstName: 1,
                        lastName: 1
                    },
                    rate: 1
                },
                requestInfo: {
                    title: 1,
                    description: 1,
                    time: 1
                }
            }
        },
    ]).exec((error, result) => {
        if (!error) {
            res.json(result)
            //console.log(result)
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
                status: 1,
                randomID: 1,
                info: {
                    _id: 1,
                    name: {
                        firstName: 1,
                        lastName: 1
                    },
                    rate: 1
                },
                requestInfo: {
                    title: 1,
                    description: 1,
                    time: 1
                }
            }
        },
    ]).exec((error, result) => {
        if (!error) {
            res.json(result)
            //console.log(result)
        }
        else
            res.json('the error', error)
    })
}


function getFavoriteListID(id) {

    student.findOne({
        user_id: id
    }, {
        favorit_list: 1,
        _id: 0
    }).then((data) => {
        return data
    }).catch((error) => {
        return false
    })
}
exports.getFavortieListInfo = (req, res) => {
    var id = objectID(req.params.id);

    const getData = () => new Promise((resolve, reject) => {
        student.findOne({
            user_id: id
        }, {
            favorit_list: 1,
            _id: 0
        }).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
    })


    getData().then((ids) => {


        var array = Array()
        // res.json(ids.favorit_list)
        ids.favorit_list.map((item) => {
            array.push(objectID(item.toString()))
        })

        user.aggregate([
            {
                $match: {
                    _id: {
                        $in: array
                    }
                }
            },
            {
                $lookup: {
                    from: "tutors",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "info"
                }
            },
            {
                $unwind: '$info'
            },
            {
                $project: {
                    name: 1,
                    info: {
                        profile: 1
                    }
                }
            }
        ]).exec((error, data) => {
            if (!error) {
                res.json(data)
                //console.log(data)
            }
            else {
                console.log('the error is ' + error)
            }
        })
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
                if (status === 1) {
                    addSession(id)
                }
            }
        })


}


function addSession(idRequest) {



    const dataOfPayment = {
        datePay: Date.now,
        idTransaction: '123-3242-431-23-2333',
    }

    const info={
        title:'this is title of session',

    }
    const newSession = new session({
        request: objectID(idRequest),
        TransactionPayInfo: dataOfPayment,
        sessionInfo:info
    });

    newSession.save().then((data) => {
        res.json(data)
    }).catch((error) => {

    })

}


exports.fetchFavoriteList = (req, res) => {
    let id = objectID(req.params.id)

    student.findOne({
        user_id: id
    }, {
        favorit_list: 1,
        _id: 0
    }).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json(error)
    })
}

function getFavoriteList(id) {

}

exports.updateProfile = async (req, res) => {
    try {
        console.log(req.body)
        var { email, firstName, middleName, lastName,
            phoneNumber,
            gender, country, city,
            street, ZIP, type
        } = req.body.data;

        type = parseInt(type)
        // create document for user

        let updateObj = {
            email: email,
            name: {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName
            },
            address: {
                country: country,
                city: city,
                street: street,
                ZIP: ZIP
            },
            phoneNumber: phoneNumber,
            gender: parseInt(gender),
        }

        if (req.body.data.newPassword && req.body.data.newPassword != "") {
            const hash = bcrypt.hashSync(req.body.data.newPassword, 10);
            updateObj.password = hash
        }

        var stackOperation = "";

        let userUpdate = await user.findOneAndUpdate({ _id: objectID(req.body.data.id) }, updateObj, { new: true });
        let userData = {}
        userUpdate.password = null
        if (type === 1) {
            var tutorData = req.body.tutorData;
            let updateTutor = await tutor.findOneAndUpdate({user_id: objectID(req.body.data.id)}, 
                {
                    dept_id: tutorData.dept,
                    cardInfo: {
                        cardID: tutorData.cardID,
                        cardType: tutorData.cardType
                    },
                    profile: {
                        about: tutorData.about,
                        certifications: tutorData.certifications,
                        experience: tutorData.experience
                    }
                }, { new: true });
            userData = _.merge(userUpdate, updateTutor)
            stackOperation += "The tutor has been successfully updated."
        } else if (type === 0) {
            let studentD = await student.findOne({user_id: objectID(req.body.data.id)});
            if (studentD) {
                userData = _.merge(userUpdate, studentD)
            }
            stackOperation += "The student has been successfully updated."
        } else {
            userData = userUpdate
        }
        res.json({ msg: stackOperation, data: userData})
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

exports.getTutor = async (req, res) => {
    const objectID = mongoose.Types.ObjectId
    let id = req.params.id ? req.params.id : null
    let tutorDetail = await tutor.findOne({user_id: objectID(id)});
    if (tutorDetail) {
        let userD = await user.findOne({_id: objectID(id)});
        let returnObj = {
            found: true,
            profile: tutorDetail.profile,
            name: userD.name,
            address: userD.address,
            email: userD.email,
            phoneNumber: userD.phoneNumber,
            gender: userD.gender,
            type: userD.type, // one => tutor . zero => student
            date: userD.date,
            img: userD.img,
            rate: userD.rate,
            reviews: userD.reviews
        }
        res.json(returnObj)
    } else {
        res.json({found: false})
    }
}

exports.getUserStudent = async (req, res) => {
    const objectID = mongoose.Types.ObjectId
    let id = req.params.id ? req.params.id : null
    let studentDetail = await student.findOne({user_id: objectID(id)});
    if (studentDetail) {
        let userD = await user.findOne({_id: objectID(id)});
        let returnObj = {
            found: true,
            profile: studentDetail.profile,
            name: userD.name,
            address: userD.address,
            email: userD.email,
            phoneNumber: userD.phoneNumber,
            gender: userD.gender,
            type: userD.type, // one => tutor . zero => student
            date: userD.date,
            img: userD.img,
            rate: userD.rate,
            reviews: userD.reviews,
            userName: userD.userName,
            user_id: id,
            _id: id
        }
        res.json(returnObj)
    } else {
        res.json({found: false})
    }
}

exports.rateUser = async (req, res) => {
    try {
        let { sessionID, rate, userID, ratingTo } = req.body;
        let sessionObj = await session.findOne({_id: objectID(sessionID)})
        let requestID = sessionObj.request;
        let requestObj = await request.findOne({_id: requestID})
        let studentID = requestObj.student;
        let tutorID = requestObj.tutor;
        await ratings.create({
            student: studentID,
            tutor: tutorID,
            request: requestID,
            rate: rate,
            ratingTo: ratingTo
        })
        if (ratingTo === 'tutor') {
            const averageRate = await ratings.aggregate([
                { $match: { tutor: tutorID } },
                { $match: { ratingTo: 'tutor' } },
                { $group: { _id: null, average: { $avg: '$rate' } } },
              ]);
            await user.findOneAndUpdate({_id: tutorID}, {rate: averageRate[0].average});
        } else if (ratingTo === 'student') {
            const averageRate = await ratings.aggregate([
                { $match: { student: studentID } },
                { $match: { ratingTo: 'student' } },
                { $group: { _id: null, average: { $avg: '$rate' } } },
              ]);
            await user.findOneAndUpdate({_id: studentID}, {rate: averageRate[0].average});
        }
        res.json({msg: 'Successfully rated'})
    } catch (error) {
        res.json(error)  
    }
}