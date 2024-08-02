const mongoose = require('mongoose')

const { Schema } = mongoose


const workshopSchema = new Schema({
    name: String,
    body: String,
    date: String,
    image: String,
    icon: String
})

module.exports = mongoose.model('workshops', workshopSchema)