const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    }



});
module.exports = mongoose.model('users', UserSchema)
