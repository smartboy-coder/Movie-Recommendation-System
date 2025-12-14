// import Cookies from 'js-cookie'
import Header from '../Header';
import Trending from "../Trending";
import CategoryContainer from '../Category';


const Home = () => {
    // const navigate = useNavigate()
    // const jwtToken = Cookies.get('jwt_token')
    // useEffect(()=>{
    // if(jwtToken === undefined){
    //     navigate('/login',{replace:true})
    // }
    // },[navigate,jwtToken])

    return (
        <>
            <Header />
            <Trending/>
            <CategoryContainer />
        </>
    )

}

export default Home