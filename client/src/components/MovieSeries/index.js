import { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import {
    MovieSeriesContainer,
    CategoriesSearchContainer,
    SearchResult,
    SearchContainer,
    SearchInput,
    SearchIcon,
    LoaderContainer,
    Loader,
    MovieSeriesBox,
    MovieSeriesListContainer,
    NotFoundContainer,
    NotFoundImage,
    NotFoundText,
    PosterContainer,
    PosterImage,
    PosterTitle,
    PageContainer,
    LeftArrowButton,
    RightArrowButton,
    PageButton,
    MovieCategory,
    PosterLink
} from './styledComponents'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

    const navigate = useNavigate()
    const jwtToken = Cookies.get('jwt_token')
    useEffect(() => {
        if (jwtToken === undefined) {
            navigate('/login', { replace: true })
        }
    }, [navigate, jwtToken])

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
            <MovieSeriesContainer>
                <CategoriesSearchContainer>
                    {
                        !isSearch ? (<MovieCategory>{filmCategory}</MovieCategory>) : (
                            <SearchResult>Results for "{searchInput}"</SearchResult>
                        )
                    }
                    <SearchContainer>
                        <SearchInput type='search' placeholder='search' onKeyDown={onSearchMovies} />
                        <SearchIcon />
                    </SearchContainer>
                </CategoriesSearchContainer>
                {
                    isLoading ? (
                        <LoaderContainer>
                            <Loader color='#ffffff' />
                        </LoaderContainer>)
                        : (
                            <MovieSeriesBox>
                                <MovieSeriesListContainer>
                                    {
                                        getFilmDetails.length === 0 ? (
                                            <NotFoundContainer>
                                                <NotFoundImage />
                                                <NotFoundText>No result found for "{searchInput}"</NotFoundText>
                                            </NotFoundContainer>
                                        ) : (
                                            getFilmDetails.map(film => (
                                                <PosterContainer key={film.id}>
                                                    <PosterLink to={`/${route}/details/${film.id}`}>
                                                        <PosterImage alt={film.title} src={film.imageUrl} />
                                                    </PosterLink>
                                                    <PosterTitle>{film.title}</PosterTitle>
                                                </PosterContainer>
                                            )
                                            )
                                        )
                                    }
                                </MovieSeriesListContainer>
                                {
                                    getFilmDetails.length !== 0 && (
                                        < PageContainer>
                                            <LeftArrowButton $ispagegreater={paginationDetails.page > 1} onClick={decrementPageNumber} />
                                            {
                                                paginationDetails.buttons.map(pageNumber =>
                                                    <PageButton key={pageNumber} type='button' $ispageactive={paginationDetails.page === pageNumber} onClick={() => changepage(pageNumber)} >{pageNumber}</PageButton>
                                                )
                                            }
                                            <RightArrowButton $ispagelesser={paginationDetails.page < paginationDetails.totalPages} onClick={incrementPageNumber} />
                                        </PageContainer>)
                                }
                            </MovieSeriesBox>
                        )
                }
            </MovieSeriesContainer >
        </>
    )

}
export default MovieSeries