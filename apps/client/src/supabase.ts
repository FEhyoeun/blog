import { createSupabaseClient } from '@shared/shared/src/supabaseClient';

const supabaseClient = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabaseClient;
