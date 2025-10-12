import React from 'react'
import { useEffect } from 'react'
import { asyncLoadtv, removetv } from '../app/actions/tvActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading'
import '../../index.css'
import HorizontalCards from './HorizontalCards'


function tvDetails() {

    const {pathname} = useLocation()
    // we extracting value here, not creating variable, sp predefined name should given like - pathname, and not pathName etc...
    const { id }     = useParams();
    const dispatch   = useDispatch();
    const navigate   = useNavigate();
    const { info }   = useSelector( state => state.tv );


    useEffect( () => {
        dispatch(asyncLoadtv(id));
        return () => {
          dispatch(removetv());  // previous data/movie will be removed and recently clicked movie details appear
        }
    }, [id]);


  return info ?  (
            <div style={{
                    background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path} ) `,  
                    backgroundPosition: "center",  // center --> "center" 
                    backgroundSize: "cover",
                 }} 
                 className='relative h-full w-screen px-4 md:px-[10%]  bg-slate-950 text-zinc-400 object-cover select-none '>

                    <nav className=' h-[10vh] w-full text-zinc-200 text-xl flex items-center justify-start gap-10 '>

                        <Link
                          onClick={()=> navigate(-1)}
                          className= "text-3xl hover:text-[#6556CD] duration-300 ri-arrow-left-circle-line mr-4 shadow-white ">                    
                        </Link>

                        <a 
                        target='_blank' 
                        href={info.detail.homepage}> 
                        <i className="ri-external-link-line hover:text-2xl duration-300 "></i> 
                        </a>

                        <a 
                        target='_blank' 
                        href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}> 
                        <i className="ri-global-line hover:text-2xl duration-300 "></i> 
                        </a>

                        <a 
                        target='_blank' 
                        href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
                        className='hover:text-2xl duration-300 '> 
                        IMdB 
                        </a>

                    </nav>
 

                    <div className='w-full flex gap-6 max-md:flex-col max-md:justify-center '>

                        <img 
                          alt="loading.." 
                          src={`https://image.tmdb.org/t/p/original/${info.poster_path || info.detail.backdrop_path}`} 
                          className='w-[80%] h-[50vh] md:h-[50vh] md:min-w-[40vh]  max-md:mx-auto  border-2 object-fill rounded-lg hover:shadow-[8px_17px_32px_2px_`rgba(0,0,0,.5)] z-10 hover:scale-105 duration-300  '
                        />


                        <div className='w-[90%] mx-auto  text-white '>

                              <h1 className='text-2xl md:text-5xl font-bold '> 
                                { info.detail.title || info.detail.original_name || info.detail.original_title }

                                <small className=' text-lg md:text-2xl text-slate-200 font-bold ' >
                                    ({info.detail.first_air_date.split("-")[0]})
                                </small>
                              </h1>

                              <div className=' w-[90%] flex items-center gap-x-3 gap-y-10  justify-start '>

                                    <span className='z-40 text-white text-md overflow-hidden min-w-[6vh] min-h-[6vh] flex justify-center items-center bg-yellow-700 rounded-full font-semibold '>
                                        { (info.detail.vote_average* 10).toFixed() } <sup>%</sup>
                                    </span>

                                  <h1 className='font-semibold text-base md:text-2xl leading-6 hidden md:inline-block'> Rating </h1>
                                  <h3 className=''> { info.detail.first_air_date } </h3>
                                  <h3> { info.detail.genres.map( (g) => g.name ).join(", ") } </h3>

                              </div>

                              <h1 className='text-xl font-semibold italic text-zinc-200  '> { info.detail.tagline } </h1>

                              <h1 className='text-2xl mt-3 mb-3 '>  Overview : 
                                <p className='text-sm leading-5'>
                                  { info.detail.overview } 
                                </p>
                              </h1>


                              <h1 className='text-xl mt-3 mb-5 '>  Dubbed in : 
                                <p className='text-sm leading-5 '>
                                  { info.translations.join(", ") } 
                                </p>
                              </h1>

                              <Link className='px-7 py-2 md:px-12 md:py-3 bg-slate-950 rounded-lg border hover:scale-110 duration-300 text-lg md:text-xl ' 
                                to={`${pathname}/trailer`}>
                                    <i className="ri-play-circle-line"></i> Play Trailer
                              </Link>

                        </div>

                    </div>


                    {/* card  */}
                    <div className=' w-[80%] flex flex-col mt-4 md:mt-7 gap-y-4 font-semibold text-lg md:text-xl'>

                              {
                                  info.watchProviders && info.watchProviders.flatrate && (

                                    <div className='flex gap-x-8 items-center text-white  '>
                                        <h1> Watch on: </h1>
                                          {info.watchProviders.flatrate.map((data) => (
                                            <img key={Math.random()}
                                              title={data.provider_name}
                                              alt="" 
                                              className='w-[5vh] h-[5vh] object-fit rounded  '
                                              src={`https://image.tmdb.org/t/p/original/${data.logo_path}`} 
                                            />
                                          )) }
                                    </div>

                              )}

                              {
                                  info.watchProviders && info.watchProviders.rent && (

                                    <div className='flex gap-x-10 items-center text-white  '>
                                        <h1> For Rent : </h1>
                                          {info.watchProviders.rent.map((data) => (
                                            <img key={Math.random()}
                                              title={data.provider_name}
                                              alt="" 
                                              className='w-[5vh] h-[5vh] object-fit rounded  '
                                              src={`https://image.tmdb.org/t/p/original/${data.logo_path}`} 
                                            />
                                          )) }
                                    </div>

                              )}

                              {
                                  info.watchProviders && info.watchProviders.buy && (

                                    <div className='flex gap-x-10 items-center text-white  '>
                                        <h1>  to buy : </h1>
                                          {info.watchProviders.buy.map((data) => (
                                            <img key={Math.random()}
                                              title={data.provider_name}
                                              alt="" 
                                              className='w-[5vh] h-[5vh] object-fit rounded  '
                                              src={`https://image.tmdb.org/t/p/original/${data.logo_path}`} 
                                            />
                                          )) }
                                    </div>

                              )}

                    </div>

                        
                    <hr className='mt-10 ' />


                  {/* part 4  */}

                  <h1 className=' text-xl md:text-3xl font-bold text-slate-300 mt-4 mb-2  '> Seasons : </h1>
                  {
                    info.detail.seasons ? 
                      <HorizontalCards data={ info.detail.seasons} /> 
                      : <h1 className='text-center content-center text-zinc-400 text-3xl '> No Seasons available </h1>
                  }


                   <Outlet />   


                   <hr className='mt-5 ' />


                  {/* part 5  */}

                  <h1 className=' text-xl md:text-3xl font-bold text-slate-300 mt-4 mb-2  '> Recommandations & Similar : </h1>
                  <HorizontalCards data={ info.recommendations.length > 0 ? info.recommendations : info.similar } /> 
                    {/* {
                      info.recommendations ? info.recommendations : info.similar

                    } */}


                   <Outlet />   


            </div>
  ) : <Loading/>
}

export default tvDetails