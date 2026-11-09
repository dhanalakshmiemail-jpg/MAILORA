import mongoose, { Schema } from "mongoose";
export interface IUser extends mongoose.Document {
  name: string; email: string; password: string; role: "admin" | "manager";
}
const schema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "manager"], default: "manager" }
}, { timestamps: true });
export default mongoose.model<IUser>("User", schema);
