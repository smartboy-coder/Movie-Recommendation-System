import { useParams } from 'react-router-dom'
import MovieSeries from '../MovieSeries'

const Movies = () => {
    const { id } = useParams()

    return (
        <MovieSeries route='movie' category={id} />
    )
}

export default Movies