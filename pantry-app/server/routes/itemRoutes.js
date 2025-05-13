const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new item
router.post('/add-item', async (req, res) => {
  const { name, category, quantity, expirationDate } = req.body;

  const newItem = new Item({
    name,
    category,
    quantity,
    expirationDate,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update an existing item
router.put('/edit-item/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an item
router.delete('/delete-item/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
