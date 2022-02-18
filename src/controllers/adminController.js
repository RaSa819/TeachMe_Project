const dept = require('./../models/department')
const user = require('./../models/users')
const tutor = require('./../models/tutors')
const student = require('./../models/student')

exports.addDept = async (req, res) => {
    const newDept = new dept({
        name: req.body.data.deptName,
        price: req.body.data.deptPrice
    })

    newDept.save().then((reponse) => {
        res.json(reponse)
    }).catch((error) => {
        res.json(error)
    })
}

exports.deleteDept = async (req, res) => {
    dept.remove({ _id: req.body.id }).then((response) => {
        res.json("the remove is has been successfuuly " + response.data)
    }).catch((error) => {
        res.json("there are some errors " + error)
    })


}

exports.EditDept = (req, res) => {



    dept.updateOne({ _id: req.body.data.id },
        {
            name: req.body.data.deptName,
            price: req.body.data.deptPrice
        }, { upsert: true }, (err, doc) => {
            if (err)
                res.json('the error ' + err)
            else
                res.json(doc)
        })


}


exports.deleteUser = (req, res) => {
    user.findOneAndDelete({ _id: req.body.id }).then((resp) => {

        var id = resp._id;
        var newUser = '';
        if (resp.type === 1)
            newUser = tutor
        else
            newUser = student
        newUser.remove({ user_id: id }).then((data) => {
            res.json('delete data is done successfully')
        }).catch((error) => {
            res.json('the error of tutor is ' + error)
        })
    }).catch((error) => {
        res.json('the error is' + error)
    })
}