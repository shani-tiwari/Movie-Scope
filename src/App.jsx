import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

// import Trending from './components/templates/Trending'
// import Popular from './components/templates/Popular'
// import TvShows from './components/templates/TvShows'
// import People from './components/templates/People'
// import MovieDetails from './components/templates/MovieDetails'
// import TvDetails from './components/templates/TvDetails'
// import PersonDetails from './components/templates/PersonDetails'
// import Trailer from './components/templates/Trailer'
// import NotFound from './components/templates/NotFound'

import React, { Suspense } from "react";
import Loading from './components/templates/Loading';

const Movies        = React.lazy(() => import('./components/templates/Movies'));
const People        = React.lazy(() => import('./components/templates/People'));
const Popular       = React.lazy(() => import('./components/templates/Popular'));
const Connect       = React.lazy(() => import('./components/templates/Connect'));
const TvShows       = React.lazy(() => import('./components/templates/TvShows'));
const Trailer       = React.lazy(() => import('./components/templates/Trailer'));
const NotFound      = React.lazy(() => import('./components/templates/NotFound'));
const Trending      = React.lazy(() => import('./components/templates/Trending'));
const TvDetails     = React.lazy(() => import('./components/templates/TvDetails'));
const MovieDetails  = React.lazy(() => import('./components/templates/MovieDetails'));
const PersonDetails = React.lazy(() => import('./components/templates/PersonDetails'));


function App() {

  return (
    <>
        <div className=' bg-slate-950 w-screen overflow-x-hidden  flex ' >
          <Suspense fallback={<Loading/>} >
            <Routes>

                <Route path='/' element={<Home/>} />
                <Route path='/popular' element={<Popular/>} />
                <Route path='/trending' element={<Trending/>}/>


        {/* not working in this wayyy, we can use Outlet or make them seprate */}

                {/* <Route path='/movie' element={<Movies/>} >
                    {/* <Route path='details/:id' element={ <MovieDetails/> } />
                </Route>

                <Route path='/people' element={<People/>} > 
                    <Route path='details/:id' element={ <PersonDetails/> } />
                </Route>

                <Route path='/tv' element={<TvShows/>} >
                  <Route path='details/:id' element={ <TvDetails/> } />
                </Route> */} 


                <Route path='/movie' element={<Movies/>} />
                    {/* <Route path='/details/:id' element={ <MovieDetails/> } />   -->> this is a absoulute path  */}
                <Route path='/movie/details/:id' element={ <MovieDetails/> } >
                    <Route path="/movie/details/:id/trailer" element={ <Trailer/> } />
                </Route>


                <Route path='/people' element={<People/>} /> 

                <Route path='/people/details/:id' element={ <PersonDetails/> } /> 

                <Route path='/tv' element={<TvShows/>} />
                <Route path='/tv/details/:id' element={ <TvDetails/> } >
                  <Route path='/tv/details/:id/trailer' element={<Trailer/>} />
                </Route>

                <Route path='/connect' element={<Connect/>} />

                <Route path='*' element={<NotFound/>} />  
                  {/* wild card route with asterick, always in last.... */}


            </Routes>

          </Suspense>
          
        </div>
    </>
  )
}

export default App
