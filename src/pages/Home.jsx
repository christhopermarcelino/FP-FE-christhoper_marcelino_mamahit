import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import MovieCard from "src/components/MovieCard";
import Loading from "src/components/Loading";
import Pagination from "src/components/Pagination";
import Error from "src/components/Error";
import { changeError, changeLoading, changeMovies } from "src/store/action";

const DEFAULT_MOVIE_NAME = "harry%20potter";

export default function Home() {
  const { movies, isLoading, isError, search } = useSelector((state) => state);
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
      dispatch(changeError(false));
      dispatch(changeLoading(false));
    } catch (err) {
      dispatch(changeError(true));
    }
  };

  if (isError) {
    return <Error text="Unable to retrieve data" />;
  }

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
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-3 mb-4">
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
        <Error text={movies.Error} />
      )}
    </>
  );
}
