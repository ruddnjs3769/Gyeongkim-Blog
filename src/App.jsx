import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rnqqmvmlbgixiztfimpc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucXFtdm1sYmdpeGl6dGZpbXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzI2NzcsImV4cCI6MjAyNzgwODY3N30.03aBa8uHAJqom8LW0JHVpJ7E7zv-_wig7tursnJckmY"
);

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
