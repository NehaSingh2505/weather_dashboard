const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 

app.get('/', (req, res) => {
  res.send('🌦️ Weather API is running!');
});

app.use('/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});  