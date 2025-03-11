var express = require('express')
var router = express.Router()
var dishesControllers = require('../controllers/dishes.controller')

router.get('/', dishesControllers.getAll)

module.exports = router
