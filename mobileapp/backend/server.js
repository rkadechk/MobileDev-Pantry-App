const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log all incoming requests with method, url, and body
app.use((req, res, next) => {
  console.log(`➡️ Incoming ${req.method} request to ${req.url} with body:`, req.body);
  next();
});

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://Neha:Neha123@pantrycluster.gogalqv.mongodb.net/?retryWrites=true&w=majority&appName=PantryCluster';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  dbName: 'pantryDB',
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(' MongoDB connection error:', err));

// Define Item schema with validation and correct data types
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1 },
  purchaseDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
});

const Item = mongoose.model('Item', itemSchema);

// Add Item route with validation and detailed error responses
app.post('/add-item', async (req, res) => {
  try {
    console.log('POST /add-item body:', req.body);

    const { name, category = '', quantity, purchaseDate, expirationDate } = req.body;

    if (!name || !quantity || !purchaseDate || !expirationDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const purchase = new Date(purchaseDate);
    const expiration = new Date(expirationDate);

    if (isNaN(purchase) || isNaN(expiration)) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const newItem = new Item({
      name,
      category,
      quantity,
      purchaseDate: purchase,
      expirationDate: expiration,
    });

    const savedItem = await newItem.save();

    console.log('Item saved:', savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ message: 'Error adding item', error: err.message });
  }
});

// Get all items sorted by expirationDate ascending
app.get('/getItems', async (req, res) => {
  try {
    console.log('GET /getItems called');
    const items = await Item.find().sort({ expirationDate: 1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Start server, listening on all network interfaces so mobile devices can connect
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server running at http://0.0.0.0:${PORT}`);
});
