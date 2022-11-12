const User = require("../models/UserModel");
const Session = require("../models/SessionModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({
    id
  }, process.env.SECRET_OR_KEY, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = {
    username: "",
    password: ""
  };

  console.log(err);
  if (err.message === "incorrect username") {
    errors.username = "Username is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  }

  if (err.code === 11000) {
    errors.username = "Username is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({
      properties
    }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    if (err.code === 11000) {
      errors.username = "unknown error";
      errors.password = "unknown error";
      return errors;
    }
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.create({
      username,
      password
    });

    res.status(201).json({
      user: user._id,
      created: true
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({
      errors,
      created: false
    });
  }
};

module.exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.login(username, password);
    // const token = createToken(user._id);
    session = req.session;
    session.user = user;
    const sessionresponse = await Session.create({
      userID: session.user._id,
      name: "first-trial",
    });
    // res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    console.log(sessionresponse);
    res.cookie("session", session, { httpOnly: false, secure: true, sameSite: true, maxAge: maxAge * 1000});
    res.cookie("user", user, { httpOnly: false, secure: true, sameSite: true, maxAge: maxAge * 1000});
    res.status(200).json({ user: session.user, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({
      errors,
      status: false
    });
  }
};