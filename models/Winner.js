const mongoose = require('mongoose');

const WinnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dateWon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Winner', WinnerSchema);
