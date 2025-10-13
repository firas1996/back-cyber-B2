const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required !!!!"],
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "The email is required !!!!"],
    validate: [validator.isEmail, "Please provide a valid email !!!!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "The password is required !!!!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "The confirm password is required !!!!"],
    minlength: 8,
    validate: function (cPass) {
      return cPass === this.password;
    },
    message: "Passwords are not the same !!!!",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  lastPasswordChangeDate: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
