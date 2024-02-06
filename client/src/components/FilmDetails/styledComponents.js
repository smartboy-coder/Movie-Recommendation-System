import ReactPlayer from 'react-player'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const FilmDetailsContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #00050d;
height: 100vh;
overflow: auto;
`

export const DetailsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

export const DetailsLeftSection = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
`

export const FilmImage = styled.img`
   width: 300px;
   border-radius: 10px;
`

export const FilmName = styled.p`
font-weight: 500;
    font-size: 40px;
    color: #ffffff;
    margin: 0;
    margin-top: 10px;
`

export const FilmTagLine = styled.p`
    color: gray;
    margin: 0;
    margin-top: 10px;
`

export const DetailsRightSection = styled.div`
width: 750px;

`
export const FilmOverviewTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
    color: #a9a9a9;
`

export const FilmOverview = styled.p`
font-size: 15px;
    height: 100px;
    color: gray;
    margin: 0;
    margin-top: 10px;

`

export const FilmRuntime = styled.p`
color: #aaa;
`

export const FilmGenres = styled.p`
color: #aaa;

`

export const VideoPlayer = styled(ReactPlayer)`
    width: 100px;
`

export const TrailerText = styled.p`
 padding: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
`

export const HorizontalLine = styled.hr`
    width: 95%;
    font-size: 2px;
    margin-top: 40px;
    margin-left: 40px;
`

export const CastDetailsContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: white;
        width: 100%;
        flex-wrap: wrap;
`

export const CastHeading = styled.h1`
color: gray;
    padding-left: 50px;
    margin: 0;
    margin-top: 20px;
`

export const CastDetails = styled.ul`
display: flex;
flex-wrap: wrap;
list-style-type: none;

`

export const Cast = styled.li`
    text-align: center;
margin: 0px 10px;

`

export const CastImage = styled.img`
width: 190px;
border-radius: 10px;
`

export const CastName = styled.p`
color: darkgray;
    font-size: 20px;
    text-align: center;
`

export const SimilarMovieDetails = styled.div`

    padding: 40px;
`
export const SimilarMoviesTitle = styled.h1`
color: gray;
    padding-left: 50px;
    margin: 0;
    margin-top: 20px;
`

export const PosterContainer = styled.div`
    width: 220px;
    margin: 10px;
`;

export const PosterImage = styled.img`
    width: 220px;
    height: 330px;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover{
        transform: scale(1.1);
    }
`;

export const PosterTitle = styled.p`
    color: darkgray;
    font-size: 20px;
    width: 220px;
    text-align: center;
`

export const PosterLink = styled(Link)`
`

export const HomeLink = styled(Link)`
    margin: 50px;
`