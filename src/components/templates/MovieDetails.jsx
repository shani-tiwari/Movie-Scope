import { useEffect } from 'react'
import { asyncLoadMovies, removeMovie } from '../app/actions/movieActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading'
import '../../index.css'
import HorizontalCards from './HorizontalCards'


function MovieDetails() {

    const {pathname} = useLocation()
    // we extracting value here, not creating variable, sp predefined name should given like - pathname, and not pathName etc...
    const { id }     = useParams();
    const dispatch   = useDispatch();
    const navigate   = useNavigate();
    const { info }   = useSelector( state => state.movie );

    // console.log(info);
    // console.log(id);

    useEffect( () => {
        dispatch(asyncLoadMovies(id));
        return () => {
          dispatch(removeMovie());  // previous data/movie will be removed and recently clicked movie details appear
        }
    }, [id]);


  return info ?  (
            <div style={{
                    background: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path} ) `,  
                    backgroundPosition: "center",  // center --> "center" 
                    backgroundSize: "cover",
                 }} 
                 className='relative h-full opacity-[0.9] w-screen px-[5%] md:px-[10%]  bg-slate-950 text-zinc-400 object-fill select-none '>

                    <nav className=' h-[10vh] w-full text-zinc-200 text-xl flex items-center justify-start gap-9 '>

                        <Link
                          onClick={()=> navigate(-1)}
                          className= " text-xl md:text-3xl hover:text-[#6556CD] duration-300 ri-arrow-left-circle-line mr-4 shadow-white ">                    
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


                    <div className='w-full flex max-md:flex-col '>

                        <img 
                          alt="loading.." 
                          src={`https://image.tmdb.org/t/p/original/${info.poster_path || info.detail.backdrop_path}`} 
                          className=' md:block max-md:w-full h-[50vh] w-[40vh] border-2 object-fill rounded-lg hover:shadow-[8px_17px_32px_2px_`rgba(0,0,0,.5)] z-10 hover:scale-105 duration-300  '
                        />


                        <div className='content md:ml-8 text-white '>

                              <h1 className=' text-2xl md:text-5xl font-bold '> 
                                { info.detail.title || info.detail.oroginal_name || info.detail.original_title }

                                <small className=' text-base md:text-2xl text-zinc-200 font-bold ' >
                                    ({info.detail.release_date.split("-")[0]})
                                </small>
                              </h1>

                              <div className='flex items-center gap-x-5 gap-y-7 md:gap-y-10 mt-3 mb-5  '>

                                    <span className='z-40 text-white text-md overflow-hidden min-w-[6vh] min-h-[6vh] flex justify-center items-center bg-yellow-700 rounded-full font-semibold '>
                                        { (info.detail.vote_average* 10).toFixed() } <sup>%</sup>
                                    </span>

                                  <h1 className='hidden md:block font-semibold text-lg md:text-2xl w-[60px] leading-6 '> Users Score </h1>
                                  <h4 className=' text-base md:text-2xl '> { info.detail.release_date } </h4>
                                  <h1> { info.detail.genres.map( (g) => g.name ).join(", ") } </h1>
                                  <h1> { info.detail.runtime} min </h1>

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

                              <Link className='px-7 py-2 md:px-12 md:py-3 bg-slate-950 rounded-lg border hover:scale-110 duration-300 text-base md:text-xl ' 
                                to={`${pathname}/trailer`}>
                                    <i className="ri-play-circle-line"></i> Play Trailer
                              </Link>

                        </div>

                    </div>


                    {/* card  */}
                    <div className=' w-[80%] flex flex-col gap-y-5 font-semibold text-xl mt-4 '>

                              {
                                  info.watchProviders && info.watchProviders.flatrate && (

                                    <div className='flex gap-x-10 items-center text-white  '>
                                        <h1> Watch here : </h1>
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

                  <h1 className=' text-lg md:text-3xl font-bold text-white mt-3 mb-2  '> Recommandations & Similar : </h1>
                  <HorizontalCards data={ info.recommendations.length > 0 ? info.recommendations : info.similar } /> 


                   <Outlet />   

            </div>
  ) : <Loading/>
}

export default MovieDetails