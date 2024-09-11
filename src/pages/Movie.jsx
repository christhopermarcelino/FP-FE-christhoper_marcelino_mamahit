import { useParams } from "react-router-dom";
import dummyMovie from "../movie.json";
import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";

export default function Movie() {
  const [movie, setMovie] = useState(dummyMovie);
  const { imdbID } = useParams();

  useEffect(() => {
    getMoviedata();
  }, []);

  const getMoviedata = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&i=${imdbID}`
      );
      const jsonData = await data.json();
      setMovie(jsonData);
    } catch (err) {
      // show error toast
    }
  };

  const formatCommaToMiddleDot = (items) => {
    return items.split(",").join(" · ");
  };

  return (
    <>
      <div className="row">
        <div className="col-6 col-lg-3 mx-auto mb-3 mb-lg-0">
          <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
        </div>
        <div className="col-lg-9">
          <h1 className="fw-bold">{movie.Title}</h1>
          <div className="d-flex gap-2 mb-3">
            <span className="badge text-bg-dark d-flex justify-content-center align-items-center">
              {movie.Type}
            </span>
            <span>
              {movie.Year} &#183; {movie.Runtime} &#183; {movie.Rated}
            </span>
          </div>
          <p>{movie.Plot}</p>
          <table className="table w-auto">
            <tbody>
              <tr>
                <th className="bg-transparent">Genre</th>
                <td className="bg-transparent">
                  {formatCommaToMiddleDot(movie.Genre)}
                </td>
              </tr>
              <tr>
                <th className="bg-transparent">Director</th>
                <td className="bg-transparent">{movie.Director}</td>
              </tr>
              <tr>
                <th className="bg-transparent">Writer</th>
                <td className="bg-transparent">
                  {formatCommaToMiddleDot(movie.Writer)}
                </td>
              </tr>
              <tr>
                <th className="bg-transparent">Actors</th>
                <td className="bg-transparent">
                  {formatCommaToMiddleDot(movie.Actors)}
                </td>
              </tr>
              <tr>
                <th className="bg-transparent">Language</th>
                <td className="bg-transparent">
                  {formatCommaToMiddleDot(movie.Language)}
                </td>
              </tr>
              <tr>
                <th className="bg-transparent">Country</th>
                <td className="bg-transparent">
                  {formatCommaToMiddleDot(movie.Country)}
                </td>
              </tr>
              <tr>
                <th className="bg-transparent">Release Date</th>
                <td className="bg-transparent">
                  {formatCommaToMiddleDot(movie.Released)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div
            class="alert alert-dark mb-0 d-flex align-items-center gap-2"
            role="alert"
          >
            <FaMedal />
            <span>{movie.Awards}</span>
          </div>
        </div>
      </div>
      <div className="row mt-4 row-gap-2">
        <h3 className="fs-4">Ratings</h3>
        {movie.Ratings.map((rating) => (
          <div key={rating.Source} className="col-sm-6 col-md-4 col-lg-3 px-2">
            <div className="border rounded py-3 px-4">
              <div className="d-flex align-items-center gap-2">
                <MdOutlineStar />
                <span>{rating.Value}</span>
              </div>
              <p className="mb-0">{rating.Source}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-4">
        <h3 className="fs-4">Recommended movie for you</h3>
      </div>
    </>
  );
}
