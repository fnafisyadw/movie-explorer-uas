import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.log("Error fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies("barbie");
  }, []);

  return (
    <div className="container">
      <h1>💖 Barbie Movie Explorer 💖</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Cari film / series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchMovies(search)}
        />
        <button onClick={() => fetchMovies(search)}>Cari</button>
      </div>

      {loading && <p className="loading">Loading yaa... ✨</p>}

      <div className="grid">
        {movies.map((item) => (
          <div className="card" key={item.show.id}>
            <img
              src={
                item.show.image
                  ? item.show.image.medium
                  : "https://via.placeholder.com/210x295?text=No+Image"
              }
              alt={item.show.name}
            />
            <h3>{item.show.name}</h3>
            <p>{item.show.premiered}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;