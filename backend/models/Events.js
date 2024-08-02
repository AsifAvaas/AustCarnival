const mongoose = require('mongoose')

const { Schema } = mongoose


const eventschema = new Schema({
    name: String,
    body: String,
    date: String,
    image: String
})

module.exports = mongoose.model('events', eventschema)