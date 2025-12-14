import React from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FilmDetails from "./FilmDetails";
import CastDetails from "./CastDetails";
import Suggestions from "./Suggestions";


const AllFilmDetails = () => {

    const { id } = useParams();

    const location = useLocation();
    const route = location.pathname.split('/')[1];

    return (
        <div className="flex flex-col bg-[#00050d] h-screen overflow-auto">
            <div className='flex flex-col p-10'>
                <Link to="/" className="h-auto">
                    <FaArrowAltCircleLeft color="gray" size={30} />
                </Link>
                <FilmDetails route={route} id={id} />
                <hr className="border border-[#2b2b2b] mt-10" />
               <CastDetails route={route} id={id} />
                <hr className="border border-[#2b2b2b] mt-10" />
               <Suggestions route={route} id={id} />
            </div>
        </div>
    );

}

export default React.memo(AllFilmDetails);