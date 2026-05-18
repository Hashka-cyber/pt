import { useState } from "react";

function PlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: name,
      image: image,
      price: parseFloat(price),
      soldOut: false,
    };

    onAddPlant(newPlant);

    // Clear form
    setName("");
    setImage("");
    setPrice("");
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Plant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Add Plant</button>
    </form>
  );
}

export default PlantForm;