// import axios from '../../utils/axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SideNav() {

  // const GetSearch = async() =>{
  //   try {
  //     const d = await axios.get(`/search/multi?query=${query}`);
  //     console.log(d);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(()=>{
  //   GetSearch();
  // })

  // add a toggle icon by which the sidebar can be toggled for only small screens
  const [isToggled, setIsToggled] = useState(false);

  const toggleNav = () => {
    setIsToggled(!isToggled);
  }


  return ( <>
           <div className={`absolute lg:hidden mt-2 w-full h-12 px-5 `}>
             <button onClick={toggleNav} className='p-2 text-white'>
               <i className={`ri-${isToggled? 'menu-unfold-line' :'menu-line' }`}></i>
             </button>
           </div>

        <div className={` w-[18%] h-full sm:hidden lg:block border-r-2 border-zinc-400 p-5 select-none ${isToggled? 'md:inline-block inline-block w-60' : 'hidden'} `}>


            <h1 className='hidden lg:block text-emerald-700 text-2xl font-semibold '> 
                <i className="ri-tv-2-line mr-2 " ></i>
                Tunely 
            </h1>


            {/* <hr className='border-none h-[1px] bg-zinc-400 ' /> */}

            <nav className='flex flex-col text-zinc-400 text-base  md:text-lg lg:text-xl xl:text-2xl  gap-3'>

               <h1 className='text-white font-semibold mt-8 text-xl '> New Feeds </h1>

               <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '> 
                 <i className=" hidden lg:inline-block ri-fire-line mr-2"></i> Trending
               </Link>

               <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '> 
                 <i className="hidden lg:inline-block ri-bard-line mr-2"></i> Popular 
               </Link>

               <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '> 
                 <i className="hidden lg:inline-block ri-slideshow-3-line mr-2"></i> Movies 
               </Link>

               <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '>
                 <i className="hidden lg:inline-block ri-tv-fill mr-2"></i> Tv Shows 
               </Link>

               <Link to='/people' className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '>
                 <i className="hidden lg:inline-block ri-team-fill mr-2"></i> People 
               </Link>

            </nav>

            <hr className='border-none h-[1px] bg-zinc-400 mt-8' />

            <nav className='flex flex-col text-zinc-400 text-lg gap-3'>

               <h1 className='text-white mt-10 font-semibold text-xl '> Website Information </h1>

               <Link className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '> 
                 <i className="hidden lg:inline-block ri-information-line mr-4 "></i>About
               </Link>

               <Link className='hover:bg-[#6556CD] hover:text-white hover:tracking-wider duration-300 p-3 rounded-xl '> 
                 <i className="hidden lg:inline-block ri-phone-fill mr-2 "></i> Connect
               </Link>

            </nav>

        </div>
  </>
  )
}

export default SideNav