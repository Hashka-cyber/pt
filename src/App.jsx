import { useEffect, useState } from "react";
import "./App.css";

import PlantCard from "./components/PlantCard";
import PlantForm from "./components/PlantForm";
import Search from "./components/Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch plants on page load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Add new plant
  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((addedPlant) => {
        setPlants([...plants, addedPlant]);
      });
  }

  // Filter plants
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>🌱 Plant Shop</h1>

      <Search search={search} setSearch={setSearch} />

      <PlantForm onAddPlant={handleAddPlant} />

      <div className="plant-container">
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}

export default App;