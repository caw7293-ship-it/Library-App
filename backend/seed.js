const mongoose = require('mongoose');
const Course = require('./models/Course');

const MONGO_URI = 'mongodb+srv://caw7293_db_user:vHHdW50E8se3vq7L@library.9micm68.mongodb.net/libraryDB?retryWrites=true&w=majority';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);

        const courses = [
            { name: "Introduction to Computer Science", description: "Basics of programming" },
            { name: "Data Structures", description: "Lists, stacks, trees" },
            { name: "Algorithms", description: "Sorting and searching" },
            { name: "Operating Systems", description: "Processes and memory" },
            { name: "Database Systems", description: "SQL and data modeling" },
            { name: "Web Development", description: "Frontend and backend" },
            { name: "Software Engineering", description: "Development lifecycle" },
            { name: "Artificial Intelligence", description: "Machine learning basics" },
            { name: "Cybersecurity", description: "Security fundamentals" },
            { name: "Computer Networks", description: "Internet protocols" },
            { name: "Calculus I", description: "Limits and derivatives" },
            { name: "Calculus II", description: "Integrals and series" },
            { name: "Linear Algebra", description: "Matrices and vectors" },
            { name: "Discrete Mathematics", description: "Logic and proofs" },
            { name: "Statistics", description: "Probability and data" },
            { name: "Physics I", description: "Mechanics" },
            { name: "Physics II", description: "Electricity" },
            { name: "Chemistry", description: "Atomic structure" },
            { name: "Biology", description: "Cell biology" },
            { name: "English Composition", description: "Writing skills" }
        ];

        await Course.deleteMany();
        await Course.insertMany(courses);

        console.log("Courses added");
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();