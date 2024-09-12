import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { changeSearch, changeMovies } from "../../store/action";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onInputChange, onSearchSubmit }) {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchOnChange = (e) => {
    dispatch(changeSearch(e.target.value));
  };

  const getMoviedata = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&s=${search}&page=1`
      );
      const jsonData = await data.json();
      navigate("/");
      dispatch(changeMovies(jsonData));
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
            value={search}
            onInputChange={handleSearchOnChange}
            onSearchSubmit={getMoviedata}
          />
        </div>
      </div>
    </nav>
  );
}
