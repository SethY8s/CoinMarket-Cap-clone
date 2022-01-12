

const apiKey = process.env.api

let url = "https://pro-api.coinmarketcap.com"

qString =  "?CMC_PRO_API_KEY=" + apiKey + "urls,logo,description,tags,platform,date_added,notice";

fetch(url + qString)
.then(res => {
    console.log(res)
})
