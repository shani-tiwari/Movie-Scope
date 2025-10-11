import { Link } from 'react-router-dom'
import noImage from '../../public/noImage.webp'

function HorizontalCards( {data} ) {
    
  return (

        <div className='w-[100%]  flex overflow-x-auto overflow-y-hidden scrollbar-hide p-2 '> 
            {   
                data.length > 0 ? 
                    data.map( (card, idx) => (

                            <Link to={`/${card.media_type}/details/${card.id}`} key={idx} 
                             className='min-w-[60%] md:min-w-[30%] h-[40vh] mr-3 bg-zinc-900 mb-5 overflow-hidden p-1 rounded-md'>

                                <img 
                                  src={
                                        card.poster_path ?`https://image.tmdb.org/t/p/original/${card.poster_path }` : noImage
                                  } 
                                 alt="loading..."
                                 className='w-full h-full object-top object-fill rounded hover:scale-105 duration-300 ' />
                            </Link>

                    )) : <h1 className='text-3xl text-zinc-400 mx-auto  font-black text-center mt-5 content-center '> Nothing to Show.....</h1>
            }
        </div>
  )
}

export default HorizontalCards