import { useState, useEffect } from 'react';
import Loading from './templates/Loading';
import axios from '../utils/axios';

// import Header from './templates/Header';
// import TopNav from './templates/TopNav';
// import SideNav from './templates/SideNav';
// import DropDown from './templates/DropDown';
// import HorizontalCards from './templates/HorizontalCards';

import React, { Suspense } from 'react';

// Lazy imports for components
const Header          = React.lazy(() => import('./templates/Header'));
const TopNav          = React.lazy(() => import('./templates/TopNav'));
const SideNav         = React.lazy(() => import('./templates/SideNav'));
const DropDown        = React.lazy(() => import('./templates/DropDown'));
const HorizontalCards = React.lazy(() => import('./templates/HorizontalCards'));


function Home() {

    document.title = "Tunely | Home Page" ;

    const [wallpaper, setWallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [filterCategory, setFilterCategory] = useState("all");


    // calling all async functions here, in templates, not good 
    const GetHeaderWallpaper = async() =>{
      try {
        const {data} = await axios.get(`/trending/all/day`);
        // console.log(data);
        let rendomData = data.results[(Math.random()*data.results.length).toFixed()];
        setWallpaper(rendomData);
      } catch (error) {
        console.log(error);
      }
    }


    const GetTrendingData = async() =>{
      try {
        const {data} = await axios.get(`/trending/${filterCategory}/day`);
        // console.log(data);
        // let rendomData = data.results[(Math.random()*data.results.length).toFixed()];
        setTrending(data.results);
      } catch (error) {
        console.log(error); 
      }
    }
    

    useEffect(()=>{
      !wallpaper && GetHeaderWallpaper();
    }, [])
    
    useEffect( ()=> {
      // !trending  && GetTrendingData();
      GetTrendingData();
    }, [filterCategory])
    

  return wallpaper && trending ?  (

    <>
      <Suspense fallback={<Loading/>}>
          <SideNav/>

          <div className='w-full  lg:w-[82%] h-full bg-slate-950 overflow-y-auto overflow-x-hidden select-none'> 
              <TopNav/>

              <Header data={wallpaper} />

                <div className='p-3 flex justify-between '>
                  <h1 className=' text-2xl md:text-3xl text-zinc-300 font-semibold '> Trending </h1>   
                  <DropDown title="All" func={(e) => setFilterCategory(e.target.value)} options={['all', 'tv', 'movie']} />
                </div>

              <HorizontalCards data={trending} />

          </div>
      </Suspense>
    </>
              
  ) : <Loading/>
}

export default Home