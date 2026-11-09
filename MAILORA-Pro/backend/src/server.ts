import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
import { connectDatabase } from "./config/db";
import { protect } from "./middleware/auth";
import { errorHandler, notFound } from "./middleware/error";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contacts";
import campaignRoutes from "./routes/campaigns";
import dashboardRoutes from "./routes/dashboard";
import analyticsRoutes from "./routes/analytics";
import templateRoutes from "./routes/templates";
import Campaign from "./models/Campaign";
import { deliverCampaign } from "./services/campaignService";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 500, standardHeaders: true, legacyHeaders: false }));
app.get("/api/health", (_req, res) => res.json({ success: true, service: "MAILORA API", timestamp: new Date().toISOString() }));
app.use("/api/auth", authRoutes);
app.use("/api", protect);
app.use("/api/contacts", contactRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/templates", templateRoutes);
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 5000);
connectDatabase().then(() => {
  app.listen(port, () => console.log(`MAILORA API running on http://localhost:${port}`));
  cron.schedule("* * * * *", async () => {
    const due = await Campaign.find({ status: "scheduled", scheduledAt: { $lte: new Date() } }).limit(5);
    for (const campaign of due) {
      try { await deliverCampaign(campaign.id, campaign.createdBy.toString()); }
      catch (error) { console.error("Scheduled campaign failed", campaign.id, error); }
    }
  });
}).catch(error => { console.error("Database connection failed", error); process.exit(1); });
