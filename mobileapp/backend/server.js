import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// MongoDB connection URI
const uri = 'mongodb+srv://neharora2413:Neha123@pantrycluster.gogalqv.mongodb.net/pantryDB?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define PantryItem schema and model
const pantryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expiry: { type: String, required: true }, // store ISO date string
});

const PantryItem = mongoose.model('PantryItem', pantryItemSchema);

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes

// GET all pantry items
app.get('/items', async (req, res) => {
  try {
    const items = await PantryItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching items' });
  }
});

// POST a new pantry item
app.post('/items', async (req, res) => {
  try {
    const { name, expiry } = req.body;
    if (!name || !expiry) {
      return res.status(400).json({ message: 'Name and expiry are required' });
    }
    const newItem = new PantryItem({ name, expiry });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving item' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
