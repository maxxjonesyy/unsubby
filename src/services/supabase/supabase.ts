import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function handleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
      },
      scopes: import.meta.env.VITE_G_SCOPES,
    },
  });
}

async function handleLogout() {
  await supabase.auth.signOut({ scope: "global" });
}

export { supabase, handleLogin, handleLogout };
