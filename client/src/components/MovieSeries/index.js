import { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import { TailSpin } from 'react-loader-spinner';
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';
import { CiFileOff } from 'react-icons/ci'
import {Link} from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

const API_KEY = 'c7bcfaf589024c0a81002dd112a1d6c5'
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

    const { route, category } = props
    const filmCategory = `${filmCategories[category]} ${filmCategories[route]}`

    // const navigate = useNavigate()
    // const jwtToken = Cookies.get('jwt_token')
    // useEffect(() => {
    //     if (jwtToken === undefined) {
    //         navigate('/login', { replace: true })
    //     }
    // }, [navigate, jwtToken])

    const [paginationDetails, setPaginationDetails] = useState({
        page: 1,
        totalPages: 1,
        buttons: [1, 2, 3, 4, 5]
    })
    const [getFilmDetails, setFilmDetails] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [isSearch, setSearchMovies] = useState(false)

    const onSearchMovies = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            setSearchMovies(true)
            setSearchInput(event.target.value)
            setPaginationDetails(prevState => ({ ...prevState, page: 1 }))
        }
        else {
            setSearchMovies(false)
        }
    }

    const apiUrl = useRef('')

    useEffect(() => {
        if (isSearch) {
            apiUrl.current = `https://api.themoviedb.org/3/search/${route}?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${paginationDetails.page}&include_adult=false`;
        }
        else {
            apiUrl.current = `https://api.themoviedb.org/3/${route}/${category}?api_key=${API_KEY}&language=en-US&page=${paginationDetails.page}`
        }
        setLoading(true)
        fetch(apiUrl.current)
            .then(response => response.json())
            .then(data => {
                const filmDetails = data.results.map(eachFilm => ({
                    id: eachFilm.id,
                    title: route === 'movie' ? eachFilm.title : eachFilm.name,
                    imageUrl: `${basePath}${eachFilm.poster_path}`
                }))
                setPaginationDetails(prevState => {
                    const { page, buttons } = prevState
                    let newPageButtons = buttons;
                    const isPageGreater = page > 1;
                    const isPageLesser = page < data.total_pages;
                    const isPageEqualsLast = page === buttons[buttons.length - 1];
                    const isPageEqualsFirst = page === buttons[0];
                    if (data.total_pages < 5) {
                        newPageButtons = Array.from({ length: data.total_pages }, (_, i) => i + 1);
                    }
                    if (isPageLesser && isPageGreater) {
                        if (isPageEqualsLast) {
                            newPageButtons.shift()
                            newPageButtons.push(page + 1)
                        }
                        if (isPageEqualsFirst) {
                            newPageButtons.unshift(page - 1)
                            newPageButtons.pop()
                        }
                    }
                    return ({
                        ...prevState,
                        totalPages: data.total_pages,
                        buttons: newPageButtons
                    })
                })
                setFilmDetails(filmDetails)
                setLoading(false)
            })
            .catch(error => console.log("Caught an error while fetching the data:", error))
    }, [paginationDetails.page, isSearch, searchInput, route, apiUrl, category])

    const incrementPageNumber = () => {
        setPaginationDetails(prevState => ({
            ...prevState,
            page: prevState.page + 1
        }))
    }

    const changepage = (pageNumber) => {
        setPaginationDetails(prevState => ({
            ...prevState,
            page: pageNumber
        }))
    }

    const decrementPageNumber = () => {
        setPaginationDetails(prevState => ({
            ...prevState,
            page: prevState.page - 1
        }))
    }


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
                            onKeyDown={onSearchMovies}
                            value={searchInput}
                            className="text-black text-[15px] outline-none border-none placeholder:text-black"
                        />
                        <AiOutlineSearch className="ml-2" />
                    </div>
                </div>

                {/* Loader */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <TailSpin color="#ffffff" width={50} height={50} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center mb-[69px] py-5 rounded-b-[10px]">
                        {/* Movie List */}
                        <ul className="flex flex-wrap justify-center list-none m-0 p-0">
                            {getFilmDetails.length === 0 ? (
                                <div className="flex flex-col justify-center items-center h-[57vh]">
                                    <CiFileOff className="text-white text-[80px]" />
                                    <p className="text-white text-[25px] font-bold">
                                        No result found for "{searchInput}"
                                    </p>
                                </div>
                            ) : (
                                getFilmDetails.map((film) => (
                                    <li key={film.id} className="w-[220px] m-5">
                                        <Link to={`/${route}/details/${film.id}`}>
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
                        {getFilmDetails.length !== 0 && (
                            <div className="flex justify-center items-center mr-[50px] mt-4">
                                {/* Left Arrow */}
                                <AiOutlineLeft
                                    onClick={paginationDetails.page > 1 ? decrementPageNumber : undefined}
                                    className={`bg-[rgb(105,105,128)] rounded-[5px] w-[25px] h-[25px] m-[5px] p-[5px]
                  ${paginationDetails.page > 1
                                            ? 'opacity-100 text-white cursor-pointer'
                                            : 'opacity-30 cursor-not-allowed'
                                        }`}
                                />

                                {/* Page Numbers */}
                                {paginationDetails.buttons.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => changepage(pageNumber)}
                                        className={`w-[25px] h-[25px] m-[5px] rounded-[5px] text-[15px] font-medium cursor-pointer 
                    ${paginationDetails.page === pageNumber
                                                ? 'bg-white text-black'
                                                : 'bg-[#5c5c5c] text-[#aaa]'
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                {/* Right Arrow */}
                                <AiOutlineRight
                                    onClick={
                                        paginationDetails.page < paginationDetails.totalPages
                                            ? incrementPageNumber
                                            : undefined
                                    }
                                    className={`bg-[rgb(105,105,128)] rounded-[5px] w-[25px] h-[25px] m-[5px] p-[5px]
                  ${paginationDetails.page < paginationDetails.totalPages
                                            ? 'opacity-100 text-white cursor-pointer'
                                            : 'opacity-30 cursor-not-allowed'
                                        }`}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )

}
export default MovieSeries