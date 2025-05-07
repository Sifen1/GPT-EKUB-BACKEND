const User = require('../models/User');

// GET /api/users
// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send passwords
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/:id/promote
// Admin: Promote user to admin
exports.promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();

    res.json({ message: 'User promoted to admin' });
  } catch (error) {
    console.error('Promote error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// DELETE /api/users/:id
// Admin deletes a user
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ message: `User ${user.name} has been removed.` });
    } catch (error) {
      console.error('Delete user error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  