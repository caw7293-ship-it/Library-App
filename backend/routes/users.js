const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple login/register
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });

        // If user doesn't exist → create one
        if (!user) {
            user = new User({
                username,
                password,
                favorites: []
            });

            await user.save();
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;