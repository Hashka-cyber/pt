import React from "react";

function PlantCard({ plant, onToggleInStock }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>Price: ${plant.price}</p>
      <p>{plant.inStock ? "In Stock ✅" : "Out of Stock ❌"}</p>
      <button onClick={() => onToggleInStock(plant.id)}>
        {plant.inStock ? "Mark Out of Stock" : "Mark In Stock"}
      </button>
    </div>
  );
}

export default PlantCard;