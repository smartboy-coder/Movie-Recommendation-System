import styled, {keyframes} from "styled-components";
import {AiFillCloseCircle} from 'react-icons/ai'

export const PopupContainer = styled.div`

`;

export const WatchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #00050d;
    background-color: #ffffff;
    border-radius: 50%;
    font-size: 30px;
    padding: 10px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover{
        transform: scale(1.1);
        background-color: aqua;
    }
`;



export const VideoPlayerContainer = styled.div`
        display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
`;

const scaleAnimation = keyframes`
  0% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const CloseIcon = styled(AiFillCloseCircle)`
    color: #ffffff;
    font-size: 40px;
    animation: ${scaleAnimation} 1s ease-in-out;
`;

export const VideoPlayer = styled.div`
    border: 1px solid #ffffff;
    width: fit-content;
`;

