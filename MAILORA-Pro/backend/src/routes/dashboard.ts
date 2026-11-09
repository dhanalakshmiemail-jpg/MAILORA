import { Router } from "express";
import Campaign from "../models/Campaign";
import Contact from "../models/Contact";
import Activity from "../models/Activity";
import { asyncHandler } from "../utils/asyncHandler";
const router = Router();
router.get("/", asyncHandler(async (_req, res) => {
  const [campaigns, contacts, recent, activity] = await Promise.all([
    Campaign.find().select("name status stats createdAt sentAt"),
    Contact.countDocuments(),
    Campaign.find().sort({ createdAt: -1 }).limit(6).select("-recipients"),
    Activity.find().sort({ createdAt: -1 }).limit(8).populate("actor", "name")
  ]);
  const totals = campaigns.reduce((a, c) => ({
    sent: a.sent + (c.stats?.sent || 0), failed: a.failed + (c.stats?.failed || 0),
    total: a.total + (c.stats?.total || 0)
  }), { sent: 0, failed: 0, total: 0 });
  res.json({ success: true, data: {
    metrics: { campaigns: campaigns.length, emailsSent: totals.sent, delivered: totals.sent, failed: totals.failed, contacts },
    recent, activity,
    chart: campaigns.slice(-7).map(c => ({ name: new Date(c.createdAt).toLocaleDateString("en", { month: "short", day: "numeric" }), sent: c.stats?.sent || 0, failed: c.stats?.failed || 0 }))
  }});
}));
router.get("/activity", asyncHandler(async (_req, res) => {
  const items = await Activity.find().sort({ createdAt: -1 }).limit(100).populate("actor", "name");
  res.json({ success: true, data: items });
}));
export default router;
