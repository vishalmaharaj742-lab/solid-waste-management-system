const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcryptjs");
const connectDb = require("./config/db");
const User = require("./models/User");

const seed = async () => {
  await connectDb();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@swms.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: "SWMS Admin",
      email: adminEmail,
      passwordHash,
      role: "admin"
    });
    console.log("Admin created");
  } else {
    console.log("Admin already exists");
  }

  const userEmail = "user@swms.local";
  const existingUser = await User.findOne({ email: userEmail });
  if (!existingUser) {
    const passwordHash = await bcrypt.hash("User123!", 10);
    await User.create({
      name: "Sample User",
      email: userEmail,
      passwordHash,
      role: "user"
    });
    console.log("Sample user created");
  } else {
    console.log("Sample user already exists");
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
