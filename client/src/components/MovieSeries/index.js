import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import { TailSpin } from 'react-loader-spinner';
import { AiOutlineSearch } from 'react-icons/ai';
import { CiFileOff } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import { useSearchMovies, useTopRatedMovies } from '../../api/api';
import Error from '../Error';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

const basePath = 'https://image.tmdb.org/t/p/w500/'

const filmCategories = {
    'popular': 'Popular',
    'top_rated': 'Top Rated',
    'upcoming': 'Upcoming',
    'on_the_air': 'On The Air',
    'movie': 'Movies',
    'tv': 'TV Series'
}

const MovieSeries = (props) => {
    const { route } = props;
    const params = useParams();
    const category = props.category ?? params.id;
    const filmCategory = `${filmCategories[category]} ${filmCategories[route]}`;

    const [searchInput, setSearchInput] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const isSearch = searchInput.trim() !== ''

    const { data: searchData, error: searchError } = useSearchMovies(route, searchInput, pageNumber)
    const { data: topData, error: topError } = useTopRatedMovies(route, category, pageNumber)

    const data = isSearch ? searchData : topData
    const error = isSearch ? searchError : topError

    useEffect(() => {
        setSearchInput('')
        setPageNumber(1)
    }, [route, category])

    const filmDetails = useMemo(() => {
        if (!data || !data.results) return []
        return data.results.map(eachFilm => ({
            id: eachFilm.id,
            title: route === 'movie' ? (eachFilm.title || eachFilm.name) : (eachFilm.name || eachFilm.title),
            imageUrl: eachFilm.poster_path ? `${basePath}${eachFilm.poster_path}` : 'https://via.placeholder.com/220x330?text=No+Image'
        }))
    }, [data, route])

    const totalPages = data?.total_pages ?? 0
    
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [pageNumber])
    

    return (
        <>
            <Header />
            <div className="flex flex-col bg-[#00050d] overflow-auto px-5">
                {/* Top Section - Category & Search */}
                <div className="flex items-center mt-5 ml-auto">
                    {!isSearch ? (
                        <p className="text-[#aaa] text-[30px] font-bold mr-[300px] my-1">
                            {filmCategory}
                        </p>
                    ) : (
                        <p className="text-[25px] font-medium text-[rgb(105,105,128)] mr-[300px] my-1">
                            Results for "{searchInput}"
                        </p>
                    )}
                    <div className="flex items-center bg-white text-black px-4 py-2 rounded-md">
                        <input
                            type="search"
                            placeholder="search"
                            onChange={(e) => { setSearchInput(e.target.value); setPageNumber(1); }}
                            value={searchInput}
                            className="text-black text-[15px] outline-none border-none placeholder:text-black"
                        />
                        <AiOutlineSearch className="ml-2" />
                    </div>
                </div>

                <div className="flex flex-col items-center mb-[69px] py-5 rounded-b-[10px]">
                    {/* Movie List */}
                    <ul className="flex flex-wrap justify-center list-none m-0 p-0">
                        {!data && !error ? (
                            <div className="h-[57vh] w-full flex justify-center items-center">
                                <TailSpin color="#ffffff" />
                            </div>
                        ) : error ? (
                            <div className="flex flex-col justify-center items-center h-[57vh]">
                                <Error />
                            </div>
                        ) : filmDetails.length === 0 ? (
                            <div className="flex flex-col justify-center items-center h-[57vh]">
                                <CiFileOff className="text-white text-[80px]" />
                                <p className="text-white text-[25px] font-bold">
                                    No result found for "{searchInput}"
                                </p>
                            </div>
                        ) : (
                            filmDetails.map((film) => (
                                <li key={film.id} className="w-[220px] m-5">
                                    <Link to={`/${route}/${film.id}`}>
                                        <img
                                            alt={film.title}
                                            src={film.imageUrl}
                                            className="w-[220px] h-[330px] rounded-[10px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                                        />
                                    </Link>
                                    <p className="text-gray-400 text-[20px] text-center mt-2">
                                        {film.title}
                                    </p>
                                </li>
                            ))
                        )}
                    </ul>

                    {/* Pagination */}
                    {filmDetails.length !== 0 && totalPages > 0 && (
                        <Pagination currentPage={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />
                    )}
                </div>
            </div>
        </>
    )

}
export default MovieSeries