import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryDetails from "./CategoryDetails";

const TopMovieSettings = {
  autoplay: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const Categories = ({ category = {} }) => {
  const ids = category.movieIds || [];
  if (!ids.length) return null;

  return (
    <li className="mt-[30px]">
      <p className="text-[25px] font-medium text-[#a9a9a9] m-0 relative z-0">{category.name}</p>
      <ul>
        <Slider {...TopMovieSettings}>
          {ids.map((id) => (
            <CategoryDetails key={id} id={id} />
          ))}
        </Slider>
      </ul>
    </li>
  );
};

export default React.memo(Categories);
