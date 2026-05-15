import React, { useState } from "react";

function PlantForm({ onAddPlant }) {
  const [name, setName]   = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlant({ name, image, price: parseFloat(price) });
    setName(""); setImage(""); setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name}  onChange={(e) => setName(e.target.value)}  placeholder="Plant name" />
      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default PlantForm; // ← one export per file