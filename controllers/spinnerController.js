const Winner = require('../models/Winner');
const User = require('../models/User');

// POST /api/spinner
// Admin selects participants (array of userIds), backend picks one randomly
exports.startSpinner = async (req, res) => {
  const { participants } = req.body;
  const io = req.app.get('io'); // access socket instance

  if (!participants || participants.length < 2) {
    return res.status(400).json({ message: 'At least 2 participants required' });
  }

  try {
    // Fetch full user info of participants
    const users = await User.find({ _id: { $in: participants } });

    // Pick a random user
    const randomIndex = Math.floor(Math.random() * users.length);
    const winner = users[randomIndex];

    // Save to Winners collection
    const savedWinner = await Winner.create({
      userId: winner._id,
      name: winner.name,
    });

    // Emit real-time events
    io.emit('spinner:start', users.map(u => u.name)); // Send names to spin
    io.emit('spinner:result', {
      name: winner.name,
      date: savedWinner.dateWon,
    });

    res.json({
      message: 'Winner selected!',
      winner: {
        name: winner.name,
        date: savedWinner.dateWon,
      },
    });
  } catch (error) {
    console.error('Spinner error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
