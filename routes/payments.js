const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

router.post('/', auth('admin'), async (req, res) => {
    const { userId, status, notes } = req.body;
  
    if (!userId || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      // Remove previous payment if it exists
      await Payment.findOneAndDelete({ userId });
  
      const payment = new Payment({
        userId,
        status,
        notes,
        date: new Date()
      });
  
      await payment.save();
      res.json({ message: 'Payment saved' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Error saving payment' });
    }
  });
  // ✅ Get latest payments
router.get('/latest', auth(), async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 }).limit(50); // Adjust limit as needed
    res.json(payments);
  } catch (error) {
    console.error('Failed to fetch latest payments:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  
module.exports = router;
