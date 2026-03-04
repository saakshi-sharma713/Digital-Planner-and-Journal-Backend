import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmail = async (to, title, time) => {
    const fullDate = new Date(time).toLocaleString();
    const [datePart,timePart] = fullDate.split(",")
  await resend.emails.send({
    from: "Daily Dock <onboarding@resend.dev>",
    to,
    subject: "Event Reminder ⏰",
    html: `
  <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:30px;">
    <div style="max-width:520px; margin:auto; background:#ffffff; padding:25px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

      <h2 style="color:#4f46e5; margin-top:0;">
        🔔 Event Reminder
      </h2>

      <p>
        Hi Buddy👋,
      </p>

      <p>
        Your event <strong>"${title}"</strong> is starting soon.
      </p>
       <p> Scheduled on: <strong>${datePart}</strong> </p>

      <div style="background:#eef2ff; padding:15px; border-radius:8px; margin:18px 0; font-size:15px;">
        🕒 Starts at: ${timePart}
      </div>

      <p style="font-weight:500;">
        Don’t miss it ⏰
      </p>

      <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

      <p style="font-size:13px; color:#777;">
        This reminder was sent automatically by Digital Planner & Journal.
      </p>

    </div>
  </div>
`,
  });
};