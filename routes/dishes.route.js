var express = require('express')
var router = express.Router()
var dishesControllers = require('../controllers/dishes.controller')
const { route } = require('.')

router.get('/', dishesControllers.getAll)
router.put('/:id', dishesControllers.changeDishStatus)


module.exports = router
