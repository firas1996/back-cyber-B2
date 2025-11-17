const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id, name, email, role) => {
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        message: "email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "user does not exist !!!",
      });
    }
    if (!(await user.verifyPassword(password, user.password))) {
      res.status(400).json({
        status: "fail",
        message: "pass incorrect !!!",
      });
    }
    const token = createToken(user._id, user.name, user.email, user.role);
    res.status(201).json({
      status: "success login",
      token: token,
      //   data: {
      //     user: newUser,
      //   },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
