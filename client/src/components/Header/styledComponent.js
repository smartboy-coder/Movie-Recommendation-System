import styled,{css, keyframes} from "styled-components";
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";


export const HeaderContainer = styled.div`
position: sticky;
top: 0;
z-index: 3;
display: flex;
padding: 15px 30px;
align-items: center;
background-color: #00050df5;
border-bottom: 2px solid black;
box-shadow: 0px 0px 20px 20px #00050df5;
`;

export const TitleContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    color: aquamarine;
`;

export const Title = styled.h2`
margin: 0px 10px;
    font-family: "Serif";
    font-weight: bold;
    font-size: 25px;
`;

export const NavContainer = styled.nav`
margin-left: auto;
display: flex;
align-items: center;
font-family: "Amazon Ember",Arial,sans-serif;
`;

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    font-weight: bold;
    font-size: 17px;
    color:#aaa;
    cursor: pointer;
    font-size: 17px;
    padding: 10px 0px;
    width: 120px;
    font-weight: 500;
    border-bottom: 1px solid #00050df5;
    text-align: center;
    &:hover{
        background-color: #ffffff;
        color: #000000;
    }
    &.home-link{
    cursor: pointer;
    color:#5c5c5c;
    font-weight: bold;
    margin-right: 10px;
    border-radius: 5px;
    padding: 10px 15px;
    width: auto;
    border-bottom: none;

    &:hover{
        background-color: #5c5c5c;
        color: #ffffff;
    }
    }
    
`;

export const LogoutButton = styled.button`
    border: none;
    outline:none;
    background-color: #a9a9a9;
    padding:10px 15px;
    border-radius: 5px;
    margin-left: 20px;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        
        background-color: gray;
    }
`

export const CategoryBox = styled.div`
margin-right: 10px;
background-color: ${props => props.$ishover ? '#5c5c5c' : 'transparent'};
border-radius: 5px 5px 0px 0px;
`

export const FilmBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 10px 0px;
width: 120px;
`

const scaleAnimation = keyframes`
  0% {
    opacity:0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleAnimation2 = keyframes`
  0% {
    opacity:1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const Categories = styled.div`

position: absolute;
display: ${props => props.$ishover ?'flex':'none'};
flex-direction: column;
opacity:${props => props.$ishover ? '1' : '0'};
transition: animation 0.3s ease-in-out;
animation: ${props=>(props.$ishover?css`${scaleAnimation} 0.3s ease-in-out`:css`${scaleAnimation2} 0.3s ease-in-out`)};
background-color: #5c5c5c;
border-radius: 0px 0px 5px 5px;
box-shadow: 0px 0px 2px 2px #00050df5;
`

export const CategoryButton = styled.button`
    font-weight: bold;
    font-size: 17px;
    color:  ${props => props.$ishover ? '#ffffff' : '#5c5c5c'};
    background-color: transparent;
    border: none;
`

export const DownArrow = styled(IoIosArrowDown)`
color: ${props => props.$ishover ? '#ffffff' : 'gray'};
  transition: transform 0.5s ease-in-out;
  transform: ${props => props.$ishover ? 'rotate(180deg)' : ''};
  
`