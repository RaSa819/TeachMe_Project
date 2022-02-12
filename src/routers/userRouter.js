const express = require('express')
const userController = require('./../controllers/userController')

const Router = express.Router();

Router.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin: *");
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers: *');
    res.header('Access-Control-Max-Age: 1728000');
    res.header("Content-Length: 0");
    res.header("Content-Type: application/json");
    res.json(req.body);
})

module.exports = Router;