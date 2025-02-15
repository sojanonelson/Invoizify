const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoute');
const partyRoutes = require('./routes/partyRoute');
const subscription = require('./routes/subscriptionRoute');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Use CORS middleware
app.use(cors());

// Use JSON body parser
app.use(express.json());

// Set CSP with CORS
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5000;");
  next();
});


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " + 
    "connect-src 'self' http://localhost:5000;");
  next();
});
const notificationRoutes = require('./routes/notificationRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoice', invoiceRoutes);
// Routes
app.use('/api/users', userRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/subscription/', subscription);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
