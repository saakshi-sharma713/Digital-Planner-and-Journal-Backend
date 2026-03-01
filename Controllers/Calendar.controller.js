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
    const {id} = req?.user;
    const { title, start_datetime, background_color, text_color } = req.body;

    console.log("AddEvent payload:", { id, title, start_datetime }); // DEBUG

    if (!id || !title || !start_datetime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("calendar_events")
      .insert([{
        user_id:id,
        title,
        start_datetime,
        background_color: background_color || "#60a5fa",
        text_color: text_color || "#fff",
      }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error("AddEvent error:", err);
    res.status(500).json({ error: err.message });
  }
};
// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, start_datetime, background_color, text_color } = req.body;

    if (!id) return res.status(400).json({ error: "Event ID is required" });

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
    if (!id) return res.status(400).json({ error: "Event ID is required" });

    const { error } = await supabase.from("calendar_events").delete().eq("id", id);

    if (error) throw error;
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};