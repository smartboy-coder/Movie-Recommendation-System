import Cookies from 'js-cookie'
import Category from '../Category';
import Trending from '../Trending';
import Header from '../Header';

import {
    HomeContainer,
    TrendingMoviesContainer,
    CategoriesContainer,
    CategoryContainer,
    CategoryText
} from './styledComponent'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomeCategories = [
    {
        id: 1,
        category: 'Action Movies',
        movieIds: [24, 76341, 155, 603, 36557, 299534, 98, 245891, 562, 955, 872906, 298618, 385687, 361743, 94329, 1271, 98, 752623, 438631, 137113, 550988, 72190, 436969]
    },
    {
        id: 2,
        category: 'Horror Movies',
        movieIds: [138843, 9552, 23437, 539, 948, 4232, 9373, 419430, 11906, 794, 346364, 493922, 713704, 968051, 250546, 14001, 406563, 447332, 242224, 1008042, 974931]
    },
    {
        id: 3,
        category: 'Adventure Movies',
        movieIds: [284054, 218, 85, 665, 392, 8358, 284053, 157336, 120, 12445, 2454, 76600, 19995, 507086, 254, 36557, 89, 101299, 871533, 9543]
    },
    {
        id: 4,
        category: 'Comedy Movies',
        movieIds: [813, 872, 391713, 3082, 935, 762, 6471, 525, 505600, 8699, 18785, 8363, 16996, 41733, 987917, 746036, 346698, 787781, 1022796, 976573, 9637]
    },
    {
        id: 5,
        category: 'Drama Movies',
        movieIds: [13, 389, 278, 14, 424, 240, 769, 510, 497, 70, 466272, 313369, 290, 188222, 45225, 1249, 762504, 117553]
    },
    {
        id: 6,
        category: 'Most Watched Shows On Netflix',
        movieIds: [76669, 71446, 81356, 78191, 94796, 1402, 1396, 64254, 1424, 42009, 70523, 61889, 71912, 66788, 72844, 69740]
    },
    {
        id: 7,
        category: 'Most Watched Shows On Hotstar',
        movieIds: [87108, 62852, 63247, 1407, 54344, 85552, 46648, 1413, 66292, 84661, 4613, 1405, 47640, 82856, 1438, 73107, 1406]
    },
    {
        id: 8,
        category: 'Most Watched Shows On Prime',
        movieIds: [76479, 86248, 93352, 84105, 103051, 1418, 71728, 2316, 62560, 5920, 96421, 1622, 46896]
    }
]

const trendingMovies = [872585, 609681, 507089, 792293, 945729]

const Home = () => {
    const navigate = useNavigate()
    const jwtToken = Cookies.get('jwt_token')
    useEffect(()=>{
    if(jwtToken === undefined){
        navigate('/login',{replace:true})
    }
    },[navigate,jwtToken])
    return (
        <>
        <Header/>
        <HomeContainer >
            <TrendingMoviesContainer >
                <Trending movieIds={trendingMovies} />
            </TrendingMoviesContainer>

            <CategoriesContainer >
                {
                    HomeCategories.map(eachCategory => (
                        <CategoryContainer key={eachCategory.id} >
                            <CategoryText >{eachCategory.category}</CategoryText>
                            <Category movieIds={eachCategory.movieIds} isMovie={eachCategory.id <= 5 ? true : false} />
                        </CategoryContainer>
                    ))
                }
            </CategoriesContainer>
        </HomeContainer>
        </>
    )

}

export default Home