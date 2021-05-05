const route = require('express').Router();
const {
  uploadProductImage,
  destroyProductImage,
} = require('../Controllers/uploads');
const { upload } = require('../Middleware/upload');

const { auth, adminAuth } = require('../Middleware/auth');

route.post('/productImg/create/:_id?', auth, adminAuth,upload(1500000,'productImg'), uploadProductImage,(error,req,res,next)=>{
res.status(400).json({error:error.message})});
route.post('/productImg/delete', auth,adminAuth, destroyProductImage);

module.exports = route;

