require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Web3 = require("web3");
const Tx = require('ethereumjs-tx').Transaction
const corsOptions = {
  origin: '*',
  credentials: true,
}
var admin = require("firebase-admin");

var serviceAccount = require("./config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gp-project-420b5-default-rtdb.firebaseio.com"
});
const db = admin.firestore();
console.log(admin)
const app = express();
app.use(cors(corsOptions), express.json());
app.use(express.json());

module.exports = app;

const User = require("./models/users");
const Record = require("./models/records");
const Transaction = require("./models/transactions");
const auth = require("./middleware/auth");

//check login
app.post('/', auth, async (req, res) => {
  if (req.body) {
    const user = await User.findOne({ email: req.user.email });
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // user
    res.status(200).json(user);
  } else {
    res.status(401).send("Unauthenticated");
  }
})
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


    res.status(200).json(user);
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

// get all expense records
app.post("/getRecords", auth, (req, res) => {
  Record.find({ email: req.user.email }, (err, records) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(records);
  })
})
app.post("/deposit", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    //check what wallet is requested
    let address
    let ticker
    if (req.body.coin === "ETH") {
      //check if user has eth wallet and sends if it exists and sends it
      if (user.wallet.eth.address) {
        return res.status(200).json(user.wallet.eth.address);
      }
      //gets address from env file
      address = process.env.ETH_WALLET;
      ticker = "eth";
    }
    //check what wallet is requested
    else if (req.body.coin === "TRX") {
      //check if user has tron wallet and sends if it exists and sends it
      if (user.wallet.trx.address) {
        return res.status(200).json(user.wallet.trx.address);
      }
      //gets address from env file
      address = process.env.TRX_WALLET;
      ticker = "trx";
    }
    //check what wallet is requested
    else if (req.body.coin === "USDT") {
      //check if user has usdt wallet and sends if it exists and sends it
      if (user.wallet.usdt.address) {
        return res.status(200).json(user.wallet.usdt.address);
      }
      //gets address from env file
      address = process.env.TRX_WALLET;
      ticker = "trc20/usdt";
    }
    // replace variables according to the requested wallet
    const query = new URLSearchParams({
      apikey: process.env.CRYPT_API,
      callback: `http://127.0.0.1:4001/callback?email=${req.user.email}&type=${req.body.type}`,
      address: address,
      multi_token: '1',
    }).toString();

    const resp = await axios.get(`https://pro-api.cryptapi.io/${ticker}/create/?${query}`, { method: 'GET' });

    //get the address from the response
    const wallet = resp.data.address_in;
    //save the wallet to the user
    if (req.body.coin === "ETH") {
      user.wallet.eth.address = wallet;
      await user.save();
      return res.status(200).json(wallet);
    }
    //save the wallet to the user
    else if (req.body.coin === "TRX") {
      user.wallet.trx.address = wallet;
      await user.save();
      return res.status(200).json(wallet);
    }
    //save the wallet to the user
    else if (req.body.coin === "USDT") {
      user.wallet.usdt.address = wallet;
      await user.save();
      return res.status(200).json(wallet);
    }
  } catch (err) {
    console.log(err);
  }
})


