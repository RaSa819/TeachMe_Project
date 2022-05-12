const bcrypt = require('bcrypt');
const user = require('./../models/users')
const tutor = require('./../models/tutors')
const student = require('./../models/student')
const request = require('./../models/request')
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


exports.Login = (req, res) => {
    user.findOne({ userName: req.body.userName }).then((data) => {
        if (data != null) {
            var a = bcrypt.compareSync(req.body.password, data.password)
            if (a === true) {
                data.password = null
                res.json(data)
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

    let id = req.params.id ? req.params.id : null
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
            let filter = id ? { dept_id: objectID(id) } : {}
            tutor.find(filter, {
                status: 1,
                _id: 0,
                rate: 1,
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
                {
                    var row = _.merge(data[i], tutor[i])
                    newData.push(row)
                }
            }
            console.log(newData)
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
            //console.log(result)
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
        var { firstName, middleName, lastName,
            phoneNumber,
            gender, country, city,
            street, ZIP, type
        } = req.body.data;

        type = parseInt(type)
        // create document for user

        let updateObj = {
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

        if (req.body.data.newPassword !== '') {
            const hash = bcrypt.hashSync(req.body.data.newPassword, 10);
            updateObj.password = hash
        }

        var stackOperation = "";

        let userUpdate = await user.findOneAndUpdate({ _id: objectID(req.body.data.id) }, updateObj, { new: true });
        if (type === 1) {
            var tutorData = req.body.tutorData;
            let updateTutor = await tutor.updateOne({user_id: objectID(req.body.data.id)}, 
                {
                    profile: {
                        about: tutorData.about,
                        certifications: tutorData.certifications,
                        experience: tutorData.experience
                    }
                });
            stackOperation += "The tutor has been  successfully added"
        } else {
            stackOperation += "The student has been successfully updated."
        }
        res.json({ msg: stackOperation, data: userUpdate})
    } catch (err) {
        console.log(error)
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