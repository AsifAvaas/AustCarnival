const mongoose = require('mongoose')
const { Schema } = mongoose

const workshopStudentSchema = new Schema({
    WorkshopName: String,
    studentName: String,
    studentEmail: String
})

module.exports = mongoose.model('workshopStudents', workshopStudentSchema)
