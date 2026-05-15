import React, { useState, useEffect } from "react";
import PlantCard from "./components/PlantCard";
import Search from "./components/Search"; 
import PlantForm from "./components/PlantForm";

function App() {
  const [plants, setPlants]         = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Task 1: Fetch all plants on load
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // Task 2: Add plant
  function handleAddPlant(newPlantData) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlantData),
    })
      .then((res) => res.json())
      .then((saved) => setPlants((prev) => [...prev, saved]));
  }

  // Task 3: Toggle stock (state only)
  function handleToggleInStock(id) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  }

  // Task 4: Filter for search
  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🌿 Plant Shop</h1>
      <PlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="plant-list">
        {displayedPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onToggleInStock={handleToggleInStock}
          />
        ))}
      </div>
    </div>
  );
}

export default App;