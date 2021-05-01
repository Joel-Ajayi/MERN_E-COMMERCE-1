const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

exports.auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) throw new Error("Unable to access page, please login");
    token = token.replace("Bearer ", "");

    const { _id } = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id });
    if (!user) throw new Error("Unable to access page, Please login");
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Unable to access page, Please login',
    });
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    let isAdmin = req.user.isAdmin;
    if (req.user && isAdmin === true){ return next()}

    res.status(403).json({ error: "Admin resources access denied" });
   
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

