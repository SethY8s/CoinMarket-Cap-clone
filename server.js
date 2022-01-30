const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/cryptoCalc');
}

const PORT = 2000;

const apiKey = process.env.apiKey 

app.use(express.static('public'));

const url =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

const qString =
  '?CMC_PRO_API_KEY=' + apiKey + '&start=1&limit=10&convert=USD';

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

// Port
app.listen(PORT, () => {
  console.log('Server Running on 2000');
});
