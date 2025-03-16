var express = require('express')
var router = express.Router();
var invoicesControllers = require('../controllers/invoices.controllers');
const { verifyToken } = require('../helpers/auth.helper');

router.get('/history', verifyToken, invoicesControllers.showInvoicesByTime)
router.get('/shift/:q', verifyToken, invoicesControllers.showInvoicesInShift)
router.get('/:id', verifyToken, invoicesControllers.showInvoicesDetails)
module.exports = router

