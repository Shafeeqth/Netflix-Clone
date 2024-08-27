import { useEffect, useState } from "react";
import "./Banner.css";
import { API_KEY, baseUrl, imageUrl } from "../../constants/constants";
import axios from "../../axios/axios";

interface Movie {
  title: string;
  backdrop_path: string;
  overview: string;
}

function Banner() {
  const [movie, setMovie] = useState<Partial<Movie | null>>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
      );
      setMovie(
        () =>
          result.data.results[
            Math.ceil(Math.random() * result.data.results.length)
          ]
      );
     
    }
    fetchData();

    //    setMovie((movie:object) => result)
  }, []);
 

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl + movie?.backdrop_path})`    }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title : ""}</h1>
        <div className="banner-buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade-bottom"> </div>
    </div>
  );
}

export default Banner;
