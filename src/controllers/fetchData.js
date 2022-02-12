const { response } = require('express')
const dept = require('./../models/department')

exports.index = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
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