# CoinMarket-Cap-clone
This project allows users to calculate crypto trades, and save them if they are logged into Auth0
The coin numbers come from the CoinMarketCap API and are used to feed the table.
Mongo Atlas is used to save user information and trades and allows users to delete trades.

If you wish to set this project up, you will need a CoinMarketCap API KEY, Mongo URL, and Auth0 API keys.

$ git clone (project)

Install dependencies

$ git install

Instructions to run on your machine

Get a CoinMarketCap API on their docs/site and either hard code it into the apiKey variable on the server.js or use an environmental variable
Make a Mongo Atlas account and set that up, and do the same for the dbURL variable below the apiKey

In the ServerModules folder, there is a file called auth0Config.js change all the .env variables to your auth0's information.
If you follow the steps on the auth0 website you should be able to make these variables for your site fairly easily.

After all the .env variables are changed everything should be ready to run. 
I recommend running it locally first, do this with:

npm run dev

then go to http://localhost:2000/

the site should be working correctly at this point.
