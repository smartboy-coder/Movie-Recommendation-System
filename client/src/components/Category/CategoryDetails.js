import React, { useMemo } from "react";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useDetails } from "../../api/api";
import Error from "../Error";

const basePath = "https://image.tmdb.org/t/p/w500/";

const CategoryDetails = (props) => {
  const { id } = props;
  const { data: movieData, error: movieDataError } = useDetails("movie", id);

  const {
    title = "",
    overview: rawOverview = "",
    backdrop_path: backdropPath = "",
    release_date: releaseDate = "",
    runtime = 0,
    type = "",
  } = movieData || {};

  const hours = useMemo(() => Math.floor((runtime || 0) / 60), [runtime]);
  const minutes = useMemo(() => (runtime || 0) % 60, [runtime]);
  const overview = useMemo(() => (rawOverview || "").slice(0, 100), [rawOverview]);
  const image = useMemo(() => (backdropPath ? `${basePath}${backdropPath}` : "https://via.placeholder.com/300x170?text=No+Image"), [backdropPath]);
  const releaseYear = useMemo(() => (releaseDate ? releaseDate.split("-")[0] : ""), [releaseDate]);
  const duration = useMemo(() => `${hours}${hours > 1 ? "hrs" : "hr"}${minutes === 0 ? "" : ` ${minutes}min`}`, [hours, minutes]);

  if (movieDataError) return <Error />;
  if (!movieData) return <div className="w-[300px] h-[166px] flex justify-center items-center"><TailSpin color="#ffffff" /></div>;

  return (
    <li className="px-2 relative">
      <Link to={`/${type === "Scripted" ? "tv" : "movie"}/${id}`} className="relative">
        <img
          alt={title}
          src={image}
          width={800}
          height={400}
          className="w-[300px] rounded-md transition-transform duration-300 ease-in-out cursor-pointer z-0"
        />
        <div className={`text-center p-2 w-[300px] h-[170px] bg-black border border-black rounded-b-md absolute top-0 z-30 cursor-pointer transition-all duration-500 ease-in-out opacity-0 animate-fadeUp hover:opacity-70 hover:animate-fadeDown`}>
          <p className="text-white m-0 text-center text-[20px] font-bold">{title}</p>
          <p className="text-[#a9a9a9] flex items-center justify-center">{releaseYear} <RxDotFilled /> {duration}</p>
          <p className="text-gray-400">{overview}</p>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(CategoryDetails);