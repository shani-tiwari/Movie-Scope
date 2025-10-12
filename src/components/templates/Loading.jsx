import React from 'react'
import { Link } from 'react-router-dom'

function Loading() {
  return (

    <>
        <div className="flex justify-center items-center w-full min-h-screen ">
            <div className="relative">
                {/* Spotlight Glow */}
                <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-gradient-to-t from-red-700 to-transparent rounded-full animate-ping opacity-75"></div>

                {/* Film Reel or Countdown Circle */}
                <div className="md:w-48 md:h-48 w-32 h-32 border-4 border-gray-700 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                
                {/* Central Glowing Dot */}
                <div className="absolute top-14 left-14 md:w-16 md:h-16 w-10 h-10 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    </>
  )
}

export default Loading