const express = require('express')
const fetchData = require('./../controllers/fetchData')
const router = express.Router();

router.get('/',fetchData.index)
router.get('/fetchDept',fetchData.fetchDetp)
module.exports = router