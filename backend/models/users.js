const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  address: {type: String, default: null},
  balance: {type: Number, default: 0},
})

const wallet = new mongoose.Schema({
  eth:{type: walletSchema, default: {}},
  trx:{type: walletSchema, default: {}},
  usdt:{type: walletSchema, default: {}}
});

const userSchema = new mongoose.Schema({
  displayName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: "user" },
  photoURL: { type: String, default: null },
  token: { type: String },
  wallet: { type: wallet , default: {} },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);