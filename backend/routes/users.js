const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");


// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username,
            password: hashed
        });

        res.json(user);

    } catch (err) {
        res.status(500).json(err.message);
    }
});


// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).json("Wrong password");

    const token = jwt.sign(
        { id: user._id },
        "secretKey"
    );

    res.json({ token });
});


// ======================
// GET PROFILE (/me)
// ======================
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate("favorites");

    res.json(user);
});


// ======================
// CHANGE PASSWORD
// ======================
router.post("/change-password", auth, async (req, res) => {
    const user = await User.findById(req.user.id);

    const hashed = await bcrypt.hash(req.body.password, 10);

    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated" });
});


// ======================
// PROFILE UPLOAD
// ======================
const storage = multer.diskStorage({
    destination: "./backend/uploads/",
    filename: (req, file, cb) => {
        cb(null, req.user.id + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/upload-profile", auth, upload.single("image"), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.profilePic = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({
            message: "Profile picture updated",
            profilePic: user.profilePic
        });

    } catch (err) {
        res.status(500).json("Upload failed");
    }
});


// ======================
// EXPORT
// ======================
module.exports = router;