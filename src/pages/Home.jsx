import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { changeLoading, changeMovies } from "src/store/action";
import MovieCard from "src/components/MovieCard";
import Loading from "src/components/Loading";
import Pagination from "src/components/Pagination";

const DEFAULT_MOVIE_NAME = "harry%20potter";

export default function Home() {
  const { movies, isLoading, search } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  useEffect(() => {
    getMovieData({ name: search || DEFAULT_MOVIE_NAME, page });
  }, [page, search]);

  const getMovieData = async ({ name, page }) => {
    try {
      dispatch(changeLoading(true));
      const data = await fetch(
        `${process.env.REACT_APP_BASE_URL}?apiKey=${process.env.REACT_APP_API_KEY}&s=${name}&page=${page}`
      );
      const jsonData = await data.json();
      dispatch(changeMovies(jsonData));
      dispatch(changeLoading(false));
    } catch (err) {
      // show error toast
    }
  };

  if (isLoading) {
    return <Loading isFullScreen={false} />;
  }

  return (
    <>
      {movies?.Response === "True" ? (
        <>
          <h1 className="mb-4 fw-semibold fs-3">
            {search ? `Search for: ${search}` : "Trending today"}
          </h1>
          <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-3 mb-4">
            {(movies?.Search ?? []).map((d) => (
              <div key={d.imdbID}>
                <MovieCard
                  poster={d.Poster}
                  title={d.Title}
                  year={d.Year}
                  href={`/movie/${d.imdbID}`}
                />
              </div>
            ))}
          </div>
          <Pagination movies={movies} page={page} />
        </>
      ) : (
        <div className="row">
          <div className="col-4 col-sm-4 col-md-4 col-lg-3 m-auto mb-4">
            <img
              src="/assets/images/error.png"
              alt="Error"
              className="img-fluid"
            />
          </div>
          <p className="text-center fs-5 mb-0">{movies.Error}</p>
          <p className="text-center">Please try again your search</p>
        </div>
      )}
    </>
  );
}
