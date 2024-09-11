import "./index.css";

export default function MovieCard({ poster, title, year, href, className }) {
  return (
    <a
      key={title}
      href={href}
      className={`card position-relative rounded-0 mb-2 text-decoration-none h-100 border-0 shadow-sm ${className}`}
    >
      <div className="card-body p-0">
        <img src={poster} alt={title} className="w-100 h-100" />
      </div>
      <div className="overlay w-100 h-100 position-absolute start-0 end-0 top-0 bottom-0 bg-black"></div>
      <div className="card-footer position-absolute bg-transparent start-0 end-0 bottom-0 fw-medium border-top-0">
        <p className="text-center text-white p-0 m-0 fs-6">{title}</p>
        <p className="text-center text-white p-0 m-0 fs-6">({year})</p>
      </div>
    </a>
  );
}
