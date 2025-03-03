'use client'
import React, { useEffect, useState } from 'react'
import '../manga.css'
import Link from 'next/link'
import { MangaData } from '@/interfaces/manga.interface';
import { getLatestMangaCovers, getLatestUpdates } from '@/services/getMangaData';
import { formatDistanceToNow } from 'date-fns';
import LoadingPage from '../loadingUI/loadingLatestUpdate';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function LatestUpdates() {
  const [mangaData, setMangaData] = useState<MangaData[] | null>(null);
  const [mangaCover, setMangaCover] = useState<MangaData[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchLatestManga() {
      try {
        const [result, cover] = await Promise.all([getLatestUpdates(16, 0), getLatestMangaCovers(16, 0)]);
        setMangaData(result.data);
        setMangaCover(cover.data);
      } catch (error) {
        console.error("Error fetching trending manga data", error);
      }
    }
    fetchLatestManga();
  }, []);
  if (!mangaData || !mangaCover) {
    return <LoadingPage />
  }
  const buttonClick = () => {
    router.push(`/manga/latest`);
};
  return (
    <div className='latest-update-container font-bold text-gray-300 text-4xl'>
      <div className='flex mb-2 justify-between'>
        <div className='font-bold text-gray-300 text-4xl'>Latest Updates</div>
        <Button className='bg-transparent hover:bg-transparent right-0' type='button' onClick={buttonClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        </Button>
      </div>
      <div className='grid gap-x-6 3xl:grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1'>
        <div style={{ backgroundColor: 'rgb(75 85 99 )', minHeight: '200px' }}>
          <div className='grid gap-4 p-4'>
            {mangaData.length > 0 ? (
              mangaData.slice(0, 8).map((manga: any, index: number) => {
                const mangaid = manga.relationships.find((item: { type: string; }) => item.type === 'manga')?.id;
                const cover = mangaCover.find((id: { id: string }) => id.id === mangaid)
                return <MangaItem key={manga.id} manga={manga} cover={cover} />;

              })) : (<div></div>)}
          </div>
        </div>
        <div style={{ backgroundColor: 'rgb(75 85 99 )', minHeight: '200px' }}>
          <div className='grid gap-4 p-4'>
            {mangaData.length > 0 ? (
              mangaData.slice(8).map((manga: any, index: number) => {
                const mangaid = manga.relationships.find((item: { type: string; }) => item.type === 'manga')?.id;
                const cover = mangaCover.find((id: { id: string }) => id.id === mangaid)
                return <MangaItem key={manga.id} manga={manga} cover={cover} />;
              })) : (<div></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

const MangaItem = ({ manga, cover }: { manga: any, cover: any }) => {
  const fileName = cover?.relationships.find((item: { type: string }) => item.type === 'cover_art')?.attributes.fileName;
  if (!fileName) return null;

  return (
    <div className='flex gap-2' key={manga.id}>
      <div style={{ height: '80px', minWidth: '56px', maxWidth: '56px' }}>
        <Link className='group flex items-start relative mb-auto select-none w-full h-full' href={`/manga/${cover.id}`}>
          <img src={`https://uploads.mangadex.org/covers/${cover.id}/${fileName}`} alt="" />
        </Link>
      </div>
      <div className='flex-grow flex flex-col justify-evenly'>
        <Link href={`/manga/${cover.id}`}>
          <h6 className='text-base font-bold line-clamp-1 break-all'>{cover.attributes.title.en}</h6>
        </Link>
        <div className='flex items-center justify-between'>
          <Link href={`/chapter/${manga.id}`} className='flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2'>
            <span className='line-clamp-1 text-base'>
              {manga.attributes.volume ? `Vol. ${manga.attributes.volume}` : ''} {manga.attributes.chapter ? `Ch. ${manga.attributes.chapter}` : ''} {manga.attributes.title ? `- ${manga.attributes.title}` : ''}
            </span>
          </Link>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-sm'>
            {(() => {
              const author = cover.relationships.find((author: any) => author.type === 'author');
              return author ? <span className='line-clamp-1'>{author.attributes.name}</span> : null;
            })()}
          </div>
          <div className='flex items-center text-sm  overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1'>{formatDistanceToNow(new Date(manga.attributes.updatedAt), { addSuffix: true })}</div>
        </div>
      </div>
    </div>
  );
}


export default LatestUpdates