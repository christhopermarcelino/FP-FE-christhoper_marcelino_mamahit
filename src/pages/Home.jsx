import data from "../data.json";
import MovieCard from "../components/MovieCard";

export default function Home() {
  return (
    <>
      <h1 className="mb-4 fw-semibold">Trending NOW</h1>

      {data?.Search?.length == 0 ? (
        <p className="text-center">No movies found.</p>
      ) : (
        <div className="row row-gap-3">
          {data?.Search?.map((d) => (
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
