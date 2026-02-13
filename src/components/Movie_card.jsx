import React from "react";
import { useNavigate } from "react-router-dom";

const Movie_card = ({ movie , onMovieClick}) => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      {/* Poster */}
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
        className="w-40 h-60 object-cover"
      />

      {/* Info Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-bold mb-1">
            {movie.title}
          </h2>

          <p className="text-sm text-yellow-400 mb-2">
            ⭐ {movie.vote_average}
          </p>

          <p className="text-gray-400 text-sm line-clamp-3">
            {movie.overview}
          </p>
        </div>

        <button
          onClick={() => {
            onMovieClick(movie);
            navigate(`/movie/${movie.id}`);
          }}
          className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Movie_card;
