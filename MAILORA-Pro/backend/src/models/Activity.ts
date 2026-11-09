import mongoose, { Schema } from "mongoose";
const schema = new Schema({
  actor: { type: Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  detail: { type: String, default: "" },
  entityType: String,
  entityId: String
}, { timestamps: true });
export default mongoose.model("Activity", schema);
