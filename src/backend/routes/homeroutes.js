const express = require('express')
const router = express.Router()
const HomepageController = require('../controllers/home')

router.get('/', HomepageController.home)

module.exports = router