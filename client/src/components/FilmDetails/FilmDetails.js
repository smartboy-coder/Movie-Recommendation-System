import React, { useMemo } from 'react';
import ReactPopUp from '../ReactPopup';
import Error from "../Error";
import { RxDotFilled } from "react-icons/rx";
import { useDetails, useVideos } from '../../api/api';
import { TailSpin } from "react-loader-spinner";


const basePath = "https://image.tmdb.org/t/p/w500/";

const FilmDetails = (props) => {

    const {route, id} = props

    const { data, error: dataError } = useDetails(route, id);
    const { data: videos, error: videosError } = useVideos(route, id);

    const hours = useMemo(() => Math.floor((data?.runtime || 0) / 60), [data?.runtime]);
    const minutes = useMemo(() => (data?.runtime || 0) % 60, [data?.runtime]);
    const seasons = useMemo(() => data?.number_of_seasons || 0, [data?.number_of_seasons]);
    const genresList = useMemo(() => (data?.genres || []).map((genre) => genre.name), [data?.genres]);

    const title = useMemo(() => (route === 'movie' ? data?.title || '' : data?.name || ''), [route, data?.title, data?.name]);
    const tagline = useMemo(() => data?.tagline || '', [data?.tagline]);
    const imageUrl = useMemo(() => (data?.poster_path ? `${basePath}${data.poster_path}` : 'https://via.placeholder.com/270x400?text=No+Image'), [data?.poster_path]);
    const releaseYear = useMemo(() => (route === 'movie' ? (data?.release_date ? data.release_date.split('-')[0] : '') : (data?.first_air_date ? data.first_air_date.split('-')[0] : '')), [route, data?.release_date, data?.first_air_date]);
    const duration = useMemo(() => (route === 'movie' ? `${hours}hr ${minutes}min` : `${seasons} seasons`), [route, hours, minutes, seasons]);
    const overview = useMemo(() => data?.overview || '', [data?.overview]);
    const languages = useMemo(() => (data?.spoken_languages || []).length, [data?.spoken_languages]);
    const genres = useMemo(() => genresList.join(' | '), [genresList]);
    const videoId = useMemo(() => videos?.find((r) => r.type === 'Trailer')?.key || null, [videos]);

    if (dataError || videosError) return <Error />;
    if (!data || !videos) return <div className='h-[400px] w-full flex justify-center items-center'><TailSpin color="#ffffff" /></div>;
    return (
        <div className="flex mt-8">
            <div className="flex flex-col items-center">
                <img
                    alt={title}
                    src={imageUrl}
                    className="rounded-xl max-w-none w-[270px]"
                />
            </div>

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

                <div className="flex items-center mt-6">
                    <ReactPopUp videoId={videoId} />
                    <p className="text-white text-[20px] font-bold p-2">
                        Watch Trailer
                    </p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(FilmDetails);