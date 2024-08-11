const mongoose = require('mongoose')

const { Schema } = mongoose;

const RegistrationSchema = new Schema({
    name1: {
        type: String,
        required: true
    },
    main_email: {
        type: String,
        required: true
    },
    roll1: {
        type: String,
        required: true
    },
    name2: {
        type: String,
        required: true
    },
    email2: {
        type: String,
        required: true
    },
    roll2: {
        type: String,
        required: true
    },
    name3: {
        type: String,
        required: true
    },
    email3: {
        type: String,
        required: true
    },
    roll3: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    tran_id: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }



});
module.exports = mongoose.model('registrations', RegistrationSchema)