const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config()

const PORT = 2000;

app.use(express.static('public'));

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

const qString = "?CMC_PRO_API_KEY=" + process.env.apiKey + "&start=1&limit=10&convert=USD";


app.get('/data',  async (req, res) => {
    const fetch_res = await fetch(url + qString);
    console.log( fetch_res)
    const json = await fetch_res.json();
    res.json(json);
  })

fetch(url + qString).then(function(res){
  console.log(res);
});

const url2 = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=b73985c1-8612-4632-a4d5-8b6226ce9419&symbol=BTC'

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