import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from './components/Search';
import SearchResults from "./components/SearchResults";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search/>}/>
        <Route path="/results" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
