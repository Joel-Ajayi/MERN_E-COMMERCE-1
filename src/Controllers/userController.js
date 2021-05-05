const Users = require('../Models/userModel')

// const {
//   activateAccountEmail,
//   welcomeEmail,
//   passResetEmail,
//   forgotPassEmail,
// } = require("../Email/emails");
const {
  ACTIVATION_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  PASS_RESET_TOKEN_SECRET,
  CLIENT_URL,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;

const cloudinary = require("cloudinary");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { isArray } = require("util");
const { FILE } = require('dns');

exports.register = async (req, res) => {
  try {
    let { fName, lName, email, password } = req.body;
    const emailRegex=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const passRegex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (!fName || !lName || !email || !password)
      return res.status(400).json({ error: "Please fill out all fields" });
      
      if (!emailRegex.test(email))
      return res.status(400).json({ error: "Email is invalid" });

      if (!passRegex.test(password))
      return res.status(400).json({ error: "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" });
      
    password = await Users.hashPassword(password);

    // check if user already exist
    user = await Users.ifAlreadyExist(email);
    if (user) return res.status(400).json({ error: "User with email already exist" });

    // // send account activation email
    const url = `${CLIENT_URL}/users/account_activation/${ await Users.activationToken({ fName, lName, email, password })}`;
    console.log(url)
    // await activateAccountEmail(name, email, url);

    res.status(200).json({ msg: "Check your email to activate your account" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    let { activation_token } = req.body;

    if (!activation_token)
      return res.status(400).send({ error: "Please fill out all fields" });
    // verify email
    const { fName, lName, email, password } = await jwt.verify(
      activation_token,
      ACTIVATION_TOKEN_SECRET
    );

    // check if user already exist
    user = await Users.ifAlreadyExist(email);
    if (user) return res.status(400).json({ error: "User already exist" });

    //   save user
    const newUser = new Users({ fName, lName, email, password });
    await newUser.save();

    // send wlcome email
    const url = CLIENT_URL;
    // await welcomeEmail(fName, email, url);

    res.status(200).json({ msg: "Account has been activated" });
  } catch (error) {
    if (/invalid token|jwt expired|jwt malformed/.test(error.message))
      return res.status(404).json({ error: "You seemed to have clicked a invalid link, try again." });
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const emailRegex=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (!email || !password)
      return res.status(400).send({ error: "Please fill out all fields" });
    
    if (!emailRegex.test(email))
      return res.status(400).send({ error: "Email is invalid" });

    // check if user exist
    user = await Users.findByCredentials(email, password);
    if (!user)
      return res.status(400).json({ error: "Incorrect email or password" });

    const refresh_token = await user.refreshToken();
    const access_token = await Users.accessToken(user._id);

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      path: `/api/users/`,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ msg: access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).send({ error: "Please login" });
    
    const user= await Users.findOne({'refresh_token.token':refreshToken})
    if(!user)
      return res.status(401).json({ error: 'Invalid token' });
      
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET,async (err,{ _id })=>{
           try{
                if(err){
                        user.refresh_token=user.refresh_token.filter((tokens)=>tokens.token!==refreshToken)
                        await user.save()
                        return res.status(401).json({ error: err.message });
                }
                const access_token = await Users.accessToken(_id);
        
                res.status(200).json({ msg: access_token });
           }catch (error){
                return res.status(500).json({ error: error.message });
           }   
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).send({ error: "Please fill out email field" });

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).send({ error: "User with email does not exist" });

    const resetToken = await user.passResetToken();
    user.password_reset = resetToken;
    await user.save();
    const url = `${CLIENT_URL}/user/forgot_pass/${resetToken}`;
    // await forgotPassEmail(email, url);
    console.log(url)
    res.status(200).json({ msg: "Check your email to reset your password" });
  } catch (error) {
    if (/invalid token|jwt expired|jwt malformed/.test(error.message))
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { forgotPassToken, password } = req.body;
    if (!forgotPassToken)
      return res.status(404).send({ error: "You seemed to have clicked a invalid link" });

    const { _id } = await jwt.verify(forgotPassToken, PASS_RESET_TOKEN_SECRET);

    const user = await Users.findOne({ _id });
    if (!user) return res.status(404).json({ error: "You seemed to have clicked a invalid link" });
    if (user.password_reset !== forgotPassToken)
      return res.status(404).json({ error: "You seemed to have clicked a invalid link" });

    user.password = await Users.hashPassword(password);
    user.password_reset = "";
    await user.save();
    res.status(200).json({ msg: "Password successfully changed" });
  } catch (error) {
    if (/invalid token|jwt expired|jwt malformed/.test(error.message))
      return res.status(400).json({ error: "You seemed to have clicked a invalid link" });
    res.status(500).json({ error: error.message });
  }
};

exports. updateUserProfile = async (req, res) => {
  
  try {
    const {fName, lName, password} = req.body
    if(!fName&&!password&&!lName)
      return res.status(400).send({ error: "No Updates were made" });
    
    req.user.password = await Users.hashPassword(password) || req.user.password;
    req.user.fName = fName || req.user.fName;
    req.user.lName = lName || req.user.lName;
     
    await req.user.save();
    res.send({ msg: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const {fName, lName, isAdmin } = req.body
    const user = await Users.findOne({ _id });
    if(!user)
     return res.status(400).send({ error: "User not found" });
    
     user.fName = fName || user.fName;
     user.lName = lName ||user.lName;
     user.isAdmin = isAdmin
      
     await user.save();
     res.json({ msg: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    res.send({ msg: sendUsers(req.user) });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const {_id} = req.params

    if(!_id)
      return res.status(400).json({ error: "No user ID was provided" });

    const user = await Users.findOne({_id})
    if(!user)
      return res.status(400).json({ error: "User not found" });
    res.send({ msg: sendUsers(user) });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.send({ msg: sendUsers(users) });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id)
      return res.status(400).json({ error: "No identity was provided" });

    await Users.findByIdAndDelete(_id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const logoutAll = req.body.logoutAll
    const refreshToken = req.cookies.refreshToken;
    const user= await Users.findOne({'refresh_token.token':refreshToken})
    if(user){
      if(logoutAll===true){
        user.refresh_token=[]
      }else{
        user.refresh_token=user.refresh_token.filter((tokens)=>tokens.token!==refreshToken)
      }
      await user.save()
    }
    res.clearCookie("refreshToken", { path: "/api/users/" });
    res.json({ msg: "Logged out successfully " });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// configure cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

exports.avatar = async (req, res) => {
  try {
    const file = req.file
    if(!file){
      return res.status(400).json({error:'No Image was uploaded'})
    }
    cloudinary.v2.uploader.upload(
      file.path,
      {
        folder: "Avatar",
        width: 150,
        height: 150,
        crop: "fill",
      },
      async (err, result) => {
        try {
          if (err){
            removeTmp(file.path);
            throw err;
          } 
          removeTmp(file.path);
          req.user.avatar = {url:result.secure_url,public_id:result.public_id};
          await req.user.save();
          res.json({ msg: 'User updated successfully' });
        } catch (err) {
          return res.status(500).json({
            error: err,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw new Error();
  });
};

const sendUsers=(obj)=>{
  if(Array.isArray(obj)){
    const users=obj.map((val)=> {
      let user = val.toObject();
      delete user.password_reset;
      delete user.refresh_token;
      delete user.password;
      return user;
  }
    )
    return users
}

let user = obj.toObject();
delete user.password_reset;
delete user.password;
delete user.refresh_token;
delete user.createdAt;
delete user.updatedAt;
return user;
}