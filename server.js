require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const civicSip = require('civic-sip-api');

// Step 4: Initialize instance passing your appId and secret.
const civicClient = civicSip.newClient({
  appId: 'OBdGumnJm',
  prvKey: process.env.PRIVATE_SIGNING_KEY,
  appSecret: process.env.APP_SECRET,
});

app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('woo hoo!')
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/civic', (req, res) => {
  console.log(req.body)
  // Step 5: Exchange authorization code for user data.
  civicClient.exchangeCode(req.body.jwt)
      .then((userData) => {
          // store user data and userId as appropriate
          console.log('userData = ', JSON.stringify(userData, null, 4));
          res.json({message: 'success'})
      }).catch((error) => {
          console.log(error);
          res.json({message: 'failure'})
      });
})

app.listen(8000, () => console.log('server is up!'))
