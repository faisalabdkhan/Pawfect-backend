require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDatabase = require('./src/config/connectDatabase');

const app = express();

// Connect DB
(async () => {
  await connectDatabase();
})();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the entire public folder statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));



// Routes
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/pets', require('./src/routes/petRoutes'));
app.use('/api/sms', require('./src/routes/smsRoutes'));
app.use('/api/vaccinations', require('./src/routes/vaccinationRoutes'));
app.use('/api/groomings', require('./src/routes/groomingRoutes'));
app.use('/api/insurances', require('./src/routes/insuranceRoutes'));

// Default route
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));

