import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rnqqmvmlbgixiztfimpc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucXFtdm1sYmdpeGl6dGZpbXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzI2NzcsImV4cCI6MjAyNzgwODY3N30.03aBa8uHAJqom8LW0JHVpJ7E7zv-_wig7tursnJckmY"
);

export default supabase;
