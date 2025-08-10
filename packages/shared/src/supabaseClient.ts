import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = (url?: string, key?: string) => {
  if (!url || !key) {
    throw new Error("Supabase URL and key are required");
  }
  return createClient(url, key);
};
