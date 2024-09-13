import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "src/pages/Home";
import Movie from "src/pages/Movie";
import NotFound from "src/pages/NotFound";

import Navbar from "src/components/Navbar";
import Footer from "src/components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-light">
        <Navbar />
        <main className="container py-5 min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:imdbID" element={<Movie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
