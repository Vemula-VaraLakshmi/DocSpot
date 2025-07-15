const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectToDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files for profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Default route (optional)
app.get('/', (req, res) => {
  res.send('🚀 DocSpot backend is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
