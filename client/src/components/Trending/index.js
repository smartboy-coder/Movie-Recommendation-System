import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import ReactPopUp from "../ReactPopup";
import { TailSpin } from "react-loader-spinner";
import {Link} from 'react-router-dom'

const API_KEY = 'c7bcfaf589024c0a81002dd112a1d6c5'
const basePath = 'https://image.tmdb.org/t/p/w500/'

const TrendingMovieSettings = {
    speed: 500,
    autoplay: true,
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
};


const Trending = (props) => {
    const { movieIds } = props
    const [trendingMovieDetails, setTrendingMovieDetails] = useState([])
    const [isLoading, setLoader] = useState(false)


    useEffect(() => {
        setLoader(true)
        const moviePromises = movieIds.map((eachId) =>
            fetch(`https://api.themoviedb.org/3/movie/${eachId}?api_key=${API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .catch(error=>console.log("caught an error in movie promises "+error))
        );

        const videoPromises = movieIds.map((eachId) =>
            fetch(`https://api.themoviedb.org/3/movie/${eachId}/videos?api_key=${API_KEY}&language=en-US&page=1`)
                .then(response => response.json())
                .catch(error=>console.log("caught an error in video promises "+error))

        );
        Promise.all([...moviePromises, ...videoPromises]).then((results) => {
            console.log(results)
            const movieDetails = results.slice(0, movieIds.length);
            const videoDetails = results.slice(movieIds.length);
            setTrendingMovieDetails(movieDetails.map(eachMovie => {
                let videoId;
                videoDetails.forEach(video => {
                    if (video.id === eachMovie.id) {
                        video.results.forEach(eachType => {
                            if (eachType.type === 'Trailer') {
                                videoId = eachType.key
                            }
                        })
                    }
                })
                return ({
                    id: eachMovie.id,
                    title: eachMovie.title,
                    tagline: eachMovie.tagline,
                    overview: eachMovie.overview.slice(0, 357),
                    image: `${basePath}${eachMovie.backdrop_path}`,
                    videoId: videoId,
                })
            }));

            setLoader(false)
        })
        .catch(error => console.log("Caught an error in trending while fetching the data:", error))
    }, [movieIds]);

    return (
        <ul className="p-0 text-[aliceblue]">
      {isLoading ? (
        <TailSpin color="#ffffff" />
      ) : (
        <Slider {...TrendingMovieSettings}>
          {trendingMovieDetails.map((movie) => (
            <li key={movie.id} className="!flex">
              <div className="flex flex-col items-start w-2/5 p-5">
                <p className="m-0 mt-2.5 text-[25px] font-bold">{movie.title}</p>
                <p className="m-0 mt-2.5 text-center text-gray-400">{movie.tagline}</p>
                <p className="m-0 mt-[30px] text-[20px] font-bold underline text-[#a9a9a9]">
                  Overview
                </p>
                <p className="m-0 mt-2.5 text-[15px] text-gray-400 h-[100px]">
                  {movie.overview.length>300?`${movie.overview.slice(0,300)} ...`:movie.overview}
                </p>
                <div className="flex items-center mt-[30px] cursor-pointer">
                  <Link
                    to={`/movie/details/${movie.id}`}
                    className="text-black no-underline"
                  >
                    <button
                      type="button"
                      className="px-4 py-[15px] mr-[100px] bg-blue-200 text-black font-bold text-[15px] rounded-md border-none transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-300"
                    >
                      More Details
                    </button>
                  </Link>
                  <ReactPopUp videoId={movie.videoId} />
                  <p className="p-[10px] text-[20px] font-bold">Watch Trailer</p>
                </div>
              </div>

              <img
                alt={movie.title}
                src={movie.image}
                className="w-[700px] h-auto rounded-md"
              />
            </li>
          ))}
        </Slider>
      )}
    </ul>
    )
}

export default Trending