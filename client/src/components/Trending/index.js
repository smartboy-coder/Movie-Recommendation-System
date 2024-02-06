import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import ReactPopUp from "../ReactPopup";
import {
    SliderContainer,
    Loader,
    TrendingPosterContainer,
    PosterDescription,
    TrendingMovieTitle,
    TrendingMovieTagline,
    TrendingMovieOverviewTitle,
    TrendingMovieOverview,
    TrailerDetailsContainer,
    MoreDetailsButton,
    TrailerText,
    TrendingPoster,
    MoreDetailsLink
} from './styledComponents'

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
        <SliderContainer>
            {
                isLoading ? <Loader color="#ffffff" /> : (
                    <Slider {...TrendingMovieSettings}>
                        {
                            trendingMovieDetails.map((movie) => {
                                return (
                                    <TrendingPosterContainer key={movie.id}>
                                        <PosterDescription>
                                            <TrendingMovieTitle>{movie.title}</TrendingMovieTitle>
                                            <TrendingMovieTagline >{movie.tagline}</TrendingMovieTagline>
                                            <TrendingMovieOverviewTitle >Overview</TrendingMovieOverviewTitle>
                                            <TrendingMovieOverview >{movie.overview}</TrendingMovieOverview>
                                            <TrailerDetailsContainer>
                                                <MoreDetailsLink to={`/movie/details/${movie.id}`}>
                                                    <MoreDetailsButton type="button" >
                                                        More Details
                                                    </MoreDetailsButton>
                                                </MoreDetailsLink>
                                                <ReactPopUp videoId={movie.videoId} />
                                                <TrailerText>Watch Trailer</TrailerText>
                                            </TrailerDetailsContainer>
                                        </PosterDescription>
                                        <TrendingPoster alt={movie.title} src={movie.image} />
                                    </TrendingPosterContainer>

                                )
                            }
                            )
                        }
                    </Slider>
                )
            }

        </SliderContainer>
    )
}

export default Trending