import { createSupabaseClient } from '@shared/shared/src/supabaseClient';

let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return supabaseClient;
};

export default getSupabaseClient();
