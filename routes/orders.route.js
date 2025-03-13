var express = require('express')
var router = express.Router()
var orderControllers = require('../controllers/order.controllers')


router.post('/', orderControllers.createOrder)

router.put('/:id', orderControllers.updateOrder)

router.put('/canceled/:id', orderControllers.canceledOrder)


router.post('/complete/:id', orderControllers.completeOrder)

module.exports = router