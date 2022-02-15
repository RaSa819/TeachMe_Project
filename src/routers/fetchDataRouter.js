const express = require('express')
const fetchData = require('./../controllers/fetchData')
const router = express.Router();

router.get('/',fetchData.index)
router.get('/fetchDept',fetchData.fetchDetp)
router.get('/fetchUser',fetchData.fetchUsers)
module.exports = router