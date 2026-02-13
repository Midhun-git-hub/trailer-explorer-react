import React from 'react'
import Movie_card from './Movie_card';
import { MdOutlineNewReleases } from "react-icons/md";

const Movie_list = ({ movies, loading , onMovieClick }) => {

    if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-62 mt-15 bg-gray-800 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-12">

      {/* Heading */}
      <h2 className="flex items-center gap-2 text-xl font-bold whitespace-nowrap mb-10">
        <MdOutlineNewReleases className="text-red-500 text-2xl" />
        Now Playing !!
      </h2>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {movies.map((movie) => (
          <Movie_card
            key={movie.id}
            movie={movie}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>

    </div>
  );
};

export default Movie_list;