app.post("/withdraw", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    //eth coin
    if (req.body.coin === "ETH") {
      //initilize web3
      let web3 = new Web3('https://rinkeby.infura.io/v3/29507f3c0a47434f880c3ece808831cb');
      // get transaction count
      let nonce = await web3.eth.getTransactionCount(process.env.ETH_WALLET, 'pending')
      //get transaction fee
      let gasPrice = await web3.eth.getGasPrice()
      //get gas limit
      const gasPriceLimit = await web3.eth.estimateGas({
        nonce,
        to: user.wallet.eth.address,
        value: web3.utils.toHex(web3.utils.toWei(req.body.amount, 'ether')),
      })
      //send transaction info
      let rawTransaction = {
        from: process.env.ETH_WALLET,
        to: user.wallet.eth.address,
        value: web3.utils.toHex(web3.utils.toWei(req.body.amount, 'ether')),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(gasPriceLimit),
        nonce: web3.utils.toHex(nonce)
      }
      //intialize transaction
      let transaction = new Tx(rawTransaction, { chain: 'rinkeby' })
      //sign transaction
      transaction.sign(Buffer.from(process.env.ETH_PRIVATE_KEY, 'hex'))
      //convert transaction into a series of bytes
      let serializedTransaction = transaction.serialize()
      //send signed transaction to the network
      let receipt = await web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
      //get the transaction hash
      const hashedId = receipt.transactionHash;
      //save the transaction
      const newTransaction = await Transaction.create({
        user_id: user._id,
        email: user.email,
        amount: req.body.amount,
        currency: "ETH",
        type: 0,
        trx_id: hashedId,
      })
      db.collection('messages').add({
        text: `You have successfully withdrawn ${req.body.amount} ${req.body.coin}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        displayName: user.displayName,
        emailto: user.email,
      });
      //add the transaction to the user
      user.wallet.eth.balance = user.wallet.eth.balance - parseInt(req.body.amount);
      await user.save();
      return res.status(200).json(newTransaction);


      //Tron network coins
    } else {
      //get coin info
      let { coin, amount, recipient } = req.body
      //convert to integer
      amount = parseInt(amount)
      //prepare transaction
      const body = { sender: '', type: '', recipient, amount }
      try {
        let walletData
        //get the wallet address
        if (coin === "USDT") {
          //check if user has enough USDT
          const wallet = await axios.get(`https://pretixe.com/v1/wallets?api=${process.env.PRETIXE_API_KEY}&type=usdt_trc20`);
          walletData = wallet.data.data[0]
          body.sender = process.env.TRX_WALLET
          body.type = 'usdt_trc20'
        }
        if (coin === "TRX") {
          //check if user has enough TRX
          const wallet = await axios.get(`https://pretixe.com/v1/wallets?api=${process.env.PRETIXE_API_KEY}&type=trx`);
          walletData = wallet.data.data[0]
          body.sender = process.env.TRX_WALLET
          body.type = 'trx'
        }
        //return if not enough funds
        if (walletData.usd_value < amount)
          return res.status(400).json({ error: 'Insufficient funds' })
        try {
          //send transaction
          const withdraw = await axios.post(`https://pretixe.com/v1/pay?api=${process.env.PRETIXE_API_KEY}`,
            body
          )
          //save the transaction
          if (withdraw.success) {
            const query = new URLSearchParams({
              apikey: process.env.CRYPT_API,
              prices: '1'
            }).toString();
            const respond = await axios.get(`https://pro-api.cryptapi.io/${payload.type}/info/?${query}`)
            //deduct the amount from the user's wallet
            const deductedAmount = amount / respond.data.prices.USD
            if (coin === "TRX") {
              user.wallet.trx.balance = user.wallet.trx.balance - deductedAmount
            } else if (coin === "USDT") {
              user.wallet.usdt.balance = user.wallet.usdt.balance - deductedAmount
            }
            user.save()
            //save the transaction
            const transaction = await Transaction.create({
              user_id: user._id,
              email: user.email,
              amount: amount,
              type: 0,
              status: 2,
              currency: coin,
              trx_id: "123",
            })
            db.collection('messages').add({
              text: `You have successfully withdrawn ${deductedAmount} ${coin}`,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              displayName: user.displayName,
              emailto: user.email,
            });

            return res.status(200).json({ success: 'True' })
          }
          return res.status(400).json({ error: 'Transaction failed' })
        } catch (error) {

          return res.status(400).json({ error: error })
        }
      } catch (error) {
        return res.status(400).json({ error: error })
      }

    }
  } catch (err) {
    console.log(err);
  }
})

//wait for deposite
app.get("/callback", async (req, res) => {
  try {
    //get query
    const payload = req.query
    //get the transaction info with converted prices
    const { address_in, secret, txid_in, value_coin, value_forwarded_coin, pending, email, coin } = payload
    const user = await User.findOne({ email })
    let transaction
    //check if transaction is pending
    if (pending == 1) {
      //add to database
      transaction = await new Transaction({
        to_user_id: user._id,
        currency: coin.toUpperCase(),
        type: 1,
        status: 1,
        foreign_trx_id: txid_in,
      }).save()
      return res.status(200).json(transaction)
    }

    //split coin if it has a underscore
    if (coin.split('_').length > 1) {
      const [network, name] = coin.split('_')
      coin = name
    }

    try {
      //check if transaction already exists
      const checkTx = await Transaction.findOne({
        trx_id: txid_in,
        status: 2,
      }).lean()
      // return if transaction already exists
      if (checkTx) return
      //get user

      //check if user exists
      if (!user) {
        this.Logger.error(`User ${userID} not found using ${coin.toUpperCase()} address: ${address_in}`)
        return Promise.reject({ code: ERROR.UserNotFound, message: 'USER_NOT_FOUND' })
      }
      //add info to database
      if (coin.toUpperCase() === 'TRX') {
        user.wallet.trx.balance = user.wallet.trx.balance + parseInt(value_coin)
      }
      else if (coin.toUpperCase() === 'USDT') {
        user.wallet.usdt.balance = user.wallet.usdt.balance + parseInt(value_coin)
      }
      else if (coin.toUpperCase() === 'ETH') {
        user.wallet.eth.balance = user.wallet.eth.balance + parseInt(value_coin)
      }
      //save user
      await user.save()
      //add transaction to database
      await new Transaction({
        user_id: user._id,
        currency: coin.toUpperCase(),
        email: user.email,
        type: 1,
        status: 2,
        amount: value_coin,
        trx_id: txid_in,
      }).save()

      db.collection('messages').add({
        text: `You have successfully deposit ${value_coin} ${coin}`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        displayName: user.displayName,
        emailto: user.email,
      });
      res.status(200).send('*ok*')
    } catch (e) {
      this.Logger.error(e)
      return Promise.reject({ code: ERROR.InternalError, message: 'INTERNAL_ERROR' })
    }
  } catch (e) {
    res.status(500).json(e)
  }
})
