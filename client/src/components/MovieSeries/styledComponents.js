import styled,{css} from "styled-components";
import { TailSpin } from 'react-loader-spinner';
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';
import { CiFileOff } from 'react-icons/ci'
import {Link} from 'react-router-dom'

export const MovieSeriesContainer = styled.div`
display: flex;
    flex-direction: column;
    background-color: #00050d;
    overflow: auto;
    padding: 0px 20px;
`;

export const CategoriesSearchContainer = styled.div`
display: flex;
 align-items: center;
 margin-top: 20px;
 margin-left: auto;
`;

export const MovieCategory = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: #aaa;
    margin: 5px 300px 5px 0px;
`

export const SearchResult = styled.p`
    font-size: 25px;
    font-weight: 500;
    color: rgb(105, 105, 128);
    margin: 5px 300px 5px 0px;

`;

export const SearchContainer = styled.div`
float: right;
    background-color: #ffffff;
    padding: 10px 15px;
    margin: 5px 0px;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    color: black;
`;

export const SearchInput = styled.input`
    color: black;
    outline: none;
    border: none;
    font-size: 15px;

    &.placeholder{
        color: black;
    }
`;

export const SearchIcon = styled(AiOutlineSearch)`
`;

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Loader = styled(TailSpin)`
color: #ffffff;
width: 50px;
height: 50px;
`;

export const MovieSeriesBox = styled.div`
    margin: 0;
    margin-bottom: 69px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    padding: 20px 0px;
`;

export const MovieSeriesListContainer = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 0;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 57vh;
`;

export const NotFoundImage = styled(CiFileOff)`
color: #ffffff;
font-size: 80px;
`

export const NotFoundText = styled.p`
    font-size: 25px;
    font-weight: bold;
    color: #ffffff;

`;

export const PosterContainer = styled.li`
    width: 220px;
    margin: 20px;
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
    text-align: center;
`

export const PageContainer = styled.div`
    margin-right: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ArrowButtonStyle = css`
    background-color: rgb(105, 105, 128);
    border-radius: 5px;
    padding: 5px;
    border-radius: 5px;
    width: 15px;
    height: 15px;
    margin: 0px 5px;
`;

export const LeftArrowButton = styled(AiOutlineLeft)`
    ${ArrowButtonStyle}
    opacity: ${props=>props.$ispagegreater?'1':'0.3'};
    color: ${props=>props.$ispagegreater?'#ffffff':''};
    cursor: ${props=>props.$ispagegreater?'pointer':'not-allowed'};
`;


export const RightArrowButton = styled(AiOutlineRight)`
    ${ArrowButtonStyle}
    opacity: ${props=>props.$ispagelesser?'1':'0.3'};
    color: ${props=>props.$ispagelesser?'#ffffff':''};
    cursor: ${props=>props.$ispagelesser?'pointer':'not-allowed'};
`

export const PageButton = styled.button`
    border: none;
    padding: 5px;
    border-radius: 5px;
    width: 25px;
    height: 25px;
    margin: 0px 5px;
    cursor: pointer;
    background-color: ${(props)=>props.$ispageactive?'#ffffff':'#5c5c5c'};
    color: ${(props)=>props.$ispageactive?'#000000':'#aaa'};
`;


export const PosterLink = styled(Link)`
`
