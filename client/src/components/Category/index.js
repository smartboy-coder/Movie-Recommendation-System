import React, { useMemo } from "react";
import { TailSpin } from "react-loader-spinner";
import { useGenres, useAllPopularMovies } from "../../api/api";
import Error from "../Error";
import Categories from "./Categories";

const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Family",
    "Horror",
    "Science Fiction",
    "Fantasy",
];

const CategoryContainer = () => {
    const { data: allGenres = [] } = useGenres();
    const { data: allMovies, error: allMoviesError } = useAllPopularMovies();

    const genreList = useMemo(() => {
        if (!allGenres) return [];
        return (allGenres || []).filter((g) => genres.includes(g.name))

    }, [allGenres]);

    const categories = useMemo(() => {
        if (!genreList || !allMovies) return [];
        return genreList.map((genre) => {
            const movieIds = [];
            for (const p of allMovies) {
                if (p.genre_ids?.includes(genre.id) && p.overview) movieIds.push(p.id);
            }
            return { id: genre.id, name: genre.name, movieIds };
        });
    }, [genreList, allMovies]);

    if (allMoviesError) return <Error />;
    if (!allMovies) return <TailSpin color="#ffffff" />;

    return (
        <ul className="list-none m-0 px-[50px] py-[10px] bg-[#00050d]">
            {categories.map((category) => (
                <Categories key={category.id} category={category} />
            ))}
        </ul>
    );
};

export default React.memo(CategoryContainer);