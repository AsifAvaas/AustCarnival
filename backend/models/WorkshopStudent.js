const mongoose = require('mongoose')
const { Schema } = mongoose

const workshopStudentSchema = new Schema({
    WorkshopName: String,
    studentName: String,
    hostName: String,
    studentEmail: String,
    date: String,

})

module.exports = mongoose.model('workshopStudents', workshopStudentSchema)
