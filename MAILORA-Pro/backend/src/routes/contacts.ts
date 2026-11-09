import { Router } from "express";
import { z } from "zod";
import Contact from "../models/Contact";
import Activity from "../models/Activity";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import { AuthRequest } from "../middleware/auth";
const router = Router();
const schema = z.object({ firstName: z.string().min(1), lastName: z.string().optional(), email: z.string().email(), company: z.string().optional(), group: z.string().optional(), subscribed: z.boolean().optional() });
router.get("/", asyncHandler(async (req, res) => {
  const q = String(req.query.q || "").trim(), group = String(req.query.group || "");
  const filter: Record<string, unknown> = {};
  if (q) filter.$or = ["firstName", "lastName", "email", "company"].map(k => ({ [k]: { $regex: q, $options: "i" } }));
  if (group && group !== "All groups") filter.group = group;
  const [items, total] = await Promise.all([Contact.find(filter).sort({ createdAt: -1 }).limit(500), Contact.countDocuments(filter)]);
  res.json({ success: true, data: { items, total } });
}));
router.post("/", asyncHandler(async (req: AuthRequest, res) => {
  const parsed = schema.safeParse(req.body); if (!parsed.success) throw new AppError(400, "Check the contact fields");
  const item = await Contact.create(parsed.data);
  await Activity.create({ actor: req.user?.id, action: "contact.created", detail: item.email, entityType: "contact", entityId: item.id });
  res.status(201).json({ success: true, data: item });
}));
router.patch("/:id", asyncHandler(async (req, res) => {
  const parsed = schema.partial().safeParse(req.body); if (!parsed.success) throw new AppError(400, "Invalid contact data");
  const item = await Contact.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
  if (!item) throw new AppError(404, "Contact not found");
  res.json({ success: true, data: item });
}));
router.delete("/:id", asyncHandler(async (req, res) => {
  const item = await Contact.findByIdAndDelete(req.params.id); if (!item) throw new AppError(404, "Contact not found");
  res.json({ success: true, message: "Contact deleted" });
}));
router.post("/import", asyncHandler(async (req, res) => {
  const rows = z.array(schema).max(5000).safeParse(req.body.contacts);
  if (!rows.success) throw new AppError(400, "Import must contain valid contact rows");
  const operations = rows.data.map(row => ({ updateOne: { filter: { email: row.email.toLowerCase() }, update: { $set: row }, upsert: true } }));
  const result = operations.length ? await Contact.bulkWrite(operations, { ordered: false }) : { upsertedCount: 0, modifiedCount: 0 };
  res.json({ success: true, data: { imported: result.upsertedCount + result.modifiedCount } });
}));
router.get("/groups", asyncHandler(async (_req, res) => {
  const groups = await Contact.distinct("group"); res.json({ success: true, data: groups });
}));
export default router;
