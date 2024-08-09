const mongoose = require('mongoose')

const { Schema } = mongoose


const paymentSchema = new Schema({
    userId: {
        type: Number
    },
    amount: {
        type: Number
    },
    trxID: {
        type: String
    },
    paymentID: {
        type: String
    },
    date: {
        type: String
    },


}, { timestamps: true })

module.exports = mongoose.model('payments', paymentSchema)