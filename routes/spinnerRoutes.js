const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Winner = require('../models/Winner');
const User = require('../models/User');

// POST /api/spinner/start
router.post('/start', auth('admin'), async (req, res) => {
  const { members } = req.body;

  try {
    if (!members || members.length === 0) {
      return res.status(400).json({ message: 'No members selected' });
    }

    const io = req.app.get('io');
    const selectedUsers = await User.find({ _id: { $in: members } }).lean();
    const validUsers = selectedUsers.filter(u => u?.name);

    console.log('🎯 Valid users:', validUsers); // Debug

    // ✅ Double check that names are strings
    const nameList = validUsers.map(u => u.name);

    io.emit('spinner:started', { members: validUsers }); // This is what frontend expects

    setTimeout(async () => {
      const winnerUser = validUsers[Math.floor(Math.random() * validUsers.length)];
      const winner = new Winner({
        userId: winnerUser._id,
        name: winnerUser.name,
        dateWon: new Date()
      });

      await winner.save();

     io.emit('spinner:result', {
  winner: {
    name: winner.name,
    _id: winner.userId,
    date: winner.dateWon
  }
});
    }, 4000);

    return res.status(200).json({ message: 'Spinner started' });

  } catch (err) {
    console.error('❌ Spinner route error:', err); // log the real error
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
