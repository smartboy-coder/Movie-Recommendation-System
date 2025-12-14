import { Link } from 'react-router-dom'
import ReactPopUp from "../ReactPopup";
import { TailSpin } from "react-loader-spinner";
import { useDetails, useVideos } from '../../api/api';
import Error from '../Error';
import { useMemo } from 'react'

const basePath = "https://image.tmdb.org/t/p/w500/";

const TrendingMovie = (props) => {
    const { id } = props
    const { data: movieData, error: movieDataError } = useDetails('movie', id)
    const { data: movieVideos, error: movieVideosError } = useVideos('movie', id)


    const videoId = useMemo(() => { 
        if (!movieVideos) return '' 
        return movieVideos.find(r => r.type === 'Trailer')?.key || null 
    }, [movieVideos])

    if (!movieData || !movieVideos) return <div className='h-[400px] w-full flex justify-center items-center'><TailSpin color="#ffffff" /></div>

    const title = movieData.title || '';
    const tagline = movieData.tagline || '';
    const overview = movieData.overview || '';
    const shortOverview = overview.length > 300 ? `${overview.slice(0, 300)} ...` : overview
    const image = movieData.backdrop_path ? `${basePath}${movieData.backdrop_path}` : 'https://via.placeholder.com/700x400?text=No+Image'

    if (movieDataError || movieVideosError) return <Error />

    

    return (
        <li className="!flex">
            <div className="flex flex-col items-start w-2/5 p-5">
                <p className="m-0 mt-2.5 text-[25px] font-bold">{title}</p>
                <p className="m-0 mt-2.5 text-gray-400">{tagline}</p>
                <p className="m-0 mt-[30px] text-[20px] font-bold underline text-[#a9a9a9]">Overview</p>
                <p className="m-0 mt-2.5 text-[15px] text-gray-400 h-[100px]">{shortOverview}</p>
                <div className="flex items-center mt-[30px] cursor-pointer">
                    <Link to={`/movie/${id}`} className="text-black no-underline">
                        <button
                            type="button"
                            className="px-4 py-[15px] mr-[100px] bg-blue-200 text-black font-bold text-[15px] rounded-md border-none transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-300"
                        >
                            More Details
                        </button>
                    </Link>
                    <ReactPopUp videoId={videoId} />
                    <p className="p-[10px] text-[20px] font-bold">Watch Trailer</p>
                </div>
            </div>

            <img alt={title} src={image} className="w-[700px] h-auto rounded-md" />
        </li>
    )
}

export default TrendingMovie;