import { supabase } from "../Config/supabase.config.js";



export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id

    // Todos
    const { data: todos } = await supabase
      .from("todos")
      .select("status")
      .eq("user_id", userId)

    const totalTasks = todos.length
    const completedTasks = todos.filter(t => t.status).length

    // Goals
    const { data: goals } = await supabase
      .from("goals")
      .select("progress")
      .eq("user_id", userId)

    const activeGoals = goals.filter(g => g.progress < 100).length

    // Mood (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: moods } = await supabase
      .from("daily_moods")
      .select("mood_value")
      .eq("user_id", userId)
      .gte("created_at", sevenDaysAgo.toISOString())

    const avgMood =
      moods.length > 0
        ? moods.reduce((a, b) => a + b.mood_value, 0) / moods.length
        : 0

    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    res.json({
      totalTasks,
      completedTasks,
      activeGoals,
      avgMood: Number(avgMood.toFixed(1)),
      completionRate: Number(completionRate.toFixed(1))
    })

  } catch (err) {
    res.status(500).json({ error: "Failed to load summary" })
  }
}

//
// 2️⃣ Tasks Over Time
//
export const getTasksTrend = async (req, res) => {
  try {
    const userId = req.user.id

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data } = await supabase
      .from("todos")
      .select("created_at")
      .eq("user_id", userId)
      .eq("status", true)
      .gte("created_at", sevenDaysAgo.toISOString())

    const grouped = {}

    data.forEach(task => {
      const date = new Date(task.created_at)
        .toISOString()
        .split("T")[0]

      grouped[date] = (grouped[date] || 0) + 1
    })

    const result = Object.keys(grouped)
      .sort()
      .map(date => ({
        date,
        completed: grouped[date]
      }))

    res.json(result)

  } catch {
    res.status(500).json({ error: "Failed to load tasks trend" })
  }
}
//
// 3️⃣ Mood Trend
//
export const getMoodTrend = async (req, res) => {
  try {
    const userId = req.user.id

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data } = await supabase
      .from("daily_moods")
      .select("created_at, mood_value")
      .eq("user_id", userId)
      .gte("created_at", sevenDaysAgo.toISOString())

    const grouped = {}

    data.forEach(entry => {
      const date = new Date(entry.created_at)
        .toISOString()
        .split("T")[0]

      if (!grouped[date]) {
        grouped[date] = { total: 0, count: 0 }
      }

      grouped[date].total += entry.mood_value
      grouped[date].count += 1
    })

    const result = Object.keys(grouped)
      .sort()
      .map(date => ({
        date,
        mood: Number(
          (grouped[date].total / grouped[date].count).toFixed(1)
        )
      }))

    res.json(result)

  } catch {
    res.status(500).json({ error: "Failed to load mood trend" })
  }
}
//
// 4️⃣ Goals Progress
//
export const getGoalsProgress = async (req, res) => {
  try {
    const userId = req.user.id

    const { data } = await supabase
      .from("goals")
      .select("id, goal_name, progress")
      .eq("user_id", userId)

    res.json(data)

  } catch {
    res.status(500).json({ error: "Failed to load goals" })
  }
}