// controllers/calendarController.js
import { supabase } from "../Config/supabase.config.js";

// Get all events for a user
export const getEvents = async (req, res) => {
  try {
    const { user_id } = req.query;
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user_id)
      .order("start_datetime", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new event
export const addEvent = async (req, res) => {
  try {
    const {id} = req.user
    const {  title, start_datetime, background_color, text_color } = req.body;

    const { data, error } = await supabase
      .from("calendar_events")
      .insert([
        {
          user_id:id,
          title,
          start_datetime,
          background_color: background_color || "#60a5fa",
          text_color: text_color || "#fff",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start_datetime, background_color, text_color } = req.body;

    const { data, error } = await supabase
      .from("calendar_events")
      .update({
        title,
        start_datetime,
        background_color,
        text_color,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("calendar_events").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};