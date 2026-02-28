import { supabase } from "../Config/supabase.config.js";

export async function checkConnection() {
  const { data, error } = await supabase
    .from("users")
    .select()
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error("Connection error:", error.message);
    return false;
  }

  return true;
}