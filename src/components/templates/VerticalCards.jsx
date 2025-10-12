
import React from 'react';
import { Link } from 'react-router-dom';

function VerticalCards({data, title}) {

    // console.log(title);

  return (
    <div className='flex flex-wrap justify-center gap-4 md:gap-6 mt-16 lg:px-4 @container  '>
        {
            data.map( (card, idx) =>

                <Link to={`/${card.media_type || title }/details/${card.id}`}  key={idx} 
                 className='relative flex flex-col max-[425px]:w-[80%] w-[30vh] mt-4 sm:min-w-[36vh] lg:min-w-[35vh] rounded px-1 duration-300 hover:shadow-[8px_17px_32px_2px_rgba(0,0,0,.5)] hover:scale-105 bg-slate-900 text-center border-b-2 border-t-2 ' >

                    <img 
                     src={`https://image.tmdb.org/t/p/w300/${ card.poster_path || card.backdrop_path || card.profile_path }`} 
                     alt="loading.." 
                     loading='lazy'
                     className='h-[32vh] object-fill rounded hover:shadow-[8px_17px_32px_2px_rgba(0,0,0,.5)] z-10 hover:scale-105 duration-300  '
                    />

                     <div className='my-auto'>
                        <span className='text-xl text-zinc-200 font-semibold z-20 '>
                            {
                               ( card.name || card.title || card.original_title ||  card.original_name).slice(0, 15)
                            }
                        </span>
                     </div>
                     


                     {
                        card.vote_average ? 
                            <div className='absolute right-[-3%] bottom-[25%] z-40 text-white text-md overflow-hidden w-[5vh] h-[5vh] flex justify-center items-center bg-yellow-700 rounded-full font-semibold '>
                                { (card.vote_average* 10).toFixed() } <sup>%</sup>
                            </div>
                            :
                        null
                     }
                </Link>
            )
        }
    </div>
  )
}

export default VerticalCards