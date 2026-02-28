import { supabase } from "../Config/supabase.config.js";

// Get all goals
export const getGoals = async (req, res) => {
  try {
    const {id} = req?.user;
    const { data, error } = await supabase.from("goals").select("*").eq("user_id",id);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add a goal
export const addGoal = async (req, res) => {
  try {
    const {id} = req?.user
     const { goal_name, category, target_date } = req.body;
    if (!goal_name || !category)
      return res.status(400).json({ message: "Missing fields" });

    const { data, error } = await supabase
      .from("goals")
      .insert([{ goal_name, category, target_date, progress: 0,user_id:id }])
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update goal progress
export const updateGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const { progress } = req.body;

    if (!goalId)
      return res.status(400).json({ message: "Invalid request" });

    const { data, error } = await supabase
      .from("goals")
      .update({ progress })
      .eq("id", goalId)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete goal
export const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    if (!goalId) return res.status(400).json({ message: "Invalid goal ID" });

    const { error } = await supabase.from("goals").delete().eq("id", goalId);
    if (error) throw error;

    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};