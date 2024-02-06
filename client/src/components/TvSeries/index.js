import { useParams } from 'react-router-dom'
import MovieSeries from "../MovieSeries";

const TvSeries = ()=>{
    const {id} = useParams()

    return(
<MovieSeries route='tv' category={id}/>
    )

}

export default TvSeries