const Winner = require('../models/Winner');

// GET /api/winners
// Public: list all past winners
exports.getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find().sort({ dateWon: -1 }); // newest first
    res.json(winners);
  } catch (error) {
    console.error('Get winners error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
