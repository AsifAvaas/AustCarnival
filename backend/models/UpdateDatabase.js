const mongoose = require("mongoose");
const User = require("./User"); // adjust path to your UserSchema file

// MongoDB connection string (replace with your own)
const MONGO_URI = "mongodb+srv://Carnival:asifasif@cluster0.u8y4ca1.mongodb.net/AustCarnival?retryWrites=true&w=majority&appName=Cluster0";

async function updateUsers() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const result = await User.updateMany({}, { $set: { isVerified: true } });

        console.log(`${result.modifiedCount} users updated to isVerified=true`);
        mongoose.connection.close();
    } catch (err) {
        console.error("Error updating users:", err);
        mongoose.connection.close();
    }
}

updateUsers();
