const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, unique: false, required: true },
  connectedPeople: { type: Array, unique: false, required: true },
  connectedCount: { type: Number, unique: false, required: true },
  createdData: { type: String, unique: false, required: true },
  userCreator: { type: String, unique: false, required: true },
});

module.exports = model('rooms', RoomSchema);
