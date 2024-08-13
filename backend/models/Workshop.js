const mongoose = require('mongoose')

const { Schema } = mongoose


const workshopSchema = new Schema({
    name: String,
    email: String,
    password: String,
    job: String,
    description: String,
    date: String,
    profile_pic: String,
    workshop: String,
    isApproved: Boolean,
    isAdmin: Boolean
})

module.exports = mongoose.model('workshops', workshopSchema)