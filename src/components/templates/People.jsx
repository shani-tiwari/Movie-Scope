import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards  from './VerticalCards';

function People() {
    const navigate                = useNavigate();
    const [page, setPage]         = useState(1);
    const [person, setPerson]       = useState([]);
    const [category, setCategory] = useState('popular'); 
    const [HasMore, setHasMore]   = useState(true);
    

    document.title = `Tunely | Person's ` ;


    const GetPerson = async() => {
        try {
          const {data} = await axios.get(`person/${category}?page=${page}`);
            
            if(data.results.length > 0){

                setPerson((prev) => [
                    ...prev, 
                    ...data.results,
                ]);   
                setPage(page + 1);
            }
            else{
                setHasMore(false);
            }
        } catch (error) {
          console.log(error); 
        }
      }


      const RefreshHandler = () => {
        if(person.length === 0) {GetPerson();}
        else {
            setPage(1);
            setPerson([]);
            GetPerson();
        }
      }

      useEffect(()=>{
           RefreshHandler();
      },[category] );



  return person.length > 0 ? 
    (
      <div className='w-screen p-[2%] select-none flex flex-col items-center'>

          <div className='w-fit  fixed z-50 flex justify-between items-center rounded-full backdrop-blur-sm shadow-md shadow-slate-500 px-10 py-2 '>

              <h1 className='text-xl md:text-3xl text-zinc-300  '>
                  <i 
                   onClick={()=> navigate(-1)}
                   className=" text-zinc-300 text-xl md:text-3xl hover:text-[#6556CD] duration-300 ri-arrow-left-circle-line mr-4 shadow-white ">                    
                  </i>
                  Person's
              </h1>

          </div>


          <InfiniteScroll
           hasMore={HasMore}
           loader={ <Loading/>}
           next={GetPerson}
           dataLength={person.length}
          >
              {/* cards */}
              <VerticalCards data={person} title='people' />
          </InfiniteScroll>

      </div>

    ) : 
    ( <Loading/> )
}

export default People