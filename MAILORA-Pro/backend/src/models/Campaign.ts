import mongoose, { Schema } from "mongoose";
const recipientSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, default: "" },
  status: { type: String, enum: ["queued", "sent", "failed", "bounced"], default: "queued" },
  messageId: String, error: String, sentAt: Date, attempts: { type: Number, default: 0 }
}, { _id: true });
const schema = new Schema({
  name: { type: String, required: true, trim: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, enum: ["draft", "scheduled", "sending", "sent", "partial", "failed"], default: "draft" },
  recipients: [recipientSchema],
  scheduledAt: Date,
  sentAt: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  stats: { total: { type: Number, default: 0 }, sent: { type: Number, default: 0 }, failed: { type: Number, default: 0 }, bounced: { type: Number, default: 0 } }
}, { timestamps: true });
schema.index({ createdAt: -1 });
export default mongoose.model("Campaign", schema);
