const route = require('express').Router();
const { addOrder, getOrderById, updateOrderToPaid } = require('../Controllers/orderController');

const { auth, adminAuth } = require('../Middleware/auth');
const { upload } = require('../Middleware/upload');

route.get('/:_id',auth,getOrderById);
route.patch('/:_id/pay',auth,updateOrderToPaid);
route.post('/create',auth, addOrder)

module.exports = route;

