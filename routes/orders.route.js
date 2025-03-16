var express = require('express')
var router = express.Router()
var orderControllers = require('../controllers/order.controllers')
const { verifyToken } = require('../helpers/auth.helper')


router.post('/', verifyToken, orderControllers.createOrder)

router.put('/:id', verifyToken, orderControllers.updateOrder)

router.patch('/canceled/:id', verifyToken, orderControllers.canceledOrder)

router.get('/tokitchen', orderControllers.getOrdersToKitchen)

router.patch('/tokitchen/:id', verifyToken, orderControllers.orderPrepared)

router.patch('/complete/:id', verifyToken, orderControllers.completeOrder)



module.exports = router