import React from "react";

const Interested_list = ({ movies }) => {

  if (movies.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4">
        ⭐ Interested Movies
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar smooth-scroll">

        {movies.map((movie) => (
          <div
  key={movie.id}
  className="w-32 hover:scale-105 transition duration-300"
>
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    className="rounded-lg shadow-lg"
  />
</div>
        ))}

      </div>
    </div>
  );
};

export default Interested_list;
