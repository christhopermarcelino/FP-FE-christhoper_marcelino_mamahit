import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { changeSearch, changeMovies, changeLoading } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DEFAULT_MOVIE_NAME = "harry%20potter";

export default function Navbar({ onInputChange, onSearchSubmit }) {
  const [searchName, setSearchName] = useState("");
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchOnChange = (e) => {
    setSearchName(e.target.value);
  };

  const getMoviedata = async (e) => {
    e.preventDefault();
    try {
      const movieName = search || DEFAULT_MOVIE_NAME;
      dispatch(changeLoading(true));
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&s=${movieName}&page=1`
      );
      const jsonData = await data.json();
      dispatch(changeSearch(searchName));
      dispatch(changeMovies(jsonData));
      dispatch(changeLoading(false));
      navigate("/");
    } catch (err) {
      // show error toast
    }
  };

  return (
    <nav className="navbar bg-dark navbar-dark" data-bs-theme="dark">
      <div className="container">
        <a href="/" className="navbar-brand fw-bold">
          bri21
        </a>

        <div className="d-flex gap-2">
          <SearchBar
            value={searchName}
            onInputChange={handleSearchOnChange}
            onSearchSubmit={getMoviedata}
          />
        </div>
      </div>
    </nav>
  );
}
