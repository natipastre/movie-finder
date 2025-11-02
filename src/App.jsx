import { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

const API_KEY = "37990e474c274b83ac39540bedbd783d";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("movie");

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/${type}`,
        {
          params: {
            api_key: API_KEY,
            query: query,
            language: "pt-BR",
          },
        }
      );

      const results = res.data.results;

      if (results.length === 0) {
        setError("Nenhum resultado encontrado 😕");
        setMovies([]);
        return;
      }

      setMovies(results);
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1>🎬 Movie Finder</h1>
      <p className="subtitle">
         Encontre filmes e séries com trailers e sinopses
      </p>

      <div className="options">
        <label>
          <input
            type="radio"
            name="type"
            value="movie"
            checked={type === "movie"}
            onChange={() => setType("movie")}
          />
          Filmes
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="tv"
            checked={type === "tv"}
            onChange={() => setType("tv")}
          />
          Séries
        </label>
      </div>

      <SearchBar query={query} setQuery={setQuery} onSearch={searchMovies} />

      {loading && <p className="status">Carregando...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} apiKey={API_KEY} />
        ))}
      </div>

      <footer className="footer">
        <p>
          © 2025 | <span className="name">Natália Pastre</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
