import { Link } from "react-router-dom";

import "./index.css";
import { isValueExists } from "src/libs/helper";

export default function MovieCard({ poster, title, year, href, className }) {
  return (
    <Link
      key={title}
      to={href}
      className={`card position-relative rounded-0 mb-2 text-decoration-none h-100 border-0 shadow-sm bg-dark ${className}`}
    >
      <div className="card-body p-0">
        <img
          src={isValueExists(poster) ? poster : "/assets/images/no-picture.png"}
          alt={title}
          className="w-100 h-100"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/images/no-picture.png";
          }}
        />
      </div>
      <div className="overlay w-100 h-100 position-absolute start-0 end-0 top-0 bottom-0 bg-black"></div>
      <div className="card-footer position-absolute bg-transparent start-0 end-0 bottom-0 fw-medium border-top-0">
        <p className="text-center text-white p-0 m-0 fs-6">{title}</p>
        <p className="text-center text-white p-0 m-0 fs-6">({year})</p>
      </div>
    </Link>
  );
}
