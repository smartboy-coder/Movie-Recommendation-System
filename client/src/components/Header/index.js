import Cookies from 'js-cookie'
import { FaCirclePlay } from "react-icons/fa6";

import {
    HeaderContainer,
    TitleContainer,
    Title,
    NavContainer,
    StyledNavLink, LogoutButton, CategoryBox, FilmBox, Categories, CategoryButton, DownArrow
} from './styledComponent'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate()
    const onLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true })
    }

    const [movieBoxHover, setMovieBoxHover] = useState(false)
    const [TvBoxHover, setTvBoxHover] = useState(false)


    return (
        <HeaderContainer >
            <TitleContainer>
                <FaCirclePlay size={28} />
                <Title>FilmyPalace</Title>
            </TitleContainer>
            <NavContainer>
                <StyledNavLink to='/' className="home-link">Home</StyledNavLink>
                <CategoryBox $ishover={movieBoxHover} onMouseLeave={() => setMovieBoxHover(false)} >
                    <FilmBox $ishover={movieBoxHover} onMouseEnter={() => setMovieBoxHover(true)} >
                        <CategoryButton type='button' $ishover={movieBoxHover} to='/movies'>Movies</CategoryButton>
                        <DownArrow $ishover={movieBoxHover} />
                    </FilmBox>
                    <Categories $ishover={movieBoxHover}>
                        <StyledNavLink to='/movies/popular'>Popular</StyledNavLink>
                        <StyledNavLink to='/movies/top_rated'>Top Rated</StyledNavLink>
                        <StyledNavLink to='/movies/upcoming'>Upcoming</StyledNavLink>
                    </Categories>
                </CategoryBox>
                <CategoryBox $ishover={TvBoxHover} onMouseLeave={() => setTvBoxHover(false)} >
                    <FilmBox $ishover={TvBoxHover} onMouseEnter={() => setTvBoxHover(true)} >
                        <CategoryButton type='button' $ishover={TvBoxHover} to='/tv-series'>TV Series</CategoryButton>
                        <DownArrow $ishover={TvBoxHover} />
                    </FilmBox>
                    <Categories $ishover={TvBoxHover}>
                        <StyledNavLink to='/tv-series/popular'>Popular</StyledNavLink>
                        <StyledNavLink to='/tv-series/top_rated'>Top Rated</StyledNavLink>
                        <StyledNavLink to='/tv-series/on_the_air'>On The Air</StyledNavLink>
                    </Categories>
                </CategoryBox>
            </NavContainer>
            <LogoutButton type='button' onClick={onLogout}>Logout</LogoutButton>
        </HeaderContainer>
    )
}

export default Header