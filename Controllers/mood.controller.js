import { supabase } from "../Config/supabase.config.js";


export async function addMood(req, res) {
  try {
    const { id } = req.user;
    const { mood_label, mood_emoji, mood_value, note, date } = req.body;

    if (!mood_label || !mood_emoji || !mood_value) {
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }

    const { data, error } = await supabase
      .from("daily_moods")
      .insert([
        {
          mood_label,
          mood_emoji,
          mood_value,
          note,
          user_id: id,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data[0]); // return inserted row directly
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


export async function deleteMood(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("daily_moods")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: "Mood Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getMood(req, res) {
  try {
    const {id} = req?.user;
    const { data, error } = await supabase.from("daily_moods").select("*").eq("user_id",id);
    if (error) throw error;

    return res.json(data); // ✅ return array directly
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}