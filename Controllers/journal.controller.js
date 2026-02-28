

import { supabase } from "../Config/supabase.config.js";

export async function addJournal(req, res) {
  try {
    const { id } = req.user;
    const { content, media } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ message: "Content is required", status: false });
    }

    // Insert Journal
    const { data: journal, error } = await supabase
      .from("journal")
      .insert([{ content, user_id: id }])
      .select()
      .single();

    if (error) throw error;

    // Insert Media (if exists)
    if (media && media.length > 0) {
      const mediaData = media.map((item) => ({
        url: item.url,
        type: item.type,
        journal_id: journal.journal_id, // ✅ correct
      }));

      const { error: mediaError } = await supabase
        .from("journal_media")
        .insert(mediaData);

      if (mediaError) throw mediaError;
    }

    return res.json({
      message: "Journal Created Successfully",
      journal,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message, status: false });
  }
}

export async function getJournals(req, res) {
  try {
    const { id } = req.user;

    const { data, error } = await supabase
      .from("journal")
      .select(`
        *,
        journal_media (*)
      `)
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateJournal(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const { data, error } = await supabase
      .from("journal")
      .update({ content })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSingleJournal(req, res) {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from("journal")
      .select("*, journal_media(*)")
      .eq("journal_id", id)
      .maybeSingle();

    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: "Not found" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteJournal(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("journal")
      .delete()
      .eq("journal_id", id);

    if (error) throw error;

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}