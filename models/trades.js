const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true
    },
    before: {
        type: String,
        required: true
    },
    after: {
        type: String,
        required: true
    },
    gainLoss: {
        type: String,
        required: true
    },
    change: {
        type: String,
        required: true
    }
})