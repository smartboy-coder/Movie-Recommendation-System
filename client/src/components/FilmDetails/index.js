import { useEffect, useState } from 'react'
import { RxDotFilled } from "react-icons/rx";
import Slider from "react-slick";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import {Link} from 'react-router-dom'

import ReactPopUp from '../ReactPopup';
import { useLocation, useParams } from 'react-router-dom';

const basePath = "https://image.tmdb.org/t/p/w500/";
const API_KEY = 'c7bcfaf589024c0a81002dd112a1d6c5';

const TopMovieSettings = {
    autoplay: true,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 4,
};

const FilmDetails = () => {

    const { id } = useParams()
    const movieId = id;

    const location = useLocation()
    const path = location.pathname.split('/')
    const route = path[1]

    const [getFilmDetails, setFilmDetails] = useState({ cast: [], similarFilmDetails: [] })
    const [isLoading, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        const filmPromises = fetch(`https://api.themoviedb.org/3/${route}/${movieId}?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())

        const videoPromises = fetch(`https://api.themoviedb.org/3/${route}/${movieId}/videos?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())

        const castPromises = fetch(`https://api.themoviedb.org/3/${route}/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())

        const similarFilmPromises = fetch(`https://api.themoviedb.org/3/${route}/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())

        Promise.all([filmPromises, videoPromises, castPromises, similarFilmPromises]).then(data => {
            const filmDetails = data[0]
            const hours = Math.floor(filmDetails.runtime / 60);
            const minutes = filmDetails.runtime % 60;
            const seasons = filmDetails.number_of_seasons;
            const genresList = filmDetails.genres.map((genre) => genre.name);

            const videoDetails = data[1].results
            let videoId;
            videoDetails.forEach(video => {
                if (video.type === 'Trailer') {
                    videoId = video.key
                }
            })

            const castDetails = data[2].cast
            const actors = castDetails.filter(cast => cast.known_for_department === 'Acting' && cast.profile_path !== null)
            const actorDetails = actors.map(cast => ({
                name: cast.name,
                image: basePath + cast.profile_path
            })
            )
            const filteredactors = actorDetails.slice(0, 10)

            const similarFilmDetails = data[3].results
            const filterSimilarFilms = similarFilmDetails.filter(film => film.poster_path !== null)
            const similarFilms = filterSimilarFilms.map(eachFilm => ({
                id: eachFilm.id,
                title: route === 'movie' ? eachFilm.title : eachFilm.name,
                imageUrl: `${basePath}${eachFilm.poster_path}`
            }))



            setFilmDetails(
                {
                    title: route === 'movie' ? filmDetails.title : filmDetails.name,
                    tagline: filmDetails.tagline,
                    imageUrl: `${basePath}${filmDetails.poster_path}`,
                    releaseYear: route === 'movie' ? filmDetails.release_date.split("-")[0] : filmDetails.first_air_date.split("-")[0],
                    duration: route === 'movie' ? `${hours}hr ${minutes}min` : `${seasons}  seasons`,
                    overview: `${filmDetails.overview}`,
                    languages: filmDetails.spoken_languages.length,
                    genres: genresList.join(' | '),
                    videoId: videoId,
                    cast: filteredactors,
                    similarFilmDetails: similarFilms
                }
            )

            setLoader(false)
        })
            .catch(error => console.log("Caught an error while fetching the data:", error))

    }, [movieId, route]);



    const { title,
        tagline,
        imageUrl,
        releaseYear,
        duration,
        overview,
        languages,
        genres,
        videoId,
        cast,
        similarFilmDetails
    } = getFilmDetails
    return (
        <div className="flex flex-col bg-[#00050d] h-screen overflow-auto">
            {isLoading ? (
                <TailSpin color="#ffffff" />
            ) : (
                <div className='flex flex-col p-10'>
                    {/* Back to Home Link */}
                    <Link to="/" className="h-auto">
                        <FaArrowAltCircleLeft color="gray" size={30} />
                    </Link>

                    {/* Film Details Section */}
                    <div className="flex mt-8">
                        {/* Left Section */}
                        <div className="flex flex-col items-center">
                            <img
                                alt={title}
                                src={imageUrl}
                                className="rounded-xl max-w-none w-[270px]"
                            />
                        </div>

                        {/* Right Section */}
                        <div className="ml-10">
                            <p className="text-white text-[40px] font-medium">{title}</p>
                            <p className="text-gray-400 mt-2">- {tagline}</p>
                            <p className="text-[#a9a9a9] text-[20px] font-bold underline mt-4">
                                Overview
                            </p>
                            <p className="text-gray-400 text-[15px] mt-2 h-[100px] overflow-y-auto">
                                {overview}
                            </p>

                            <p className="text-[#aaa] mt-3 flex items-center gap-1">
                                {duration} <RxDotFilled /> {releaseYear} <RxDotFilled />{" "}
                                {languages} languages
                            </p>

                            <p className="text-[#aaa] mt-1">{genres}</p>

                            {/* Trailer Section */}
                            <div className="flex items-center mt-6">
                                <ReactPopUp videoId={videoId} />
                                <p className="text-white text-[20px] font-bold p-2">
                                    Watch Trailer
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border border-[#2b2b2b] mt-10" />

                    {/* Cast Section */}
                    <div className="flex flex-col items-start text-white w-full flex-wrap">
                        <h1 className="text-white font-bold text-[25px] mt-5">Cast</h1>
                        <ul className="flex flex-wrap list-none">
                            {cast.map((actor) => (
                                <li key={actor.name} className="text-center m-[10px]">
                                    <img
                                        alt={actor.name}
                                        src={actor.image}
                                        className="w-[190px] rounded-xl"
                                    />
                                    <p className="text-gray-400 text-[20px] text-center mt-2">
                                        {actor.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <hr className="border border-[#2b2b2b] mt-10" />

                    {/* Similar Movies Section */}
                    <h1 className="text-white font-bold text-[25px] mt-5">Similar Movies</h1>
                    <div className="p-10">
                        <Slider {...TopMovieSettings}>
                            {similarFilmDetails.map((film) => (
                                <div key={film.id} className="w-[220px] m-[10px]">
                                    <Link to={`/${route}/details/${film.id}`}>
                                        <img
                                            alt={film.title}
                                            src={film.imageUrl}
                                            className="w-[220px] h-[330px] rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                                        />
                                    </Link>
                                    <p className="text-gray-400 text-[20px] text-center w-[220px] mt-2">
                                        {film.title}
                                    </p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    )

}

export default FilmDetails