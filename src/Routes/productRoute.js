const route = require('express').Router();
const { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct, updateReviews } = require('../Controllers/productControllers');

const { auth, adminAuth } = require('../Middleware/auth');


route.get('/', getAllProducts);
route.get('/:_id',getProduct);
route.post('/create',auth, adminAuth,createProduct,(error,req,res,next)=>{
    res.status(400).json({error:error.message})
  })

route.patch('/update/:_id',auth, adminAuth,updateProduct)
route.patch('/updateReviews/:_id',auth, adminAuth,updateReviews)
route.delete('/delete/:_id',auth, adminAuth,deleteProduct)

module.exports = route;

