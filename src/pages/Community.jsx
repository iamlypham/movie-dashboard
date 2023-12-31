import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import tmdb from "../../api/tmdb";

const Community = () => {
  const { watchList, removeMovieFromWatchList } = useContext(GlobalContext);
  const [getMovies, setGetMovies] = useState([]);
  const [getTvShows, setGetTvShows] = useState([]);
  const [render, setRender] = useState(true);
  const getPoster = (poster_path) => {
    return `https://image.tmdb.org/t/p/original${poster_path}`;
  };
  const fetchGetMoviesGenres = async () => {
    setRender(false);
    const { data } = await tmdb.get("movie/top_rated");
    console.log(data.results);
    setGetMovies(data.results);
  };
  useEffect(() => {
    const fetchGetTvShowsGenres = async () => {
      const { data } = await tmdb.get("tv/popular");
      setGetTvShows(data.results);
      setRender(true);
    };
    fetchGetTvShowsGenres();
  }, []);

  const fetchGetTvShowsGenres = async () => {
    const { data } = await tmdb.get("tv/popular");
    setGetTvShows(data.results);
    setRender(true);
  };

  return (
    <div className="h-full w-full flex items-center justify-center font-poppins xl:p-3">
      <div className=" rounded-3xl h-full w-full p-3">
        <div>
          <h1 className="font-bold text-2xl py-3">Hi, What next?</h1>
        </div>
        <div className="w-full flex gap-3">
          <Link>
            <button
              onClick={() => fetchGetMoviesGenres()}
              className="bg-red-900 text-white px-3 rounded-xl"
            >
              Movies
            </button>
          </Link>
          <Link>
            <button
              onClick={() => fetchGetTvShowsGenres()}
              className="bg-red-900 text-white px-3 rounded-xl"
            >
              Tv Shows
            </button>
          </Link>
        </div>
        <div className="w-full h-screen  overflow-auto">
          <div className="overflow-auto h-3/4">
            <h1 className=" font-bold text-lg text-red-900">
              {render ? "Tv Shows" : "Movies"}
            </h1>
            {render ? (
              <div className="w-full h-fit flex overflow-auto gap-3">
                {getTvShows.map((show) => {
                  return (
                    <div
                      key={show.id}
                      className="w-2/4 h-full  flex-shrink-0 rounded-xl flex flex-col items-center justify-center"
                    >
                      <Link to={`/detail/${show.id}`}>
                        <img
                          className="h-full w-full rounded-3xl object-top object-cover"
                          src={getPoster(show.poster_path)}
                        ></img>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-fit overflow-auto gap-3">
                {getMovies.map((movie) => {
                  return (
                    <div
                      key={movie.id}
                      className="w-2/4 h-full   flex-shrink-0 rounded-xl flex flex-col items-center justify-center"
                    >
                      <Link to={`/detail/${movie.id}`}>
                        <img
                          className="h-full w-full rounded-3xl object-center object-cover"
                          src={getPoster(movie.poster_path)}
                        ></img>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              <h1 className=" font-bold text-lg text-red-900">Watch Lists</h1>
              <div className=" font-bold text-sm text-red-900 flex overflow-auto">
                <div className="w-full h-fit flex-shrink-0 relative flex gap-3">
                  {watchList.map((movie) => {
                    return (
                      <div className="h-fit gap-1 w-1/2  flex-shrink-0  flex flex-col items-center justify-center">
                        <Link
                          key={movie.id}
                          className=" flex-shrink-0"
                          to={`/detail/${movie.id}`}
                        >
                          <img
                            className="w-full h-full  object-cover rounded-2xl"
                            src={getPoster(movie.poster_path)}
                          ></img>
                        </Link>
                        <button
                          className="text-white bg-red-900 rounded-full px-1 py-1"
                          onClick={() => removeMovieFromWatchList(movie.id)}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
