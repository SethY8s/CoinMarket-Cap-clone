const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const mongoose = require('mongoose');
const Trades = require('./models/trades');
const { db } = require('./models/trades');

const PORT = 2000;

const apiKey = process.env.apiKey;
let cryptoData;

mongoose
  .connect('mongodb://127.0.0.1:27017/crypto')
  .then(() => {
    console.log('mongo connection open');
  })
  .catch((err) => {
    console.log('not conneccted to mongo');
    console.log(err);
  });

app.use(express.static('public'));

app.use(express.json({ limit: '1mb' }));

const url =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

const qString = '?CMC_PRO_API_KEY=' + apiKey + '&start=1&limit=10&convert=USD';

let symbol = [];

app.get('/data', async (req, res) => {
  const fetch_res = await fetch(url + qString);

  const coinData = await fetch_res.json();

  for (let i = 0; i < 10; i++) {
    symbol.push(coinData.data[i]['symbol']);
  }

  res.json(coinData);
});

app.get('/logo', async (req, res) => {
  const symbolUrl = symbol.join(',');

  const url2 = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info';
  const qString2 = `?CMC_PRO_API_KEY=${apiKey}&symbol=${symbolUrl}`;
  const fetch_res2 = await fetch(url2 + qString2);
  const coinLogo = await fetch_res2.json();
  res.json(coinLogo);
});

// app post goes here
app.post('/submitData', (req, res) => {
  console.log(req.body);

  const p = new Trades({
    coin: req.body.coin,
    before: req.body.before,
    after: req.body.after,
    gainLoss: req.body.gainLoss,
    change: req.body.change,
  });

  p.save()
    .then((p) => {
      // console.log(p)
    })
    .catch((e) => {
      console.log(e);
    });

  res.send('success');

  console.log('all set');
});

app.get('/loadData', async (req, res) => {
  let resultArr = [];
  const penn = await Trades.find({});
  const pens = JSON.stringify(penn);

  console.log(pens);
  res.send(pens);
  // res.snd only takes string
});

// Port
app.listen(PORT, () => {
  console.log('Server Running on 2000');
});
