const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validate = require('validator');

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name!'],
  },
  email: {
    type: String,
    // required: [true, 'Please tell us your email!'],
    unique: true,
    lowercase: true,
    validate: [validate.isEmail, 'The email must be a valid email!'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'A user must have a username!'],
  },
  password: {
    type: String,
    required: [true, 'Please input your password!'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      // This only works on create and save, because Mongoose does not keep object in memory.
      // Another reason is because the middleware will not be run during update. Passwords will not be encrypted!
      // We have to use the 'this' keyword as it returns to currently processed docs.
      // Arrow function does not work on this keyword!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Document middleware, only works on save() and create()!
// Doesn't work on update() and insert()!
user.pre('save', async function (next) {
  // Only run the encryption if the password is modified.
  if (!this.isModified('password')) {
    return next();
  }

  // Encrypt the password with BCRYPT Algorithm.
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

user.methods.isPasswordCorrect = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

const User = mongoose.model('User', user);

module.exports = User;