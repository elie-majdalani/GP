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

// Login
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
});

// Register
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { displayName, email, password } = req.body;

        // Check if user inputs are all filled
        if (!(email && password && displayName)) {
            res.status(400).send("All input is required");
        }

        // Check if user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        // Create and save the user user 
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            displayName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;


        res.status("success").json(user);
    } catch (err) {
        console.log(err);
    }
});

// Check if gmail user is already registered
app.post("/gmail", (req, res) => {
    email = req.body.email;
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          const token = jwt.sign(
            { email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(200).json(user);
        }
        else {
          res.status(201).send("User does not exist");
        }
      }).catch(err => {
        console.log(err);
      })
  })

  // register new gmail user
  app.post("/gmailRegister", async (req, res) => {
    try {
      const { displayName, email, photoUrl } = req.body;
      const user = await User.create({
        displayName,
        email: email.toLowerCase(),
        photoUrl,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  })

  // add new expense record
  app.post("/addRecord", auth, (req, res) => {
    const { email, name, category, discription, amount, type } = req.body;
    const record = new Record({
      email,
      name,
      category,
      discription,
      amount,
      type,
    });
    record.save((err, record) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(record);
    })
  })