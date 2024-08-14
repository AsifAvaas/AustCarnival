const mongoose = require('mongoose')
const { Schema } = mongoose

const galleryschema = new Schema({
    name: String,
    image: String
})

module.exports = mongoose.model('galleries', galleryschema)
