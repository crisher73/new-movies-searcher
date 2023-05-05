import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuery } from "../features/moviesSlice";
import { useNavigate } from 'react-router';
import { RootState } from '../store';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Search = () => {
  const query = useSelector((state: RootState) => state.movies.query);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/results?query=${query}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateQuery(e.target.value));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="font-bold text-4xl mb-2">Movies Searcher</h2>
        <h3 className="font-medium text-lg mb-6">Find your favorite movies with us</h3>
        <form onSubmit={searchMovies} className="bg-white rounded-full shadow-lg flex items-center px-4 py-2 border border-gray-300">
          <input
            type="text"
            placeholder="Search for a movie"
            value={query}
            onChange={handleInputChange}
            className="rounded-l-full w-full text-gray-700 px-2 py-1 border focus:outline-none focus:ring focus:border-blue-300"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors ease-in-out duration-300">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;


