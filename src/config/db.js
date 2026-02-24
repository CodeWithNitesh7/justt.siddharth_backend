const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            console.log("MongoDB URI not found");
            process.exit(1);
        }
        
        await mongoose.connect(uri);
        console.log("DataBase Connected Successfully ");

    } catch (err) {
        console.error("MongoDB Connection Failed :", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
