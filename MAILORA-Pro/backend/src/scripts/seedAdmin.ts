import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/db";
import User from "../models/User";
async function run() {
  await connectDatabase();
  const email = (process.env.ADMIN_EMAIL || "admin@mailora.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPassword123!";
  const existing = await User.findOne({ email });
  if (existing) console.log(`Admin already exists: ${email}`);
  else {
    await User.create({ name: process.env.ADMIN_NAME || "MAILORA Admin", email, password: await bcrypt.hash(password, 12), role: "admin" });
    console.log(`Admin created: ${email}`);
  }
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
