const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: String,
    department: String,
    description: String
});

module.exports = mongoose.model('Course', CourseSchema);