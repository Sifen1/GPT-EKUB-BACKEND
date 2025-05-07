const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllUsers, promoteToAdmin,deleteUser } = require('../controllers/userController');


// Only admin can access these routes
router.get('/', auth('admin'), getAllUsers);
router.delete('/:id', auth('admin'), deleteUser);
router.put('/:id/promote', auth('admin'), promoteToAdmin);
router.delete('/:id', auth('admin'), deleteUser);
router.get('/public', auth(), getAllUsers); // ✅ allow any logged-in user



module.exports = router;
