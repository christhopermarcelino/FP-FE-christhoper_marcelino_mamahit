import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { isValueExists } from "../libs/helper";
import MovieCard from "../components/MovieCard";
import { changeLoading } from "../store/action";
import Loading from "../components/Loading";

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
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    getMoviedata();
  }, []);

  const getMoviedata = async () => {
    try {
      dispatch(changeLoading(true));
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&i=${imdbID}&plot=full`
      );
      const jsonData = await data.json();
      setMovie(jsonData);
      dispatch(changeLoading(false));
    } catch (err) {
      // show error toast
    }
  };

  const formatCommaToMiddleDot = (items) => {
    if (items === "N/A") {
      return "-";
    }
    return items.split(",").join(" · ");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="row placeholder-glow">
            <div className="col-6 col-lg-3 mx-auto mb-3 mb-lg-0">
              <img
                src={movie?.Poster}
                alt={movie?.Title}
                className="img-fluid"
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
                if (index < 5) {
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
