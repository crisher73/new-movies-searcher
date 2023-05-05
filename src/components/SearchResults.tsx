import { useEffect,  } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import { RootState, store} from '../store';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const SearchResults = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const movies = useSelector((state:RootState ) => state.movies.results);

  useEffect(() => {
    dispatch(fetchMovies(query));
  }, [dispatch, query]);
  

  return (
    <ul className="grid grid-cols-4 gap-x-8 gap-y-12 my-8 m-4">
      {movies.map((movie: Movie) => (
        <li key={movie.id} className="border border-transparent rounded-lg overflow-hidden shadow-lg">
          <Link to={`/movie/${movie.id}`}>
            <div className="w-full h-56">
              <img
                className="object-cover w-full h-full"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
              />
            </div>
            <div className="px-4 py-2">
              <h2 className="text-lg font-medium mb-2">{movie.title}</h2>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
