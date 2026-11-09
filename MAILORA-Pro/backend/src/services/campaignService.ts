import Campaign from "../models/Campaign";
import Activity from "../models/Activity";
import { sendOne } from "./mailer";

function personalize(value: string, name: string) {
  const [firstName = "there", ...rest] = name.trim().split(/\s+/);
  return value.replace(/\{\{\s*firstName\s*\}\}/gi, firstName).replace(/\{\{\s*fullName\s*\}\}/gi, name || "there");
}
export async function deliverCampaign(campaignId: string, actorId?: string) {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) throw new Error("Campaign not found");
  if (campaign.status === "sending") throw new Error("Campaign is already sending");
  campaign.status = "sending";
  await campaign.save();
  let sent = 0, failed = 0;
  for (const recipient of campaign.recipients) {
    if (recipient.status === "sent") { sent++; continue; }
    recipient.attempts += 1;
    try {
      const html = personalize(campaign.body, recipient.name || recipient.email.split("@")[0]);
      recipient.messageId = await sendOne(recipient.email, personalize(campaign.subject, recipient.name || ""), html);
      recipient.status = "sent"; recipient.sentAt = new Date(); recipient.error = undefined; sent++;
    } catch (error) {
      recipient.status = "failed"; recipient.error = error instanceof Error ? error.message : "Delivery failed"; failed++;
    }
    await campaign.save();
  }
  campaign.stats = { total: campaign.recipients.length, sent, failed, bounced: 0 };
  campaign.sentAt = new Date();
  campaign.status = failed === 0 ? "sent" : sent === 0 ? "failed" : "partial";
  await campaign.save();
  await Activity.create({ actor: actorId, action: "campaign.delivered", detail: `${campaign.name}: ${sent} sent, ${failed} failed`, entityType: "campaign", entityId: campaign.id });
  return campaign;
}
