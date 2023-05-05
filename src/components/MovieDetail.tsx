import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosconfig";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieParams {
  id: string;
}

const MovieDetail = () => {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams<string>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`/movie/${id}`);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
    <div className="max-w-screen-lg w-full px-4 grid grid-cols-2 gap-x-4 gap-y-8 bg-white rounded-lg shadow-xl">
      <img
        className="w-64 p-4"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Poster for ${movie.title}`}
      />
      <div className="flex flex-col justify-center ml-4">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-gray-500 text-lg">{movie.overview}</p>
        <p className="text-gray-500 text-lg mb-2">Release Date: {movie.release_date}</p>
        <p className="text-gray-500 text-lg mb-4">Rating: {movie.vote_average}</p>
      </div>
    </div>
  </div>
  );
};

export default MovieDetail;

