var express = require('express')
var router = express.Router();
var tableController = require('../controllers/tables.controllers')

router.get('/', tableController.showList)
router.get('/:id', tableController.showOrder)
module.exports = router


