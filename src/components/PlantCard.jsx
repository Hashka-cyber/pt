import { useState } from "react";

function PlantCard({ plant }) {
  const [soldOut, setSoldOut] = useState(plant.soldOut);

  function handleSoldOut() {
    setSoldOut(true);
  }

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />

      <h2>{plant.name}</h2>

      <p>${plant.price}</p>

      {soldOut ? (
        <button disabled>Sold Out</button>
      ) : (
        <button onClick={handleSoldOut}>Mark as Sold Out</button>
      )}
    </div>
  );
}

export default PlantCard;