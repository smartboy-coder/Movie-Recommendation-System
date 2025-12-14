import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import TrendingMovie from "./TrendingMovies";
import { useTrendingMovies } from '../../api/api';
import Error from "../Error";
import { useMemo } from "react";
import { TailSpin } from 'react-loader-spinner'


const TrendingMovieSettings = {
  speed: 500,
  autoplay: true,
  dots: true,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TrendingMovieContainer = () => {


  const { data: trendingMovies, error: trendingMoviesError } = useTrendingMovies();

  const ids = useMemo(() => {
    if (!trendingMovies) return []
    return trendingMovies.map(m => m.id).filter(Boolean)
  }, [trendingMovies])

  if (trendingMoviesError) return <Error />

  if (!trendingMovies) return (
    <div className="h-[200px] w-full flex justify-center items-center bg-[#00050d]">
      <TailSpin color="#ffffff" />
    </div>
  )

  return (
    <div className="flex flex-col bg-[#00050d]">
      <div className="list-none m-0 px-[50px] py-[10px]">
        <div className="p-0 text-[aliceblue]">
          <Slider {...TrendingMovieSettings} >
            {ids.map((id) => <TrendingMovie key={id} id={id} />)}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default TrendingMovieContainer;