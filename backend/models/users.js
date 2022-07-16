const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  photoURL: { type: String, default: null },
  token: { type: String },
  walletAddress: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);