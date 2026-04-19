import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create test users
    const users = [
      {
        name: 'Test Student',
        email: 'student@test.com',
        password: hashedPassword,
        role: 'Student',
      },
      {
        name: 'Test Teacher',
        email: 'teacher@test.com',
        password: hashedPassword,
        role: 'Teacher',
      },
      {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: hashedPassword,
        role: 'Admin',
      },
    ];

    for (let user of users) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
        console.log(`✅ Created user: ${user.email} (${user.role})`);
      } else {
        console.log(`⚠️ User already exists: ${user.email}`);
      }
    }

    console.log('\n✅ Test users created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Student: student@test.com / password123');
    console.log('Teacher: teacher@test.com / password123');
    console.log('Admin: admin@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createUser();