bcrypt = require('bcrypt')
const user = require('./../models/users')
const tutor = require('./../models/tutors');
const { response } = require('express');

exports.registerTutor = (req, res) => {
    var { firstName, middleName, lastName,
        userName, password, country, city,
        street, ZIP, email, phoneNumber
    } = req.body.data;


    const hash = bcrypt.hashSync(password,10);
    //var flag=bcrypt.compareSync(password, hash); // true

    password=hash

    // create document for user 
    const user1 = new user({
        name:{
            firstName:firstName,
            middleName,
            lastName,
        },
        userName,
        password,
        address:{
            country,
            city,
            street,
            ZIP
        },
        email,
        phoneNumber
    })

    user1.save().then((response)=>{
        res.json(response)
    }).catch((error)=>{
        res.json(error)
    })


    //const user_id=0
    // const dept_id=0
    // user1.save().
    // then((response)=>{

    //     // must be condition to know if the user is tutor or student
    //     user_id=response.data._id
    //     dept_id=response.data.dept_id

    //     const tutor1 = new tutor({
    //         dept_id,
    //         user_id,
    //         cardInfo:{

    //         }
    //     })

    //     tutor1.save().
    //     then((response1)=>{
    //         res.json('tutor adding is done successfully')
    //     })
    //     .catch((error)=>{
    //         res.json('there is error '+error)
    //     })


    // })
    // .catch((error)=>{
    //     res.json('there is error '+ error)
    //     return
    // })
}