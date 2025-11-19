require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User");

const promoteToAdmin = async () => {
  try {
    // Get email from command line arguments
    const email = process.argv[2];

    if (!email) {
      console.error("❌ Error: Please provide an email address");
      console.log("Usage: node scripts/promote-to-admin.js user@example.com");
      process.exit(1);
    }

    // Connect to database
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("❌ Error: MONGODB_URI is not defined in .env file");
      process.exit(1);
    }

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Find user by email
    console.log(`🔍 Looking for user with email: ${email}`);
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.error(`❌ Error: User with email "${email}" not found`);
      await mongoose.connection.close();
      process.exit(1);
    }

    // Check if already admin
    if (user.role === "admin") {
      console.log(`ℹ️  User "${email}" is already an admin`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Update role to admin
    user.role = "admin";
    await user.save();

    console.log(`✅ Success! User "${email}" has been promoted to admin`);
    console.log(`📧 Email: ${user.email}`);
    console.log(
      `👤 Name: ${user.firstName || "N/A"} ${user.lastName || "N/A"}`
    );
    console.log(`🔑 Role: ${user.role}`);

    // Close database connection
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

promoteToAdmin();
