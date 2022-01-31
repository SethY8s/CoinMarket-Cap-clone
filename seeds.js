const mongoose = require('mongoose');
const tradeSchema = require('./models/trades')

mongoose.connect('mongodb://localhost:27017/crypto')
.then(() => {
    console.log('mongo connection open')
})
.catch(err => {
    console.log('noooo')
    console.log(err)
})

const p = new tradeSchema ({
    coin: 'bitcoin',
    before:'$30000',
    after:'$40000',
    gainLoss:'$10000',
    change:'33%'
})

p.save().then(p => {
    console.log(p)
})
.catch(e => {
    console.log(e)
})