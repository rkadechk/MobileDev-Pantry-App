// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection
mongoose.connect('mongodb+srv://neharora2413:Neha123@pantrycluster.gogalqv.mongodb.net/pantry?retryWrites=true&w=majority', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Define Item schema
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  expirationDate: Date
}));

// Create route to fetch pantry items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from MongoDB
    res.json(items);  // Send items back to the client (mobile app)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
