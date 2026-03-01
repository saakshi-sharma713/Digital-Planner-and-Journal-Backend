import { supabase } from "../Config/supabase.config.js";


// Get all habits
export const getHabits = async (req, res) => {
  try {
    const {id} = req?.user;
    const { data, error } = await supabase.from("habits").select("*").eq("user_id",id);
    if (error) {
      console.log("Supabase GET error:", error);
      throw error;
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Add a new habit
export const addHabit = async (req, res) => {
  try {
    const {id} = req.user;
    const { habit_name } = req.body;
    if (!habit_name) return res.status(400).json({ message: "Habit name required" });

    const { data, error } = await supabase.from("habits").insert([{ habit_name ,user_id:id}]);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update habit completion
export const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed_days } = req.body; // array of dates

    const { data, error } = await supabase
      .from("habits")
      .update({ completed_days })
      .eq("id", id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete habit
export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("habits").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};