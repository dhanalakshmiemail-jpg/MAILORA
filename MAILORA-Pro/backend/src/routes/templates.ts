import { Router } from "express";
const router = Router();
const templates = [
  { id: "welcome", name: "Welcome aboard", category: "Onboarding", subject: "Welcome to {{company}}!", body: "<h1>Welcome, {{firstName}}!</h1><p>We’re delighted to have you with us. Here’s what you can expect next...</p><p>Warm regards,<br/>The Team</p>" },
  { id: "newsletter", name: "Monthly digest", category: "Newsletter", subject: "Your monthly update is here", body: "<h1>The latest, in one place</h1><p>Hello {{firstName}}, here are the updates we think you’ll love.</p><ul><li>Product news</li><li>Helpful resources</li><li>What’s coming next</li></ul>" },
  { id: "offer", name: "Exclusive offer", category: "Promotion", subject: "A little something for you", body: "<h1>Something special, {{firstName}}</h1><p>As a valued member, you’re invited to explore our latest offer.</p><p><a href='#'>Discover the offer</a></p>" },
  { id: "event", name: "Event invitation", category: "Events", subject: "You’re invited: an event worth your time", body: "<h1>Save your seat</h1><p>Hi {{firstName}}, join us for an insightful session with our team.</p><p><strong>Date:</strong> Add event date<br/><strong>Location:</strong> Add location</p>" }
];
router.get("/", (_req, res) => res.json({ success: true, data: templates }));
export default router;
