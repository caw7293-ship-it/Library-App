const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://caw7293_db_user:vHHdW50E8se3vq7L@library.9micm68.mongodb.net/libraryDB?retryWrites=true&w=majority');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;