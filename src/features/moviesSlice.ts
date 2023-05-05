import { createSlice, PayloadAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { ThunkAction} from 'redux-thunk';
import { RootState } from '../store';
import axios from "../axiosconfig";
import { Action } from 'redux';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MoviesState {
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  query: string;
  results: Movie[];
}

const initialState: MoviesState = {
  status: 'idle',
  error: null,
  query: '',
  results: [],
};


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.results = action.payload;
  },
}
})

export const { updateQuery, setMovies } = moviesSlice.actions

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const fetchMovies = (query: string): AppThunk => async (dispatch: Dispatch<AnyAction>,
   getState: () => RootState) => {
  try {
    const { data } = await axios.get(`/search/movie?query=${query}&page=1`);
    dispatch(setMovies(data.results));
  } catch (error) {
    console.error(error);
  }
};


export default moviesSlice.reducer;
