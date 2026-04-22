const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();


// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());


// ======================
// STATIC FILES (FRONTEND)
// ======================
app.use(express.static(path.join(__dirname, "../frontend")));


// ======================
// STATIC FILES (UPLOADS) ✅ FIXED
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ======================
// CONNECT DB
// ======================
connectDB();


// ======================
// ROUTES
// ======================
app.use('/api/courses', require('./routes/courses'));
app.use('/api/users', require('./routes/users'));


// ======================
// TEST ROUTE
// ======================
app.get('/', (req, res) => {
    res.send('API is running...');
});


// ======================
// START SERVER
// ======================
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});