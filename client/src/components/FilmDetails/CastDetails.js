import React, { useMemo } from 'react';
import { TailSpin } from "react-loader-spinner";
import Error from "../Error";
import { useCast } from '../../api/api';

const basePath = "https://image.tmdb.org/t/p/w500/";

const CastDetails = (props) => {
    const { route, id } = props;

    const { data: cast, error: castError } = useCast(route, id);

    const filteredActors = useMemo(() => {
        if (!cast || !Array.isArray(cast)) return [];
        return cast
            .filter(c => c.known_for_department === "Acting" && c.profile_path)
            .slice(0, 12)
            .map(({ name, profile_path }) => ({
                name,
                image: `${basePath}${profile_path}`,
            }));
    }, [cast]);

    if (castError) return <Error />;
    if (!cast) return <div className='h-[400px] w-full flex justify-center items-center'><TailSpin color="#ffffff" /></div>;

    return (
        <div className="flex flex-col items-start text-white w-full flex-wrap">
            <h1 className="text-white font-bold text-[25px] mt-5">Cast</h1>
            <ul className="flex flex-wrap list-none">
                {filteredActors.map((actor) => (
                    <li key={actor.name} className="text-center m-[10px]">
                        <img
                            alt={actor.name}
                            src={actor.image}
                            className="w-[190px] rounded-xl"
                        />
                        <p className="text-gray-400 text-[20px] text-center mt-2">
                            {actor.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default React.memo(CastDetails);