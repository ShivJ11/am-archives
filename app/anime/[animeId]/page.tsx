'use client'
import AnimeHeader from '@/app/components/layout/animeHeader'
import { getAnimeDetailById } from '@/services/getAnimeData'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AnimeData } from '@/interfaces/anime.interface'
import '../../components/anime/anime.css'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { WatchNowButton } from '@/app/components/anime/watchNowButton'
import { capitalizeFirstLetter, getMonthName, truncateDescription } from '@/lib/helper'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import AnimeTrailer from '@/app/components/anime/animeTrailer'
import AnimeCharacters from '@/app/components/anime/animeCharacters'

const Details = () => {
  const pathname = usePathname();
  const animeId = pathname?.split('/')[2];
  const [animeDetails, setAnimeDetails] = React.useState<AnimeData | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true)
  const router = useRouter();
  React.useEffect(() => {
    async function fetchAnimeDetails() {
      if (!animeId || isNaN(Number(animeId))) {
        // If animeId is invalid or not a number, redirect to 404 
        router.push('/404');
        return;
      }
      try {
        const data = await getAnimeDetailById(parseInt(animeId), router);
        if (data === null) { router.push('/404'); }
        if (data && data.data.Media) {
          setAnimeDetails(data.data.Media);
        } else {
          console.error('Invalid data structure', data);
        }
      } catch (error) {
        console.error("Error fetching trending anime data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimeDetails();
  }, [animeId, router])
  if (loading) {
    return (
      <div>
        <AnimeHeader />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-auto md:w-1/2">
            <Skeleton height={300} width={200} /> {/* Skeleton for image */}
          </div>
          <div className="w-full lg:w-auto md:w-1/2">
            <Skeleton height={30} width="60%" /> {/* Skeleton for title */}
            <Skeleton height={20} width="80%" /> {/* Skeleton for native title */}
          </div>
        </div>
      </div>
    );
  }
  if (!animeDetails) {
    return <div>No anime found.</div>;
  }
  const mainStudio = animeDetails.studios.edges.find(edge => edge.isMain);
  return (
    <div>
      <AnimeHeader />
      <div className="flex flex-wrap pt-16 pb-8 px-10 " >
        <div className='cover-image' style={{ backgroundImage: `url('${animeDetails.coverImage.extraLarge}'` }}></div>
        <div className="detail-page-first-section">
          <img src={animeDetails.coverImage.extraLarge} alt={animeDetails.title.english} className='detail-page-image' />
        </div>
        <div className="text-gray-300 detail-page-mid-section">
          <div className='flex'>
            <Link href={'/'}>Home</Link>
            <div className='dot-center'></div>
            <div>{animeDetails.format}</div>
            <div className='dot-center'></div>
            <div>{animeDetails.title.romaji}</div>
          </div>
          <h1 className='text-4xl pt-4 font-bold'>{animeDetails.title.english}</h1>
          <div className='flex pt-4'>
            <div className='pg-box mr-2'>{animeDetails.isAdult ? "18+" : "PG-13"}</div>
            <div className='hd-box mr-2'>HD</div>
            <div className='episode-box mr-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg><div className="pl-1">{animeDetails.episodes}</div>
            </div>
            <div className='pink-box '>{animeDetails.status}</div>
            <div className='dot'></div>
            <div>{animeDetails.duration}m</div>
          </div>
          <div className='pt-1'><WatchNowButton /></div>
          <div className='pt-4'>
            <ScrollArea className="h-[150px] rounded-md ">
              {animeDetails.description}
            </ScrollArea>
          </div>
        </div>
        <div className="text-gray-300 detail-page-last-section">
          <div><span className='font-extrabold'>Native name : </span>{animeDetails.title.native}</div>
          <div className='pt-1'><span className='font-extrabold'>Aired : </span>{getMonthName(parseInt(animeDetails.startDate.month))} {animeDetails.startDate.day}, {animeDetails.startDate.year}</div>
          <div className='pt-1'><span className='font-extrabold'>Premiered : </span>{capitalizeFirstLetter(animeDetails.season)} {animeDetails.seasonYear}</div>
          <div className='pt-1'><span className='font-extrabold'>Duration : </span>{animeDetails.duration} mins</div>
          <div className='pt-1'><span className='font-extrabold'>Status : </span>{capitalizeFirstLetter(animeDetails.status)}</div>
          <div className='pt-1'><span className='font-extrabold'>MAL Score : </span>{animeDetails.averageScore}</div>
          <div className='pt-3 pb-2 detail-page-last-section-separator'><Separator /></div>
          <div className='pt-1'><span className='font-extrabold'>Genres : </span>{animeDetails.genres.map((genre, index) => (
            <span className='border-box mr-2' key={index}>{genre}{index < animeDetails.genres.length - 1 && ' '}</span>
          ))}</div>
          <div className='pt-3 pb-2 detail-page-last-section-separator'><Separator /></div>
          <div className='pt-1'><span className='font-extrabold'>Studios : </span>{mainStudio?.node.name}</div>
        </div>
      </div>
      {/* <div>{animeDetails.trailer.site==="youtube"?<AnimeTrailer trailerId={animeDetails.trailer.id}/>:""}</div> */}
      <div className='px-10 text-2xl'>
        <div className='text-gray-300 font-bold pb-4'>Characters</div>
        <AnimeCharacters edges={animeDetails.characters.edges}/>
      </div>
    </div>
  )
}

export default Details