import styled from "styled-components";

export const HomeContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #00050d;
`;

export const TrendingMoviesContainer = styled.div`
list-style-type: none;
margin: 0;
padding: 10px 50px;
`;

export const CategoriesContainer = styled.ul`
list-style-type: none;
    margin: 0;
    padding: 10px 50px;
`;

export const CategoryContainer = styled.li`
margin-top: 30px;
`;

export const CategoryText = styled.p`
font-size: 25px;
font-weight: 500;
color: #a9a9a9;
margin: 0;
margin-bottom: 20px;
position: relative;
z-index: 0;
`;