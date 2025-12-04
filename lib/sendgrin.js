import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.OUTBOUND_FROM_EMAIL;
const REPLY_TO_EMAIL = process.env.OUTBOUND_REPLY_TO_EMAIL || FROM_EMAIL;

if (!SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set – emails will not be sent");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendSystemEmail({ to, subject, text }) {
  if (!SENDGRID_API_KEY) {
    console.warn("Cannot send email – SENDGRID_API_KEY missing");
    return;
  }

  const msg = {
    to,
    from: FROM_EMAIL,
    replyTo: REPLY_TO_EMAIL,
    subject,
    text
  };

  await sgMail.send(msg);
}
