'use client'
import AnimeHeader from '@/app/components/layout/animeHeader'
import { getAnimeDetailById } from '@/services/getAnimeData'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AnimeData } from '@/interfaces/anime.interface'
import '../../components/anime/anime.css'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'

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
  return (
    <div>
      <AnimeHeader />
      <div className="flex flex-wrap py-16 px-10 " >
        <div className='cover-image' style={{backgroundImage:`url('${animeDetails.coverImage.extraLarge}'`}}></div>
        <div className="w-full lg:w-auto md:w-1/2  detail-page-first-section">
          <img src={animeDetails.coverImage.extraLarge} alt={animeDetails.title.english} className='detail-page-image' />
        </div>
        <div className="w-full lg:w-auto md:w-1/2 text-gray-300 detail-page-mid-section">
        <div className='flex'>
          <Link href={'/'}>Home</Link>
          <div className='dot-center'></div>
          <div>{animeDetails.format}</div>
          <div className='dot-center'></div>
          <div>{animeDetails.title.romaji}</div>
        </div>
          <h1 className='text-4xl pt-4'>{animeDetails.title.english}</h1>
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
        </div>
        <div className="w-full lg:w-auto md:w-full text-gray-300 detail-page-last-section">{animeDetails.title.native}</div>
      </div>
    </div>
  )
}

export default Details