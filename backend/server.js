const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/users', require('./routes/users'));

// ✅ Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});