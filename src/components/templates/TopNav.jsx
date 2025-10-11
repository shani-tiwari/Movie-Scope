import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
// import noImage from '../../../public/noImage.webp'
import noImage from '../../public/noImage.webp'  // external images should import in this wayyyy.

function TopNav() {

    const [query, setQuery] = useState("");
    // const [searchs, setSearchs] = useState(null);  --->  Reading 'null' by map
    const [searchs, setSearchs] = useState([]);
    // console.log(query);


    const GetSearch = async() =>{
      try {
        const {data} = await axios.get(`/search/multi?query=${query}`);
        // console.log(data);
        setSearchs(data.results);
        // console.log(searchs);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(()=>{
      GetSearch();
    }, [query])
  

  return (
        <div className='absolute top-2 left-[40%] bg-blend-saturation w-[50%] h-[7vh]  flex items-center mx-auto z-50 rounded-full backdrop-blur-sm shadow-md shadow-gray-700 '>

            <i className="ri-search-line text-xl z-100 md:text-3xl text-zinc-400 cursor-pointer ml-3 "></i>
            <input 
              onChange={ (e) => setQuery(e.target.value) }
              value={query}
              type="text" placeholder='Search Movies, Shows...' id='1' name='search-field'
              className='w-[50%] mx-10 py-1  rounded text-xl text-zinc-100 outline-none border-none  bg-transparent selection:bg-transparent ' 
            /> 
            

            {
              query.length > 0 &&  
              <i 
               onClick={ () => setQuery("")}
               className =" text-xl md:text-3xl mr-3 text-zinc-400 ri-close-large-fill cursor-pointer  bg-transparent selection:bg-transparent">
              </i>
            }

            <div className=' absolute max-h-[50vh] bg-[#100d24] top-[90%] left-[6%] rounded-lg overflow-auto '>

                  { searchs.map( (item, idx) => (              
                      <Link 
                        to={`/${item.media_type}/details/${item.id}`} 
                        key={idx} 
                        className='w-[100%] p-2 flex  justify-start items-center border-b-[1px] border-zinc-100 text-zinc-600 font-semibold hover:text-zinc-900 hover:bg-zinc-700 duration-300 hover:text-lg '>

                          <img src={
                              item.backdrop_path || 
                                item.profile_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}` : noImage
                            } 
                            className='w-full h-[15vh] md:w-[20vh] md:h-[12vh] object-cover md:mr-5 rounded-lg shadow-lg ' 
                            alt="Loading......" />

                          <span className='hidden text-white md:inline-block'> { item.name || item.title || item.original_title ||  item.original_name} </span>

                      </Link>             
                    ))
                  }

            </div>

        </div>
  )
}

export default TopNav