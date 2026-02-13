import React, { useState, useEffect } from "react";
import Movie_list from "./components/Movie_list";
import Interested_list from "./components/Interested_list";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Pagination from '@mui/material/Pagination';

import Stack from '@mui/material/Stack';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [clickCount, setClickCount] = useState({});
  const [interestedMovies, setInterestedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setMovies(data.results);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, [page]);
  

  // pagination logic
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleMovieClick = (movie) => {
    setClickCount((prev) => {
      const updatedClicks = (prev[movie.id] || 0) + 1;

      if (updatedClicks === 3) {
        setInterestedMovies((prevInterested) => {
          const alreadyExists = prevInterested.some(
            (m) => m.id === movie.id
          );

          if (!alreadyExists) {
            return [...prevInterested, movie];
          }

          return prevInterested;
        });
      }

      return {
        ...prev,
        [movie.id]: updatedClicks,
      };
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-white">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-8">
                <Interested_list movies={interestedMovies} />
                <Movie_list
                  movies={movies}
                  loading={loading}
                  onMovieClick={handleMovieClick}
                />
              </div>
            }
          />
          <Route
            path="/movie/:id"
            element={<MovieDetail movies={movies} />}
          />
        </Routes>
        {location.pathname === "/" && (
          <div className="flex justify-center items-center h-15 bg-gray-950 p-4 shadow-md rounded-t-lg">
            <Stack spacing={2}>
              <Pagination
                count={500}
                page={page}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": { color: "white" },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#2563eb",
                    color: "white",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#374151",
                  },
                }}
              />
            </Stack>
          </div>
        )}

      </div>
    </>
  );
};

export default App;
