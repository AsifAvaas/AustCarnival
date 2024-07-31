const mongoose = require('mongoose')

const { Schema } = mongoose


const dataSchema = new Schema({
    name: String,
    gender: String
})

module.exports = mongoose.model('datas', dataSchema)