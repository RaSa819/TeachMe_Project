const dept = require('./../models/department')
const user = require('./../models/users')
const tutor = require('./../models/tutors')
const student = require('./../models/student')
const mongoose = require('mongoose')
const _ = require('lodash');

exports.index = async(req, res) => {

    // const count= await user.deleteMany({})
    // console.log(count)
    res.json('welcome in nodeJS api ')
}


exports.fetchDetp = (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    // only fetch the name
    dept.find({},{name:1,price:1}).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.json(error)
    })

    

}

exports.fetchUsers = async (req,res)=>{
    try {
        const objectID = mongoose.Types.ObjectId
        let users = await user.find({type: [0,1]})
        let response = []
        for (var i=0; i<users.length; i++) {
            if (users[i].type==1) {
                let tutorD = await tutor.findOne({user_id: objectID(users[i]._id)})
                let userObj = _.merge(users[i], tutorD)
                response.push(userObj)
            } else if (users[i].type==0) {
                let studentD = await student.findOne({user_id: objectID(users[i]._id)})
                let userObj = _.merge(users[i], studentD)
                response.push(userObj)
            }
        }    
        res.json(response)
    } catch(err) {
        res.json(err)
    } 
}