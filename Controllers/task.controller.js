import { supabase } from "../Config/supabase.config.js";

export async function addTodo(req, res) {
    try {
        const {id } = req.user
        const { title, priority, type, due_date } = req.body;
        if (!title || !priority || !type || !due_date) {
            return res.status(400).json({ message: "All Fields are required", status: false })
        }
        const { data, error } = await supabase.from("todos").insert([{ title, priority, type, due_date, user_id:id }]).select().single();
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        return res.json({ message: "Todo Created SuccessFully", data, status: true })
    }
    catch (error) {

        return res.status(500).json({ error: error.message, status: false })
    }

}


export async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const { data, error } = await supabase.from("todos").update({ title, status }).eq("id", id).select().single();
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        return res.json({ message: "Todo Updated SuccessFully", data, status: true })
    }
    catch (error) {

        return res.status(500).json({ error: error.message, status: false })
    }
}


export async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: "Todo Deleted Successfully",
      data,
      status: true,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      status: false,
    });
  }
}

export async function getTodo(req, res) {
    try {
        const { id } = req.params;

        const { data, error } = await supabase.from("todos").select("*").eq("user_id", id);
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        if (data.length == 0) {
            return res.json({ message: "No tasks Found", data });
        }
        return res.json({ message: "Task List", data, status: true });
    }

    catch (error) {

        return res.status(500).json({ error: error.message, status: false })
    }
}

export async function searchTodos(req, res) {
    try {
        const { id } = req.user;
        const { priority, type, status } = req.query;

        console.log("Params:", req.params);
console.log("Query:", req.query);

        let query = supabase.from("todos").select("*").eq("user_id", id);

        if (priority) {
            query = query.eq("priority", priority.toLowerCase());
        }
        if (type) {
            query = query.eq("type", type.toLowerCase());
        }
        if (status !== undefined) {
            query = query.eq("status", status === "true");
        }

        const { data, error } = await query;
       
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(200).json({ message: "No tasks found", data: [] });
        }

        return res.status(200).json({ message: "Filtered Task List", data, status: true });

    } catch (error) {
        return res.status(500).json({ error: error.message, status: false });
    }
}

export const getAllTodos = async (req, res) => {
  try {
    const {id} = req?.user;
    const { data, error } = await supabase.from("todos").select("*").eq("user_id",id);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
