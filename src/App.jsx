import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const handleSearchOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonOnSubmit = (e) => {
    e.preventDefault();

    getMoviedata();
  };

  const getMoviedata = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&s=${search}&page=${page}`
      );
      const jsonData = await data.json();
      setData(jsonData);
    } catch (err) {
      // show error toast
    }
  };

  return (
    <div className="App bg-light">
      <Navbar
        onInputChange={handleSearchOnChange}
        onSearchSubmit={handleSearchButtonOnSubmit}
      />
      <main className="container py-4 min-vh-100">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
      </main>
      <Footer />
    </div>
  );
}

export default App;
