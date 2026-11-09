import mongoose, { Schema } from "mongoose";
const schema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, default: "", trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  company: { type: String, default: "" },
  group: { type: String, default: "General" },
  tags: [{ type: String }],
  subscribed: { type: Boolean, default: true },
  source: { type: String, default: "manual" }
}, { timestamps: true });
schema.index({ email: 1 }, { unique: true });
schema.index({ firstName: "text", lastName: "text", email: "text", company: "text" });
export default mongoose.model("Contact", schema);
