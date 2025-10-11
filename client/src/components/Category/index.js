import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TailSpin } from "react-loader-spinner";
import { RxDotFilled } from "react-icons/rx";
import {Link} from 'react-router-dom'

const API_KEY = "c7bcfaf589024c0a81002dd112a1d6c5";
const basePath = "https://image.tmdb.org/t/p/w500/";

const TopMovieSettings = {
  autoplay: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const Category = (props) => {
  const { movieIds, isMovie } = props;

  const [categoryDetails, setCategoryDetails] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [isHovered, setIsHovered] = useState(Array(movieIds.length).fill(false));

  const path = isMovie ? 'movie' : 'tv';


  useEffect(() => {
    setLoader(true);
      const categoryPromises = movieIds.map((eachId) =>
        fetch(
          `https://api.themoviedb.org/3/${path}/${eachId}?api_key=${API_KEY}&language=en-US&page=1`
        ).then((response) => response.json())
      );
    Promise.all([...categoryPromises]).then((results) => {
      const Details = results.slice(0, movieIds.length);
      setCategoryDetails(Details.map(eachFilm => {
        const hours = Math.floor(eachFilm.runtime / 60);
        const minutes = eachFilm.runtime % 60;
        const seasons = eachFilm.number_of_seasons;
        return ({
          id: eachFilm.id,
          title: isMovie ? eachFilm.title : eachFilm.name,
          imageUrl: `${basePath}${eachFilm.backdrop_path}`,
          releaseYear: isMovie ? eachFilm.release_date.split("-")[0] : eachFilm.first_air_date.split("-")[0],
          duration: isMovie ? `${hours}hr ${minutes}min` : `${seasons}  seasons`,
          overview: `${eachFilm.overview.slice(0, 100)}...`,
        })
      }));
      setLoader(false);
    })
    .catch(error => console.log("Caught an error while fetching the data:", error))
  }, [movieIds, isMovie,path]);

  const handleMouseEnter = (index) => {
    setIsHovered((prev) => {
      const newIsHovered = [...prev];
      newIsHovered[index] = true;
      return newIsHovered;
    });
  };

  const handleMouseLeave = (index) => {
    setIsHovered((prev) => {
      const newIsHovered = [...prev];
      newIsHovered[index] = false;
      return newIsHovered;
    });
  };

  return (
    <ul className="">
      {isLoading ? (
        <TailSpin color="#ffffff" />
      ) : (
        <Slider {...TopMovieSettings}>
          {categoryDetails.map((film, index) => (
            <li
              key={film.id}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="px-2 relative"
            >
              <Link to={`/${path}/details/${film.id}`} className="relative">
                <img
                  alt={film.title}
                  src={film.imageUrl}
                  width={800}
                  height={400}
                  className="w-[300px] rounded-md transition-transform duration-300 ease-in-out cursor-pointer z-0"
                />
                <div
                  className={`text-center p-2 w-[300px] h-[170px] bg-black border border-black rounded-b-md absolute top-0 z-30 cursor-pointer transition-all duration-500 ease-in-out ${
                    isHovered[index]
                      ? "opacity-70 animate-fadeDown"
                      : "opacity-0 animate-fadeUp"
                  }`}
                >
                  <p className="text-white m-0 text-center text-[20px] font-bold">
                    {film.title}
                  </p>
                  <p className="text-[#a9a9a9] flex items-center justify-center">
                    {film.releaseYear} <RxDotFilled /> {film.duration}
                  </p>
                  <p className="text-gray-400">{film.overview}</p>
                </div>
              </Link>
            </li>
          ))}
        </Slider>
      )}
    </ul>
  );
};

export default Category;
