const express = require('express')
const userController = require('./../controllers/userController')

const Router = express.Router();

Router.post('/register', userController.registerTutor);

module.exports = Router;