const express = require('express')
const Router = express.Router();

const adminController = require('./../controllers/adminController')

Router.post('/addDept', adminController.addDept)

// Router.post('/addDept',(req,res)=>{
//     res.json('add the department')
// })

Router.post('/delDept', adminController.deleteDept)

// Router.post('/delDept', (req,res)=>{
//     res.json('delete the department')
// })

Router.post('/EditDept', adminController.EditDept)
Router.post('/deleteUser', adminController.deleteUser)


module.exports = Router;