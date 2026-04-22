const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // 👤 PROFILE PICTURE
    profilePic: {
        type: String,
        default: ""
    },

    // ⭐ FAVORITES
    favorites: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ],

    // 📚 RECENTLY VIEWED COURSES
    recentlyViewed: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
    ],

    // 📊 ACTIVITY HISTORY
    activity: [
        {
            action: String,
            course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
            date: { type: Date, default: Date.now }
        }
    ],

    // 🏆 BADGES ✅ ADD THIS
    badges: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("User", UserSchema);