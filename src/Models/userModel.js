const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {
  ACTIVATION_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  PASS_RESET_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} = process.env;

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: [true, 'Please fill all fields']
    },
    lName:{
        type: String,
        trim: true,
        required: [true, 'Please fill all fields']
    },
    email: {
      type: String,
      required: [true, 'Please fill all fields'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please fill all fields'],
    },
    avatar: {
      url:{ type: String},
      public_id:{ type: String}
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refresh_token:[
        {
            token:{type:String}
        }
    ],
    password_reset: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods = {
  refreshToken: async function () {
    const token = await jwt.sign({ _id: this._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
    console.log(token)
    this.refresh_token=this.refresh_token.concat({token})
    await this.save()
    return token;
  },
  passResetToken: async function () {
    const token = jwt.sign({ _id: this._id }, PASS_RESET_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    this.password_reset = token;
    await this.save();
    return token;
  },
};

userSchema.statics = {
  findByCredentials: async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) return false;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return false;
    return user;
  },
  ifAlreadyExist: async function (email) {
    const user = await User.findOne({ email });
    if (user) return true;
    return false;
  },
  hashPassword: async function (password) {
    return await bcrypt.hash(password, 10);
  },
  accessToken: async function (_id) {
    const token = await jwt.sign({ _id }, ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });

    return token;
  },
  activationToken: async function (formdata) {
    const token = await jwt.sign(formdata, ACTIVATION_TOKEN_SECRET, {
      expiresIn: '10m',
    });
    console.log(token);
    return token;
  },
};

const User = mongoose.model('User', userSchema);
module.exports = User;
