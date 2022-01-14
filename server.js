const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config()

const PORT = 2000;

app.use(express.static('public'));

const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const qString = "?CMC_PRO_API_KEY=" + process.env.apiKey + "&start=1&limit=15&convert=USD";


app.get('/pen',  async (req, res) => {
    const fetch_res = await fetch(url + qString);
    const json = await fetch_res.json();
    res.json(json);
  })

fetch(url + qString).then(function(res){
  console.log(res);
});





app.listen(PORT, () => {
    console.log('Server Running on 2000');
  });