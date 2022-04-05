const e = require('express');
const { query } = require('../config/connectDB');

const {
  signUpService,
  loginService,
  generateRefreshTokenService,
  forgotPasswordService,
  resetPasswordService,
  verifyResetTokenService
} = require('../service/auth.service');

const createAccount = async (req, res, next) => {
  try {
    const { token, refreshToken, user } = await signUpService(req.body);
    res.header("authorization", token);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true
    });
    return res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    return res.status(200).json({ err: "Email này đã được sử dụng" });
  }

}

const loginUser = async (req, res) => {
  console.log(req.body);
  const { token, refreshToken, user, err } = await loginService(req.body);
  if (err) {
    return res.status(200).json({
      err
    });
  }
  else {
    res.header("authorization", token);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
      maxAge: 99999999999
    })
    return res.status(200).json({
      token,
      user,
    });
  }
};

const logOutUser = async (req, res) => {
  const token = req.user.token;
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "You Are Logout" });
  } catch (error) {
    return res.status(200).json({ message: "Can't  Logout" });
  }
}

const refreshToken = async (req, res, next) => {
  if (!req.cookies.refreshToken) {
    return res.status(400).json({ err: "token missing" });
  }
  const tokens = await generateRefreshTokenService(req.cookies.refreshToken);
  res.header("authorization", tokens.token);
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
  });
  return res.status(200).json(tokens);
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  await forgotPasswordService(email);

  res.json({ status: "OK" });
};



const verifyResetToken = async (req, res, next) => {
  const { token, email } = req.body;
  const isValidToken = await verifyResetTokenService({ token, email });
  // console.log(isValidToken);
  if (!isValidToken) {
    res.json({
      message: "Token has expired. Please try password reset again.",
      show: false,
    });
  } else {
    res.json({
      show: true,
    });
  }
}


const resetPassword = async (req, res) => {
  const { password, confirmPassword, token, email } = req.body;

  await resetPasswordService(password, confirmPassword, token, email);

  res.json({
    status: "OK",
    message: "Password reset. Please login with your new password.",
  });
};


module.exports = {
  createAccount,
  loginUser,
  refreshToken,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  logOutUser
}