const route = require('express').Router();
const {
  register,
  activateAccount,
  refreshToken,
  login,
  forgotPassword,
  resetPassword,
  getUser,
  getAllUsers,
  logout,
  updateUser,
  deleteUsers,
  updateUserProfile,
  avatar,
  getUserById,
} = require('../Controllers/userController');

const { auth, adminAuth } = require('../Middleware/auth');
const { upload } = require('../Middleware/upload');

route.get('/', auth, adminAuth, getAllUsers);
route.get('/info', auth, getUser);
route.get('/:_id', auth, adminAuth, getUserById);
route.post('/register', register);
route.post('/activate_account', activateAccount);
route.post('/login', login);
route.post('/refresh_token', refreshToken);
route.post('/forgot_pass', forgotPassword);
route.patch('/updateprofile', auth, updateUserProfile);
route.patch('/update_user/:_id', auth, adminAuth, updateUser);
route.patch('/pass_reset', resetPassword);
route.patch('/avatar',auth, upload(1500000,'avatar'), avatar,(error,req,res,next)=>{
  res.status(400).json({error:error.message})})
route.get('/logout',logout);
route.delete('/delete/:_id', auth, adminAuth, deleteUsers);

module.exports = route;

