import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import {Link} from 'react-router-dom'

export const SliderContainer = styled.ul`
    padding: 0;
    color: aliceblue;
`;

export const Loader = styled(TailSpin)`
color: #ffffff;
font-size: 20px;
`;

export const TrendingPosterContainer = styled.li`
display: flex !important;
`;

export const PosterDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
    padding: 20px;
`;

export const TrendingMovieTitle = styled.p`
    margin: 0;
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;
`;

export const TrendingMovieTagline = styled.p`
    margin: 0;
    margin-top: 10px;
    text-align: center;
    color: gray;
`;

export const TrendingMovieOverviewTitle = styled.p`
    margin: 0;
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
    color: #a9a9a9;
`;

export const TrendingMovieOverview = styled.p`
    font-size: 15px;
    height: 100px;
    color: gray;
    margin: 0;
    margin-top: 10px;
`;

export const TrailerDetailsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
    cursor: pointer;
`;

export const MoreDetailsButton = styled.button`
    padding: 15px 15px;
    background-color: aliceblue;
    border: none;
    border-radius: 5px;
    color: black;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    margin-right: 100px;
    &:hover{
        transform: scale(1.1);
    background-color: aquamarine;
    }
`;

export const MoreDetailsLink = styled(Link)`
    text-decoration: none;
    color: #000000;
`

export const TrailerText = styled.p`
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
`;

export const TrendingPoster = styled.img`
width: 700px;
    height: auto;
    border-radius: 5px;
    &::after{
        opacity: 0.1;
    background-image: linear-gradient(to right, transparent, black);
    }
`;

