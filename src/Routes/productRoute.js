const route = require('express').Router();
const { getAllProducts, getProduct, createProduct } = require('../Controllers/productControllers');

const { auth, adminAuth } = require('../Middleware/auth');
const { upload } = require('../Middleware/upload');

route.get('/', getAllProducts);
route.get('/:_id',getProduct);
route.post('/create',auth, adminAuth,upload(1500000,'productImg'),createProduct,(error,req,res,next)=>{
    res.status(400).json({error:error.message})
  })

module.exports = route;

