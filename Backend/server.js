const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from React frontend
app.use(express.json()); // Parse JSON bodies

app.use('/api/payment', require('./routes/paymentRoutes'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
