import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  SliderContainer,
  Loader,
  HomePosterContainer,
  HomePosterImage,
  HomePosterDescription,
  HomePosterTitle,
  HomePosterInfo,
  DotIcon,
  HomePosterOverview,
  HomeDetailsLink
} from './styledComponents'

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
    <SliderContainer>
      {isLoading ? (
        <Loader color="#ffffff" />
      ) : (
        <Slider {...TopMovieSettings}>
          {
            categoryDetails.map((film, index) => (
              <HomePosterContainer
                key={film.id}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <HomeDetailsLink to={`/${path}/details/${film.id}`}>
                  <HomePosterImage
                    alt={film.title}
                    src={film.imageUrl}
                  />
                  <HomePosterDescription $ishover={isHovered[index]}>
                    <HomePosterTitle>{film.title}</HomePosterTitle>
                    <HomePosterInfo >
                      {film.releaseYear} {<DotIcon />} {film.duration}
                    </HomePosterInfo>
                    <HomePosterOverview>{film.overview}</HomePosterOverview>
                  </HomePosterDescription>
                </HomeDetailsLink>
              </HomePosterContainer>
            )
            )}
        </Slider>
      )}
    </SliderContainer>
  );
};

export default Category;
