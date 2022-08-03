const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, default: null, unique: false},
  name: { type: String, default: null },
  category: { type: String, default: null },
  description: { type: String, default: null },
  amount: { type: Number , default: null },
  type :{ type: Boolean, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("record", userSchema);