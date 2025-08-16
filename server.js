const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to ComplyEase');
});

const complianceRouter = express.Router();
complianceRouter.get('/status', (req, res) => {
  // Mock compliance status
  res.json({ status: 'Compliant', date: new Date() });
});
app.use('/compliance', complianceRouter);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

app.listen(port, () => {
  console.log(`ComplyEase server running on port ${port}`);
});