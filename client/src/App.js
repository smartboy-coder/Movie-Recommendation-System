import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Movies from './components/Movies'
import TvSeries from './components/TvSeries'
import './App.css'
import Login from './components/Login'
import SignUp from './components/Signup'
import FilmDetails from './components/FilmDetails'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/movies'  >
          <Route path=':id' element={<Movies />} />
        </Route>
        <Route path='/movie/details'>
          <Route path=':id' element={<FilmDetails />} />
        </Route>
        <Route path='/tv-series' >
          <Route path=':id' element={<TvSeries />} />
        </Route>
        <Route path='/tv/details'>
          <Route path=':id' element={<FilmDetails />} />
        </Route>
        <Route path='/details' element={<FilmDetails />} />
      </Routes>

    </>
  )
}

export default App