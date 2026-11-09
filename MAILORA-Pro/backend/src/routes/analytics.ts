import { Router } from "express";
import Campaign from "../models/Campaign";
import { asyncHandler } from "../utils/asyncHandler";
const router = Router();
router.get("/", asyncHandler(async (_req, res) => {
  const items = await Campaign.find().sort({ createdAt: -1 }).limit(100);
  const rows = items.map(c => ({
    id: c.id, name: c.name, date: c.createdAt, total: c.stats.total,
    sent: c.stats.sent, failed: c.stats.failed,
    rate: c.stats.total ? Math.round(c.stats.sent / c.stats.total * 100) : 0
  }));
  res.json({ success: true, data: rows });
}));
export default router;
