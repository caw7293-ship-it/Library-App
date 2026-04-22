const express = require("express");
const router = express.Router();

const User = require("../models/User"); // make sure path is correct
const auth = require("../middleware/auth"); // adjust if needed

// ======================
// ADD FAVORITE + BADGES + ACTIVITY
// ======================
router.post("/favorite/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let added = false;

        // ✅ Add favorite (only if not already added)
        if (!user.favorites.includes(req.params.id)) {
            user.favorites.push(req.params.id);
            added = true;
        }

        // ======================
        // 🏆 BADGE SYSTEM
        // ======================
        const count = user.favorites.length;

        if (count >= 1 && !user.badges.includes("⭐ First Favorite")) {
            user.badges.push("⭐ First Favorite");
        }

        if (count >= 5 && !user.badges.includes("📚 5 Courses Saved")) {
            user.badges.push("📚 5 Courses Saved");
        }

        if (count >= 10 && !user.badges.includes("🎓 10 Courses Saved")) {
            user.badges.push("🎓 10 Courses Saved");
        }

        // ======================
        // 📊 ACTIVITY LOG
        // ======================
        if (added) {
            user.activity.unshift({
                action: "Favorited a course",
                course: req.params.id,
                date: new Date()
            });
        }

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;