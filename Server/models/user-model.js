const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
  username: { type: String, unique: false, required: true },
  userImagePath: { type: String, unique: false, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  activationCode: { type: String },
  isActivated: { type: Boolean, required: true },
});

module.exports = model('users', UserSchema);
