const dept = require('./../models/department')
const user = require('./../models/users')
exports.index = async(req, res) => {

    const count= await user.deleteMany({'name.firstName':'reem'})
    console.log(count)
    res.json('welcome in nodeJS api ')
}


exports.fetchDetp = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // only fetch the name
    dept.find({},{name:1}).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.json(error)
    })
}

exports.fetchUsers=(req,res)=>{
 user.find({}).then((response)=>{
     
     res.json(response)
 }).catch((error)=>{
     res.json(error)
 })   
}