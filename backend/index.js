require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const kycRouter = require('./routes/kyc');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/kyc', kycRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
