import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import MovieSeries from './components/MovieSeries'
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
        <Route path='/movies/:id' element={<MovieSeries route='movie'/>} />
        <Route path='/tv-series/:id' element={<MovieSeries route='tv'/>} />
        <Route path='/movie/:id' element={<FilmDetails />} />
        <Route path='/tv/:id' element={<FilmDetails />} />

      </Routes>

    </>
  )
}

export default App