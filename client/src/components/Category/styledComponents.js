import styled,{css, keyframes} from "styled-components";
import { TailSpin } from "react-loader-spinner";
import { RxDotFilled } from "react-icons/rx";
import {Link} from 'react-router-dom'

export const SliderContainer = styled.ul`
padding: 5px;
`;

export const Loader = styled(TailSpin)`
color: #ffffff;
size: 20px;
`;

export const HomePosterContainer = styled.li`
    width: 90vw;
    padding: 20px;
`;

export const HomePosterImage = styled.img`
    width: 300px;
    height: auto;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    z-index: 0;
`;

const scaleAnimation = keyframes`
  0% {
    opacity:0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 0.7;
    transform: translateY(0);
  }
`;

const scaleAnimation2 = keyframes`
  0% {
    opacity:0.7;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const HomePosterDescription = styled.div`
text-align: center;
    width: 260px;
    height: 160px;
    background-color: black;
    border: 1px solid black;
    padding: 20px;
    border-radius: 0px 0px 5px 5px;
    position: absolute;
    top: 0;
    z-index: 3;
    cursor: pointer;
    opacity: 0;
    transition: animation 0.5s ease-in-out;
    opacity: ${props=>(props.$ishover?'0.7':'0')};
    animation: ${props=>(props.$ishover?css`${scaleAnimation} 0.5s ease-in-out`:css`${scaleAnimation2} 0.5s ease-in-out`)};
`;

export const HomePosterTitle = styled.p`
  color: #ffffff;
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;

export const HomePosterInfo = styled.p`
  color: #a9a9a9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DotIcon = styled(RxDotFilled)`
`;

export const HomePosterOverview = styled.p`
color: darkgray;
`;

export const HomeDetailsLink = styled(Link)`

`