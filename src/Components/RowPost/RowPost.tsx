import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import YouTube from "react-youtube";
import "./RowPost.css";
import {  baseUrl, imageUrl } from "../../constants/constants";

interface Movie {
  title: string;
  backdrop_path: string;
  overview: string;
}
type RowPost = {
    title: string;
    isSmall?: boolean;
    url: string;
}

function RowPost({title, isSmall, url}:RowPost) {
  const [movies, setMovies] = useState<Partial<Movie[]>>([]);

  useEffect(() => {
    async function fetchOriginals() {
      try {
        const result = await axios(
          baseUrl + url
        );
        setMovies(result.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOriginals();
  }, []);

  
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }

  return (
    <div className="rowpost-row">
      <h1>{title}</h1>
      <div className="posters">
        {movies?.map((movie) => (
          <img
            key={movie?.title}
            className={!isSmall ? 'small-poster' : "poster"}
            src={`${imageUrl + movie?.backdrop_path}`}
            alt="card-image"
          />
        ))}
      </div>
      <YouTube videoId="2g811Eo7K8U" opts={opts}  />
    </div>
  );
}

export default RowPost;
