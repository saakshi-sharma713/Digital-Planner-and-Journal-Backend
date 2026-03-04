// controllers/calendarController.js
import { supabase } from "../Config/supabase.config.js";

// Get all events for a user
export const getEvents = async (req, res) => {
  try {
    const { id } = req?.user; // from frontend query param
    

    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", id)
      .order("start_datetime", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, start_datetime, background_color, text_color } = req.body;

    const { data, error: userError } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();

    if (userError) throw userError;
    console.log(data.email)
    const { data1,error } = await supabase
      .from("calendar_events")
      .insert([
        {
          user_id: id,
          title,
          start_datetime,
          reminder_time: null,        // 👈 No reminder initially
          reminder_sent: false,
          user_email: data.email,
          background_color: background_color || "#60a5fa",
          text_color: text_color || "#fff",
        },
      ]).select();

    if (error) throw error;

    res.status(201).json({ message: "Event created successfully" ,data1});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Update event
export const addReminder = async (req, res) => {
  try {
    const { reminder_option } = req.body;
    const eventId = req.params.id;

    const reminderMap = {
      "5min": 5,
      "30min": 30,
      "1hour": 60,
      "1day": 1440,
    };

    const minutes = reminderMap[reminder_option];
    if (!minutes) {
      return res.status(400).json({ message: "Invalid reminder option" });
    }

    // Fetch event
    const { data: eventData, error: fetchError } = await supabase
      .from("calendar_events")
      .select("start_datetime")
      .eq("id", eventId)
      .single();

    if (fetchError || !eventData) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ✅ Just parse normally (NO timezone hacks)
    const startDate = new Date(eventData.start_datetime);

    // Subtract reminder minutes
    const reminder_time = new Date(
      startDate.getTime() - minutes * 60 * 1000
    );

    // Update DB (store ISO → UTC)
    const { error: updateError } = await supabase
      .from("calendar_events")
      .update({
        reminder_time: reminder_time.toISOString(),
        reminder_sent: false,
      })
      .eq("id", eventId);

    if (updateError) throw updateError;

    res.json({ message: "Reminder added successfully 🔔", eventId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Event ID is required" });

    const { error } = await supabase.from("calendar_events").delete().eq("id", id);

    if (error) throw error;
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};