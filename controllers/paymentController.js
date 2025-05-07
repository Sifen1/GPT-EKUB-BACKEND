const Payment = require('../models/Payment');
const User = require('../models/User');

// POST /api/payments
// Admin adds a payment status for a user
exports.addPayment = async (req, res) => {
  const { userId, status, notes } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const payment = new Payment({
      userId: user._id,
      name: user.name,
      status,
      notes,
    });

    await payment.save();
    res.status(201).json({ message: 'Payment saved', payment });
  } catch (error) {
    console.error('Add payment error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/payments
// Public - view all payment records
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    console.error('Get payments error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
