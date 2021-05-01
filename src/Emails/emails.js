const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const {
  EMAIL_CLIENT_ID,
  EMAIL_USER,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
} = process.env;

const oauthSetUp = async (mailOptions) => {
  const { OAuth2 } = google.auth;
  const oauthClient = new OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oauthClient.setCredentials({
    refresh_token: EMAIL_REFRESH_TOKEN,
  });
  const accessToken = await oauthClient.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_USER,
      clientId: EMAIL_CLIENT_ID,
      clientSecret: EMAIL_CLIENT_SECRET,
      refreshToken: EMAIL_REFRESH_TOKEN,
      accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    }
    smtpTransport.close();
  });
};

exports.activateAccountEmail = async (name, email, url) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Account Activation",
      html: `
              <div style="max-width:75%; margin:auto; border:10px solid #ddd; padding:30px 10px; font-size:110%;text-align:center"">
              <h2 style="text-align:center; text-transform: uppercase;color:black;">Activate your joDev Account</h2>
              <p>Hi, you are almost done setting up your account</p>
              <p>You can use the button bellow to activate your account</p>
              <a 
              style="width:75%; border-radius:5px; padding:7px margin:auto; color:white; background-color:green"
               href="${url}">
               Activate your account
               </a>
              <p>The link will expire within 10 minutes, if its not used</p>
              </div>`,
    };
    await oauthSetUp(mailOptions);
  } catch (err) {
    throw new Error(err.msg)
  }
};

exports.welcomeEmail = async (name, email, url) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Welcome email",
      html: `
              <div style="max-width:75%; margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%; text-align:center"">
              <h2 style="text-align:center; text-transform: uppercase;color:black;">Hi ${name}, Welcome to mumpbin</h2>
              <p>Congratulations!. You have setup ur account successfully</p>
              <p>Click the button below to login</p>
              <a 
              style="width:75%; border-radius:5px; padding:7px margin:auto; color:white; background-color:green"
               href="${url}">
              Login
               </a>
              </div>`,
    };
    await oauthSetUp(mailOptions);
  } catch (err) {
    new Error(err.msg)
  }
};

exports.passResetEmail = async (email, url) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password reset",
      html: `
              <div style="max-width:75%; margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%; text-align:center">
              <h2 style="text-align:center; text-transform: uppercase;color:black;">Password reset</h2>
              <p>You have successfully reset your password</p>
              <p>If this was not you, click the button bellow to reset your password</p>
              <a 
      style="width:75%; border-radius:5px; padding:7px margin:auto; color:white; background-color: rgb(1, 146, 1);"
       href="${url}">
       Reset your password
       </a>
              </div>`,
    };
    await oauthSetUp(mailOptions);
  } catch (err) {
    new Error(err.msg)
  }
};

exports.forgotPassEmail = async (email, url) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Forgot password",
      html: `
      <div style="max-width:75%; margin:auto; border:10px solid #ddd; padding:30px 10px; text-align:center; font-size:110%;">
      <h2 style="text-align:center; text-transform: uppercase;color:black;">Password reset</h2>
      <p>It has come to our notice that you have forgotten your password.</p>
      <p>You can use the button bellow to reset password</p>
      <a 
      style="width:75%; border-radius:5px; padding:7px margin:auto; color:white; background-color: rgb(1, 146, 1);"
       href="${url}">
       Reset your password
       </a>
      <p>The link will expire within 10 minutes, if its not used</p>
      </div>`,
    };
    await oauthSetUp(mailOptions);
  } catch (err) {
    new Error(err.msg)
  }
};

exports.accountDeletionEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject:"Account Deletion",
      html: `
                <div style="max-width:75%; margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%;">
                <h2 style="text-align:center; text-transform: uppercase;color:black;">Account Deletion</h2>
                <p>So sad to let you go</p>
                <p>Click the link below to take a survey on were we falied and how we can improve</p>
                </div>`,
    };
    await oauthSetUp(mailOptions);
  } catch (err) {
    new Error(err.msg)
  }
};
