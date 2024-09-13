import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

export default function Pagination({ movies, page }) {
  const [maxPage, setMaxPage] = useState(1);

  const getMaxPage = () => {
    setMaxPage(Math.ceil((movies?.totalResults ?? 0) / 10));
  };

  useEffect(() => {
    getMaxPage();
  }, []);

  const getLeftValue = () => {
    return page >= maxPage ? maxPage - 2 : page <= 1 ? 1 : Number(page) - 1;
  };

  const getMiddleValue = () => {
    return page > 1 && page < maxPage ? page : page <= 1 ? 2 : maxPage - 1;
  };

  const getRightValue = () => {
    return page <= 1 ? 3 : page >= maxPage ? maxPage : Number(page) + 1;
  };

  const getPreviousValue = () => {
    return page > 1 ? Number(page) - 1 : 1;
  };

  const getNextValue = () => {
    return page < maxPage ? Number(page) + 1 : maxPage;
  };

  const getCurrentShowRange = () => {
    const from = (page - 1) * 10 + 1;
    const to = (page - 1) * 10 + movies.Search.length;
    return `${from} - ${to}`;
  };

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
      <p>
        Showing {getCurrentShowRange()} of {movies?.totalResults ?? 0} movies
      </p>
      <nav>
        <ul className="pagination">
          {/* PREVIOUS */}
          {/* aktif, jika page > 1, else disabled */}
          {/* href ke page - 1 jika page > 1, else 1 */}
          <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
            <Link className="page-link" to={`/?page=${getPreviousValue()}`}>
              Previous
            </Link>
          </li>

          {/* LEFT */}
          {/* aktif jika page == 1 */}
          {/* bernilai page - 1 jika page > 1, else 1 */}
          {/* jika page >= maxPage, bernilai maxPage - 2, else if page <= 1, bernilai 1, else page - 1 */}
          <li className={`page-item ${page == 1 ? "active" : ""}`}>
            <Link className="page-link" to={`/?page=${getLeftValue()}`}>
              {getLeftValue()}
            </Link>
          </li>
          {/* MIDDLE */}
          {/* aktif jika page != 1 && page != maxPage */}
          {/* jika page > 1  && page < maxPage, bernilai page, else if page <= 1, bernilai 2, else maxPage */}
          <li
            className={`page-item ${
              page != 1 && page != maxPage ? "active" : ""
            }`}
          >
            <Link className="page-link" to={`/?page=${getMiddleValue()}`}>
              {getMiddleValue()}
            </Link>
          </li>
          {/* RIGHT */}
          {/* aktif jika page == maxPage */}
          {/* jika page <= 1, bernilai 3, else if page >= maxPage, bernilai maxPage, else page + 1 */}
          <li className={`page-item ${page == maxPage ? "active" : ""}`}>
            <Link className="page-link" to={`/?page=${getRightValue()}`}>
              {getRightValue()}
            </Link>
          </li>
          {/* NEXT */}
          {/* aktif, jika page < maxPage, else disabled */}
          {/* href ke page + 1 jika page < maxPage, else maxPage */}
          <li className={`page-item ${page >= maxPage ? "disabled" : ""}`}>
            <Link className="page-link" to={`/?page=${getNextValue()}`}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
