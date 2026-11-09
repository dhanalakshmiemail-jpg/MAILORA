import nodemailer from "nodemailer";
let transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (transport) return transport;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS)
    throw new Error("SMTP is not configured. Add SMTP_HOST, SMTP_USER and SMTP_PASS to backend/.env");
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  return transport;
}
export async function sendOne(to: string, subject: string, html: string, textBody?: string) {
  const result = await getTransport().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER, to, subject, html,
    text: textBody || html.replace(/<[^>]*>/g, " ").replace(/\\s+/g, " ").trim()
  });
  return result.messageId;
}
export async function verifySmtp() { await getTransport().verify(); return true; }
