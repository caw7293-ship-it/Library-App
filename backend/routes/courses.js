const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SEARCH courses by keyword
router.get('/search/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;

        const courses = await Course.find({
            title: { $regex: keyword, $options: 'i' }
        });

        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;