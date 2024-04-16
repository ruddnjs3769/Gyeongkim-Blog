import { useEffect, useState } from "react";
import supabase from "@/supabase";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    if (data) {
      setCountries(data);
    } else {
      console.error("No data received from Supabase");
      setCountries([{ name: "No data received from Supabase" }]);
    }
  }

  return (
    <ol>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ol>
  );
}

export default App;
