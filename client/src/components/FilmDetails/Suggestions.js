import React, { useMemo } from 'react';
import Slider from "react-slick";
import { TailSpin } from "react-loader-spinner";
import Error from "../Error";
import { Link } from 'react-router-dom';
import { useSimilar } from '../../api/api';

const basePath = "https://image.tmdb.org/t/p/w500/";

const topMovieSettings = {
    autoplay: true,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 4,
};

const Suggestions = (props) => {
    const { route, id } = props;

    const { data: similar, error: similarError } = useSimilar(route, id);

    const similarFilms = useMemo(() => {
        if (!similar || !Array.isArray(similar)) return [];
        return similar
            .filter(film => film.poster_path)
            .map(({ id, title, name, poster_path }) => ({
                id,
                title: route === "movie" ? title : name,
                imageUrl: `${basePath}${poster_path}`,
            }));
    }, [similar, route]);

    if (similarError) return <Error />;
    if (!similar) return <div className='h-[400px] w-full flex justify-center items-center'><TailSpin color="#ffffff" /></div>;

    return (
        <>
            <h1 className="text-white font-bold text-[25px] mt-5">Similar Movies</h1>
            <div className="p-10">
                <Slider {...topMovieSettings}>
                    {similarFilms.map((film) => (
                        <div key={film.id} className="w-[220px] m-[10px]">
                            <Link to={`/${route}/${film.id}`}>
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
        </>
    );
}

export default React.memo(Suggestions);