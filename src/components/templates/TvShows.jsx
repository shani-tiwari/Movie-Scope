import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Loading from './Loading';
import DropDown from './DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards  from './VerticalCards';


function TvShows() {


    const navigate                = useNavigate();
    const [page, setPage]         = useState(1);
    const [shows, setShows]       = useState([]);
    const [category, setCategory] = useState('airing_today'); 
    const [HasMore, setHasMore]   = useState(true);
    

    document.title = `shows | Tv Shows` ;


    const GetShowsData = async() =>{
        try {
            // shows only run on, tv or movie and not on all category. coz all can't be shows  obviouslyyyyyyy
          const {data} = await axios.get(`tv/${category}?page=${page}`);
        //   setTrending(data.results);
        //   setTrending( (prev)=> [...prev, ...data.results] );
            
            if(data.results.length > 0){

                setShows((prev) => [
                    ...prev, 
                    ...data.results,
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
        if(shows.length === 0) {GetShowsData();}
        else {
            setPage(1);
            setShows([]);
            GetShowsData();
        }
      }

      useEffect(()=>{
        //  GetTrendingData();
           RefreshHandler();
      },[category] );



  return shows.length > 0 ? 
    (
      <div className='w-screen p-[2%] select-none flex flex-col items-center'>

          <div className='w-[90%]  fixed z-50 flex justify-between items-center rounded-full backdrop-blur-sm shadow-md shadow-slate-500 px-4 py-1 '>

              <h1 className='text-xl md:text-3xl text-zinc-300  '>
                  <i 
                   onClick={()=> navigate(-1)}
                   className=" text-zinc-300 text-3xl hover:text-[#6556CD] duration-300 ri-arrow-left-circle-line mr-4 shadow-white ">                    
                  </i>
                  shows 
              </h1>

              <div className=' w-[60%]  flex justify-end ' >
                  <DropDown title={category} options={['on_the_air',, 'popular', 'top_rated', 'airing_today']} 
                   func={ (e)=> setCategory(e.target.value)}
                  />
              </div>

          </div>


          <InfiniteScroll
           hasMore={HasMore}
           loader={ <Loading/>}
           next={GetShowsData}
           dataLength={shows.length}
          >
              {/* cards */}
              <VerticalCards data={shows} title='tv' />
          </InfiniteScroll>



      </div>

    ) : 
    ( <Loading/> )
}

export default TvShows