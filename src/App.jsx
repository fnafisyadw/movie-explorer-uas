import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovie = async () => {
    if (!query) return;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=564727fa&s=${query}`
    );
    const data = await res.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    document.title = "Movie Explorer App";
  }, []);

  return (
    <div className="container">
      <h1>🎬 Movie Explorer</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Cari film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovie}>Cari</button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="card">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;