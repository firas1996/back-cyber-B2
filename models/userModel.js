const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.confirmPassword = undefined;
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.verifyPassword = async function (userPass, cPass) {
  return await bcrypt.compare(userPass, cPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
