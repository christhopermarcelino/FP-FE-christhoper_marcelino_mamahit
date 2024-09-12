import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeLoading, changeMovies } from "../store/action";
import Loading from "../components/Loading";

const DEFAULT_MOVIE_NAME = "harry%20potter";

export default function Home() {
  const { movies, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies?.Search) {
      getMovieData({ name: DEFAULT_MOVIE_NAME });
    }
  }, []);

  const getMovieData = async ({ name, page, year }) => {
    try {
      dispatch(changeLoading(true));
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&s=${name}&page=1`
      );
      const jsonData = await data.json();
      dispatch(changeMovies(jsonData));
      dispatch(changeLoading(false));
    } catch (err) {
      // show error toast
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading isFullScreen={false} />
      ) : (
        <div className="row row-gap-3">
          <h1 className="mb-4 fw-semibold">Trending today</h1>
          {(movies?.Search ?? []).map((d) => (
            <div key={d.imdbID} className="col-6 col-sm-4 col-md-3 col-xl-2">
              <MovieCard
                poster={d.Poster}
                title={d.Title}
                year={d.Year}
                href={`/movie/${d.imdbID}`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
