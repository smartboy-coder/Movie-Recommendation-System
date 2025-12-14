import Cookies from 'js-cookie'
import { FaCirclePlay } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true })
    }

    const [movieBoxHover, setMovieBoxHover] = useState(false)
    const [tvBoxHover, setTvBoxHover] = useState(false)


    return (
        <header className="sticky top-0 z-30 flex items-center px-8 py-4 bg-[#00050df5] border-b-2 border-black shadow-[0_0_20px_20px_#00050df5]">
            <div className="flex items-center justify-center text-white">
                <FaCirclePlay size={28} />
                <h2 className="mx-2 font-serif font-bold text-[25px]">FilmyPalace</h2>
            </div>
            <nav className="flex items-center ml-auto font-[Amazon Ember,Arial,sans-serif]">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `cursor-pointer mr-[10px] rounded-md px-[15px] py-[10px] font-bold ${isActive
                            ? "bg-[#202c3fd0] text-white"
                            : "text-[#5c5c5c] hover:bg-[#202c3fd0] hover:text-white"
                        }`
                    }
                >
                    Home
                </NavLink>
                <div
                    className={`mr-[10px] rounded-t-md ${movieBoxHover ? "bg-[#202c3fd0]" : "bg-transparent"
                        }`}
                    onMouseLeave={() => setMovieBoxHover(false)}
                >
                    <div
                        className="flex items-center justify-center py-[10px] w-[120px]"
                        onMouseEnter={() => setMovieBoxHover(true)}
                    >
                        <button
                            type="button"
                            className={`font-bold text-[17px] bg-transparent border-none ${movieBoxHover ? "text-white" : "text-[#5c5c5c]"
                                }`}
                        >
                            Movies
                        </button>
                        <IoIosArrowDown
                            className={`ml-1 transition-transform duration-500 ${movieBoxHover ? "rotate-180 text-white" : "text-gray-400"
                                }`}
                        />
                    </div>
                    <div
                        className={`absolute flex flex-col rounded-b-md shadow-[0_0_2px_2px_#00050df5] bg-[#202c3fd0] transition-all duration-300 ease-in-out ${movieBoxHover
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-2 invisible"
                            }`}
                    >
                        <NavLink
                            to="/movies/popular"
                            className="text-[#aaa] font-medium text-[17px] text-center px-4 py-2 hover:bg-white hover:text-black border-b border-[#00050df5]"
                        >
                            Popular
                        </NavLink>
                        <NavLink
                            to="/movies/top_rated"
                            className="text-[#aaa] font-medium text-[17px] text-center px-4 py-2 hover:bg-white hover:text-black border-b border-[#00050df5]"
                        >
                            Top Rated
                        </NavLink>
                        <NavLink
                            to="/movies/upcoming"
                            className="text-[#aaa] font-medium text-[17px] text-center px-4 py-2 hover:bg-white hover:text-black"
                        >
                            Upcoming
                        </NavLink>
                    </div>
                </div>

                <div
                    className={`mr-[10px] rounded-t-md ${tvBoxHover ? "bg-[#202c3fd0]" : "bg-transparent"
                        }`}
                    onMouseLeave={() => setTvBoxHover(false)}
                >
                    <div
                        className="flex items-center justify-center py-[10px] w-[120px]"
                        onMouseEnter={() => setTvBoxHover(true)}
                    >
                        <button
                            type="button"
                            className={`font-bold text-[17px] bg-transparent border-none ${tvBoxHover ? "text-white" : "text-[#5c5c5c]"
                                }`}
                        >
                            TV Series
                        </button>
                        <IoIosArrowDown
                            className={`ml-1 transition-transform duration-500 ${tvBoxHover ? "rotate-180 text-white" : "text-gray-400"
                                }`}
                        />
                    </div>
                    <div
                        className={`absolute flex flex-col rounded-b-md shadow-[0_0_2px_2px_#00050df5] bg-[#202c3fd0] transition-all duration-300 ease-in-out ${tvBoxHover
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 -translate-y-2 invisible"
                            }`}
                    >
                        <NavLink
                            to="/tv-series/popular"
                            className="text-[#aaa] font-medium text-[17px] text-center px-4 py-2 hover:bg-white hover:text-black border-b border-[#00050df5]"
                        >
                            Popular
                        </NavLink>
                        <NavLink
                            to="/tv-series/top_rated"
                            className="text-[#aaa] font-medium text-[17px] text-center px-4 py-2 hover:bg-white hover:text-black border-b border-[#00050df5]"
                        >
                            Top Rated
                        </NavLink>
                        <NavLink
                            to="/tv-series/on_the_air"
                            className="text-[#aaa] font-medium text-[17px] text-center px-4 py-2 hover:bg-white hover:text-black"
                        >
                            On The Air
                        </NavLink>
                    </div>
                </div>
            </nav>

            <button
                type="button"
                onClick={onLogout}
                className="ml-[20px] rounded-md bg-[#a9a9a9] px-[15px] py-[10px] font-bold text-black hover:bg-gray-500 transition-colors"
            >
                Logout
            </button>
        </header>
    )
}

export default Header