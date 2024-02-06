import { useEffect, useState } from 'react'
import { RxDotFilled } from "react-icons/rx";
import Slider from "react-slick";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { Cast, CastDetails, CastDetailsContainer, CastHeading, CastImage, CastName, DetailsContainer, DetailsLeftSection, DetailsRightSection, FilmDetailsContainer, FilmGenres, FilmImage, FilmName, FilmOverview, FilmOverviewTitle, FilmRuntime, FilmTagLine, HomeLink, HorizontalLine, PosterContainer, PosterImage, PosterLink, PosterTitle, SimilarMovieDetails, SimilarMoviesTitle, TrailerText } from './styledComponents'
import ReactPopUp from '../ReactPopup';
import { Loader, TrailerDetailsContainer } from '../Trending/styledComponents';
import {  useLocation, useParams } from 'react-router-dom';

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
        <FilmDetailsContainer>
            {
                isLoading ? <Loader color='#ffffff' /> : (
                    <>
                            <HomeLink to='/'><FaArrowAltCircleLeft color='gray' size={30} /></HomeLink>

                        <DetailsContainer>
                            <DetailsLeftSection>
                                <FilmImage alt={title} src={imageUrl} />
                            </DetailsLeftSection>
                            <DetailsRightSection>
                                <FilmName>{title}</FilmName>
                                <FilmTagLine>- {tagline}</FilmTagLine>
                                <FilmOverviewTitle>Overview</FilmOverviewTitle>
                                <FilmOverview>{overview}</FilmOverview>
                                <FilmRuntime>{duration} <RxDotFilled /> {releaseYear} <RxDotFilled /> {languages} languages  </FilmRuntime>
                                <FilmGenres>{genres}</FilmGenres>
                                <TrailerDetailsContainer>
                                    <ReactPopUp videoId={videoId} />
                                    <TrailerText>Watch Trailer</TrailerText>
                                </TrailerDetailsContainer>
                            </DetailsRightSection>

                        </DetailsContainer>
                        <HorizontalLine color='#2b2b2b' />
                        <CastDetailsContainer>
                            <CastHeading>Cast</CastHeading>
                            <CastDetails>
                                {
                                    cast.map(cast => (
                                        <Cast>
                                            <CastImage alt={cast.name} src={cast.image} />
                                            <CastName>{cast.name}</CastName>
                                        </Cast>
                                    ))
                                }
                            </CastDetails>
                        </CastDetailsContainer>
                        <HorizontalLine color='#2b2b2b' />
                        <SimilarMoviesTitle>Similar Movies</SimilarMoviesTitle>
                        <SimilarMovieDetails>
                            <Slider {...TopMovieSettings}>
                                {
                                    similarFilmDetails.map(film => (
                                        <PosterContainer key={film.id}>
                                            <PosterLink to={`/${route}/details/${film.id}`}>
                                                <PosterImage alt={film.title} src={film.imageUrl} />
                                            </PosterLink>
                                            <PosterTitle>{film.title}</PosterTitle>
                                        </PosterContainer>
                                    )
                                    )
                                }
                            </Slider>
                        </SimilarMovieDetails>
                    </>
                )
            }
        </FilmDetailsContainer>
    )

}

export default FilmDetails