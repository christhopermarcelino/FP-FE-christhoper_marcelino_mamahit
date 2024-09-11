export default function Navbar({ onInputChange, onSearchSubmit }) {
  return (
    <nav className="navbar bg-dark navbar-dark" data-bs-theme="dark">
      <div className="container">
        <a href="/" className="navbar-brand fw-bold">
          bri21
        </a>

        <div className="d-flex gap-2">
          <form className="d-flex" role="search" onSubmit={onSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={onInputChange}
            />
            <button className="btn btn-light fw-medium" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
