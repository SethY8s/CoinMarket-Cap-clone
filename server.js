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

app.get('/data', async (req, res) => {
  const fetch_res = await fetch(url + qString);

  const json = await fetch_res.json();
  // console.log(json.data[0]['symbol']);
  res.json(json);

  let symbol = [];
  for (let i = 0; i < 9; i++) {
    symbol.push(json.data[i]['symbol']);
  }
  console.log(symbol.join(','));
});

// app.get('/logo',  async (req, res) => {
//   const fetch_res = await fetch(url + qString);
//   console.log( fetch_res)
//   const json = await fetch_res.json();
//   res.json(json);
// })

// fetch(url + qString).then(function(res){
// console.log(res);
// });

app.listen(PORT, () => {
  console.log('Server Running on 2000');
});
