const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create and Save a new User

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    console.log(
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      })
    );
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }
  }
};

const create_user_view = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const login_view = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return email.match(re);
};

const login_user = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRES_IN * 1000 * 60 * 60 * 24
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get User

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    res.render("auth/profile", { title: "Profile", user });
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     user,
    //   },
    // });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
  res.redirect("/");
};

module.exports = {
  createUser,
  create_user_view,
  login_view,
  login_user,
  getUser,
  logout,
};
