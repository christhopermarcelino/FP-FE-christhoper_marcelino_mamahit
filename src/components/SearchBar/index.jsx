export default function SearchBar({ onInputChange, onSearchSubmit, value }) {
  return (
    <form className="d-flex" role="search" onSubmit={onSearchSubmit}>
      <input
        value={value}
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
  );
}
