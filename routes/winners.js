const express = require('express');
const router = express.Router();
const Winner = require('../models/Winner');

router.get('/', async (req, res) => {
  try {
    const winners = await Winner.find().sort({ dateWon: -1 });
    res.json(winners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load winners' });
  }
});

module.exports = router;
