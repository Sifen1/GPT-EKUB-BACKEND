const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB for seeding...'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Sample users
const users = [
  {
    name: 'Admin Sifen',
    email: 'admin@ekub.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Abebe',
    email: 'abebe@mail.com',
    password: '123456',
    role: 'member'
  },
  {
    name: 'Aster',
    email: 'aster@mail.com',
    password: '123456',
    role: 'member'
  },
  {
    name: 'Kebede',
    email: 'kebede@mail.com',
    password: '123456',
    role: 'member'
  }
];

const seedUsers = async () => {
  try {
    await User.deleteMany();
    const hashedUsers = await Promise.all(users.map(async user => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    }));
    await User.insertMany(hashedUsers);
    console.log('✅ Dummy users added!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedUsers();
