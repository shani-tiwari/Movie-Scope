import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Loading from './Loading';
import TopNav from './TopNav';
import DropDown from './DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards  from './VerticalCards';


function Movies() {


    const navigate                = useNavigate();
    const [page, setPage]         = useState(1);
    const [movies, setMovies]   = useState([]);
    const [category, setCategory] = useState('now_playing'); 
    const [HasMore, setHasMore]   = useState(true);
    

    document.title = `Movies App | Movies` ;


    const GetMoviesData = async() =>{
        try {
            // movies only run on, tv or movie and not on all category. coz all can't be movies  obviouslyyyyyyy
          const {data} = await axios.get(`movie/${category}?page=${page}`);
        //   setTrending(data.results);
        //   setTrending( (prev)=> [...prev, ...data.results] );
            
            if(data.results.length > 0){

                setMovies((prev) => [
                    ...prev, 
                    ...data.results,
                    // ...data.results.filter((item) => !prev.some((prevItem) => prevItem.id !== item.id))
                    // causing -> not loading data
                    // code auto changes page count on scroll, and then function called with next page, so new data every time...
                ]);   
                setPage(page + 1);
            }
            else{
                setHasMore(false);
            }

            // console.log(trending);
        } catch (error) {
          console.log(error); 
        }
      }


      const RefreshHandler = () => {
        if(movies.length === 0) {GetMoviesData();}
        else {
            setPage(1);
            setMovies([]);
            GetMoviesData();
        }
      }

      useEffect(()=>{
        //  GetTrendingData();
           RefreshHandler();
      },[category] );



  return movies.length > 0 ? 
    (
      <div className='w-screen p-[2%] select-none flex flex-col items-center '>

          <div className='w-[90%]  fixed z-50 flex justify-between items-center rounded-full backdrop-blur-sm shadow-md shadow-slate-500 px-4 py-1 '>

              <h1 className='text-xl md:text-3xl text-zinc-300  '>
                  <i 
                   onClick={()=> navigate(-1)}
                   className=" text-zinc-300 text-xl md:text-3xl hover:text-[#6556CD] duration-300 ri-arrow-left-circle-line mr-4 shadow-white ">                    
                  </i>
                  Movies 
              </h1>

              <div className=' w-[60%]  flex justify-end ' >

                  <DropDown title='movies' options={['now_playing', 'upcoming', 'popular', 'top_rated']} 
                   func={ (e)=> setCategory(e.target.value)}
                  />
              </div>

          </div>


          <InfiniteScroll
           hasMore={HasMore}
           loader={ <Loading/>}
           next={GetMoviesData}
           dataLength={movies.length}
          >
              {/* cards */}
              <VerticalCards data={movies} title='movie' />
          </InfiniteScroll>



      </div>

    ) : 
    ( <Loading/> )
}

export default Movies