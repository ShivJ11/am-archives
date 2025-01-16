import { YouTubeEmbed } from '@next/third-parties/google';
import React from 'react'

interface AnimeTrailerProps {
    trailerId: string; 
  }
const AnimeTrailer : React.FC<AnimeTrailerProps> = ({ trailerId }) => {
    return (
        <div className='py-10 px-10 flex justify-center  top-0 left-0 w-full h-full'>            
            <YouTubeEmbed videoid={trailerId} height={400} width={720}  />            
        </div>
    )
}

export default AnimeTrailer