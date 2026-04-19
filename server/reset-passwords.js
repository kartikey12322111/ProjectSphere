import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.js';

dotenv.config();

async function resetPasswords() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const testUsers = [
      { email: 'student@test.com', role: 'Student', password: 'password123', name: 'Test Student' },
      { email: 'teacher@test.com', role: 'Teacher', password: 'password123', name: 'Test Teacher' },
      { email: 'admin@test.com', role: 'Admin', password: 'password123', name: 'Test Admin' },
      { email: 'kartikeyrao43@gmail.com', role: 'Admin', password: 'You8791@', name: 'Kartikey Admin' },
      { email: 'kartikeyrao44@gmail.com', role: 'Student', password: 'Kartikey44', name: 'Kartikey Student' }
    ];

    for (const testUser of testUsers) {
      let user = await User.findOne({ email: testUser.email });
      if (user) {
        console.log(`Resetting password for ${testUser.email}...`);
        user.password = testUser.password;
        user.role = testUser.role; // Ensure role is correct
        await user.save();
        console.log(`✅ Password reset/Role verified for ${testUser.email}`);
      } else {
        console.log(`❌ User ${testUser.email} not found. Creating it...`);
        const newUser = new User({
          name: testUser.name,
          email: testUser.email,
          password: testUser.password,
          role: testUser.role,
          department: 'Computer Science'
        });
        await newUser.save();
        console.log(`✅ Created user: ${testUser.email} with role ${testUser.role}`);
      }
    }

    console.log('\nAll test passwords have been reset to: password123');
    process.exit(0);
  } catch (error) {
    console.error('CRITICAL ERROR:', error);
    process.exit(1);
  }
}

resetPasswords();
