import { Router } from "express";
import { z } from "zod";
import Campaign from "../models/Campaign";
import Contact from "../models/Contact";
import Activity from "../models/Activity";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import { AuthRequest } from "../middleware/auth";
import { deliverCampaign } from "../services/campaignService";
const router = Router();
const payload = z.object({
  name: z.string().min(2), subject: z.string().min(2), body: z.string().min(5),
  recipientIds: z.array(z.string()).optional(), recipients: z.array(z.object({ email: z.string().email(), name: z.string().optional() })).optional(),
  scheduledAt: z.string().datetime().optional()
});
router.get("/", asyncHandler(async (_req, res) => {
  const items = await Campaign.find().sort({ createdAt: -1 }).limit(100).select("-recipients");
  res.json({ success: true, data: items });
}));
router.get("/:id", asyncHandler(async (req, res) => {
  const item = await Campaign.findById(req.params.id); if (!item) throw new AppError(404, "Campaign not found");
  res.json({ success: true, data: item });
}));
router.post("/", asyncHandler(async (req: AuthRequest, res) => {
  const parsed = payload.safeParse(req.body); if (!parsed.success) throw new AppError(400, "Campaign name, subject and body are required");
  const data = parsed.data;
  let recipients = data.recipients || [];
  if (data.recipientIds?.length) {
    const contacts = await Contact.find({ _id: { $in: data.recipientIds }, subscribed: true });
    recipients = contacts.map(c => ({ email: c.email, name: `${c.firstName} ${c.lastName}`.trim() }));
  }
  if (!recipients.length) throw new AppError(400, "Select at least one subscribed recipient");
  const unique = [...new Map(recipients.map(r => [r.email.toLowerCase(), { email: r.email.toLowerCase(), name: r.name || "" }])).values()];
  const item = await Campaign.create({
    name: data.name, subject: data.subject, body: data.body, recipients: unique,
    scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
    status: data.scheduledAt ? "scheduled" : "draft", createdBy: req.user!.id,
    stats: { total: unique.length, sent: 0, failed: 0, bounced: 0 }
  });
  await Activity.create({ actor: req.user!.id, action: "campaign.created", detail: item.name, entityType: "campaign", entityId: item.id });
  res.status(201).json({ success: true, data: item });
}));
router.post("/:id/send", asyncHandler(async (req: AuthRequest, res) => {
  const item = await Campaign.findById(req.params.id); if (!item) throw new AppError(404, "Campaign not found");
  const result = await deliverCampaign(item.id, req.user!.id);
  res.json({ success: true, data: result, message: `Campaign processed: ${result.stats.sent} sent, ${result.stats.failed} failed` });
}));
router.post("/:id/retry", asyncHandler(async (req: AuthRequest, res) => {
  const item = await Campaign.findById(req.params.id); if (!item) throw new AppError(404, "Campaign not found");
  item.recipients.forEach(r => { if (r.status === "failed") r.status = "queued"; });
  item.status = "draft"; await item.save();
  const result = await deliverCampaign(item.id, req.user!.id);
  res.json({ success: true, data: result });
}));
router.delete("/:id", asyncHandler(async (req, res) => {
  const item = await Campaign.findByIdAndDelete(req.params.id); if (!item) throw new AppError(404, "Campaign not found");
  res.json({ success: true, message: "Campaign deleted" });
}));
export default router;
