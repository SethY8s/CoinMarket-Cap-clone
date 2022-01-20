const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

const PORT = 2000;

app.use(express.static('public'));

const url =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

const qString =
  '?CMC_PRO_API_KEY=' + process.env.apiKey + '&start=1&limit=10&convert=USD';


let symbol = [];

app.get('/data', async (req, res) => {
  const fetch_res = await fetch(url + qString);

  const coinData = await fetch_res.json();
  // console.log(json.data[0]['symbol']);

  // let symbol = []; 

  for (let i = 0; i < 9; i++) {
    symbol.push(coinData.data[i]['symbol']);
  }
  
  res.json(coinData);
  
});

setTimeout(() => {
  console.log(symbol.join(','));
}, 8000);



app.get('/logo', async (req, res) => {
  console.log(symbol);
  const symbolUrl = symbol.join(',');
  console.log(symbolUrl)
  
  const url2 = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info';
  const qString2 = `?CMC_PRO_API_KEY=${process.env.apiKey}&symbol=${symbolUrl}`;
  const fetch_res2 = await fetch(url2 + qString2);
  const coinLogo = await fetch_res2.json();
  res.json(coinLogo);
});

// Port
app.listen(PORT, () => {
  console.log('Server Running on 2000');
});
