import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {

            // Fetch movie details
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            );
            const data = await res.json();
            setMovie(data);

            // Fetch trailer videos
            const videoRes = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
            );
            const videoData = await videoRes.json();

            const trailer = videoData.results.find(
                (vid) =>
                    vid.type === "Trailer" &&
                    vid.site === "YouTube"
            );

            if (trailer) {
                setTrailerKey(trailer.key);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 rounded-full blur-lg bg-red-500 opacity-30"></div>
                </div>
                <p className="mt-6 text-gray-400 tracking-widest text-sm animate-pulse">
                    Loading Trailers...
                </p>
            </div>
        );


    return (
        <div className="relative text-white min-h-screen w-full overflow-hidden">

            {/* Backdrop */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat brightness-50"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                }}
            />
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-10">

                {/* Poster */}
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-66 rounded-xl shadow-2xl"
                />

                {/* Info */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                    <p className="italic text-gray-400 mb-4">
                        "{movie.tagline}"
                    </p>

                    <p className="text-yellow-400 text-lg mb-2">
                        ⭐ {movie.vote_average} / 10
                    </p>

                    <div className="flex flex-wrap gap-2 my-3">
                        {movie.genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-300 mb-2">
                        📅 {movie.release_date}
                    </p>

                    <p className="text-gray-300 mb-2">
                        ⏱ {movie.runtime} min
                    </p>

                    <p className="text-gray-200 max-w-2xl leading-relaxed">
                        {movie.overview}
                    </p>

                    {trailerKey && (
                        <button
                            onClick={() => setShowTrailer(true)}
                            className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
                        >
                            ▶ Watch Trailer
                        </button>
                    )}
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && trailerKey && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

                    <div className="relative w-[90%] md:w-[800px] aspect-video">

                        <iframe
                            className="w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            allowFullScreen
                        ></iframe>

                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute -top-10 right-0 text-white text-xl"
                        >
                            ✖
                        </button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default MovieDetail;
