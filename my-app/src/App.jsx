import { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // LOAD PLANTS ON START
  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // FORM INPUT CHANGE
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ADD PLANT
  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      ...formData,
      id: Date.now(),
      inStock: true,
    };

    setPlants((prev) => [...prev, newPlant]);

    setFormData({
      name: "",
      image: "",
      price: "",
    });
  }

  // TOGGLE SOLD OUT
  function toggleSoldOut(id) {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id
          ? { ...plant, inStock: !plant.inStock }
          : plant
      )
    );
  }

  // SEARCH FILTER
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>
          Plantsy <span className="logo">🌱</span>
        </h1>
      </header>

      <main>
        {/* FORM */}
        <div className="new-plant-form">
          <h2>New Plant</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Plant name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              type="text"
              value={formData.image}
              onChange={handleChange}
            />

            <input
              name="price"
              placeholder="Price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />

            <button type="submit">Add Plant</button>
          </form>
        </div>

        {/* SEARCH */}
        <div className="searchbar">
          <label htmlFor="search">Search Plants:</label>

          <input
            id="search"
            placeholder="Type a name to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* PLANT LIST */}
        <ul className="cards">
          {filteredPlants.map((plant) => (
            <li
              key={plant.id}
              data-testid="plant-item"
              className={plant.inStock ? "" : "sold-out"}
              onClick={() => toggleSoldOut(plant.id)}
            >
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>${plant.price}</p>
              <p>{plant.inStock ? "In Stock" : "Sold Out"}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;