import "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"; // Import via CDN
// dotenv n'est plus accessible donc on met les accès en brut
const supabaseUrl = "https://xscrxkayspgegyjasnsm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY3J4a2F5c3BnZWd5amFzbnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMjY5NjUsImV4cCI6MjA1MTkwMjk2NX0.FV1NS80EK8F_-dZbBuie3T0Nby41poIwr7IRxWUp5Js";
//@ts-ignore: Import via CDN
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
export default supabaseClient; // Export de supabaseClient
