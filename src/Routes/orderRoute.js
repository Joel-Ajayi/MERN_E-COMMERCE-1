const route = require('express').Router();
const { addOrder, getOrderById, updateOrderToPaid, getAllOrder, markOrderAsDelivered,getMyOrders } = require('../Controllers/orderController');

const { auth, adminAuth } = require('../Middleware/auth');

route.get('/orderbyid/:_id',auth,getOrderById);
route.get('/',auth,adminAuth,getAllOrder);
route.get('/myorders',auth,getMyOrders);
route.patch('/:_id/pay',auth,updateOrderToPaid);
route.patch('/:_id/delivered',auth,adminAuth,markOrderAsDelivered);
route.post('/create',auth, addOrder)

module.exports = route;

