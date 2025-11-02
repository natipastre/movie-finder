import { useEffect, useState } from "react";
import axios from "axios";

function MovieCard({ movie, type, apiKey }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=Sem+Imagem";

  const title = movie.title || movie.name;
  const year =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || "";

  const overview =
    movie.overview && movie.overview.length > 120
      ? movie.overview.slice(0, 120) + "..."
      : movie.overview || "Sem sinopse disponível.";

  // 🔍 Busca trailer no YouTube da API do TMDb
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${movie.id}/videos`,
          {
            params: {
              api_key: apiKey,
              language: "pt-BR",
            },
          }
        );

        const trailer = res.data.results.find(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser")
        );

        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Erro ao carregar trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie.id, type, apiKey]);

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} />

      <div className="movie-info">
        <h3>{title}</h3>
        {year && <p className="year">{year}</p>}
        <p className="overview">{overview}</p>

        {trailerKey ? (
          <>
            <button
              className="trailer-btn"
              onClick={() => setShowTrailer(!showTrailer)}
            >
              {showTrailer ? "Fechar Trailer" : "Ver Trailer 🎬"}
            </button>

            {showTrailer && (
              <div
                style={{
                  marginTop: "1rem",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={title}
                  allowFullScreen
                  style={{
                    border: "none",
                  }}
                ></iframe>
              </div>
            )}
          </>
        ) : (
          <p className="no-trailer">🎞️ Trailer não disponível</p>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
