require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: '*',
  credentials: true,
}

const app = express();
app.use(cors(corsOptions), express.json());
app.use(express.json());

module.exports = app;

const User = require("./models/users");
const Record = require("./models/records");
const auth = require("./middleware/auth");
