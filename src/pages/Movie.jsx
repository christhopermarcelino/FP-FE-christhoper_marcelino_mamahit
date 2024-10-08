import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";

import { changeError, changeLoading } from "src/store/action";
import { isValueExists } from "src/libs/helper";
import MovieCard from "src/components/MovieCard";
import Loading from "src/components/Loading";
import Error from "src/components/Error";

const MOVIE_DETAIL_KEYS = [
  "Genre",
  "Writer",
  "Actors",
  "Language",
  "Country",
  "Released",
];

export default function Movie() {
  const [movie, setMovie] = useState({});
  const { imdbID } = useParams();
  const isLoading = useSelector((state) => state.isLoading);
  const { movies, isError } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getMoviedata();
  }, [imdbID]);

  const getMoviedata = async () => {
    try {
      dispatch(changeLoading(true));
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&i=${imdbID}&plot=full`
      );
      const jsonData = await data.json();
      setMovie(jsonData);
      dispatch(changeError(false));
      dispatch(changeLoading(false));
    } catch (err) {
      dispatch(changeError(true));
    }
  };

  const formatCommaToMiddleDot = (items) => {
    if (items === "N/A") {
      return "-";
    }
    return items.split(",").join(" · ");
  };

  if (isError) {
    return <Error text="Unable to retrieve data" />;
  }

  if (movie?.Response === "False") {
    return <Error text={movie.Error} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="row placeholder-glow">
            <div className="col-6 col-lg-3 mx-auto mb-3 mb-lg-0">
              <img
                src={
                  isValueExists(movie?.Poster)
                    ? movie?.Poster
                    : "/assets/images/no-picture.png"
                }
                alt={movie?.Title}
                className="img-fluid"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/no-picture.png";
                }}
              />
            </div>
            <div className="col-lg-9">
              <h1 className="fw-bold">{movie?.Title}</h1>
              <div className="d-flex gap-2 mb-3">
                {isValueExists(movie?.Type) && (
                  <span className="badge text-bg-dark d-flex justify-content-center align-items-center">
                    {movie?.Type}
                  </span>
                )}
                {isValueExists(movie?.Year) && <span>{movie?.Year}</span>}
                {isValueExists(movie?.Runtime) && (
                  <>
                    &#183;<span>{movie?.Runtime}</span>
                  </>
                )}
                {isValueExists(movie?.Rated) && (
                  <>
                    &#183;
                    <span>{movie?.Rated}</span>
                  </>
                )}
              </div>
              {isValueExists(movie?.Plot) && <p>{movie?.Plot}</p>}
              <div className="table-responsive">
                <table className="table w-auto">
                  <tbody>
                    {MOVIE_DETAIL_KEYS.map((key) => (
                      <tr key={key}>
                        <th className="bg-transparent">{key}</th>
                        <td className="bg-transparent">
                          {formatCommaToMiddleDot(movie?.[key] ?? "-")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {isValueExists(movie?.Awards) && (
            <div className="row mt-4">
              <div className="col">
                <div
                  className="alert alert-dark mb-0 d-flex align-items-center gap-2"
                  role="alert"
                >
                  <FaMedal />
                  <span>{movie?.Awards}</span>
                </div>
              </div>
            </div>
          )}

          {isValueExists(movie?.imdbRating) && (
            <div className="row mt-4 row-gap-2">
              <h3 className="fs-4">Ratings</h3>
              <div className="col-sm-6 col-md-4 col-lg-3 px-2">
                <div className="border rounded py-3 px-4">
                  <div className="d-flex align-items-center gap-2">
                    <MdOutlineStar className="text-warning" />
                    <span>{movie?.imdbRating}</span>
                  </div>
                  <p className="mb-0">IMDb</p>
                </div>
              </div>

              {isValueExists(movie?.Ratings) &&
                (movie?.Ratings ?? []).map((rating) => (
                  <div
                    key={rating.Source}
                    className="col-sm-6 col-md-4 col-lg-3 px-2"
                  >
                    <div className="border rounded py-3 px-4">
                      <div className="d-flex align-items-center gap-2">
                        <MdOutlineStar className="text-warning" />
                        <span>{rating.Value}</span>
                      </div>
                      <p className="mb-0">{rating.Source}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {movies?.Search && (
            <div className="row mt-5 row-gap-2">
              <h3 className="fs-4">Recommended for you</h3>
              {(movies?.Search ?? []).map((movie, index) => {
                if (index < 6) {
                  return (
                    <div
                      key={movie.imdbID}
                      className="col-6 col-sm-4 col-md-3 col-xl-2"
                    >
                      <MovieCard
                        poster={movie.Poster}
                        title={movie.Title}
                        year={movie.Year}
                        href={`/movie/${movie.imdbID}`}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
