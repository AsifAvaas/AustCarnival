const mongoose = require('mongoose')
require('dotenv').config();
const mongo_URI = process.env.MONGODB_URI;


const MongoDB = async () => {
    try {
        await mongoose.connect(mongo_URI);
        console.log("MongoDb is connected")
    } catch (e) {
        console.log("connection failed")
        console.log(e)
        process.exit(1);
    }
}

module.exports = MongoDB;