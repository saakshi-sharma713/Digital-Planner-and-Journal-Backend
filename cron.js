import cron from "node-cron";

import { sendReminderEmail } from "./utils/sendEmail.utils.js";
import { supabase } from "./Config/supabase.config.js";

cron.schedule("* * * * *", async () => {
  console.log("Checking reminders...");

  const now = new Date().toISOString();
  const { data: events, error } = await supabase
    .from("calendar_events")
    .select("*")
    .lte("reminder_time", now)
    .eq("reminder_sent", false);

  if (error) {
    console.log("Cron error:", error);
    return;
  }

  for (let event of events) {
    try {
      await sendReminderEmail(
        event.user_email,
        event.title,
        event.start_datetime
      );

      await supabase
        .from("calendar_events")
        .update({ reminder_sent: true })
        .eq("id", event.id);

      console.log("Reminder sent for:", event.title);

    } catch (err) {
      console.log("Email error:", err);
    }
  }
});