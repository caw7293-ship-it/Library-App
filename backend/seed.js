const mongoose = require('mongoose');
const Course = require('./models/Course');

console.log("SEED SCRIPT STARTING...");

const MONGO_URI = 'mongodb+srv://caw7293_db_user:vHHdW50E8se3vq7L@library.9micm68.mongodb.net/libraryDB?retryWrites=true&w=majority';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");

        const courses = [];

        for (let i = 1; i <= 50; i++) {
            courses.push({
                title: `Course ${i}`,
                department: i % 2 === 0 ? 'Computer Science' : 'Mathematics',
                description: `This is course ${i}`
            });
        }

        await Course.deleteMany();
        await Course.insertMany(courses);

        console.log("50 courses added");
        process.exit();

    } catch (err) {
        console.error("SEED ERROR:", err);
        process.exit(1);
    }
}

seed();