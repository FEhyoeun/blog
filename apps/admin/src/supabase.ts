import { createSupabaseClient } from "@shared/shared/src/supabaseClient";

const supabaseClient = createSupabaseClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabaseClient;
