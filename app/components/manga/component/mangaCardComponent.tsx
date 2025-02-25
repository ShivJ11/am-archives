import { MangaData } from '@/interfaces/manga.interface';
import Link from 'next/link';
import React from 'react'

const MangaCardComponent = (data:{mangaData:MangaData[]}) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
            {data.mangaData.length > 0 ? (
                data.mangaData.map((manga: any, index: number) => (                    
                    <div className='rounded-sm block overflow-hidden relative' key={manga.id}>
                        <div className='w-full relative'>
                            <Link href={`/manga/${manga.id}`} className='group flex items-start relative mb-auto select-none aspect h-full w-full left-0 top-0'>
                                <img 
                                    src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find((item: { type: string; }) => item.type === 'cover_art').attributes.fileName}`} 
                                    className='rounded shadow-md w-full h-auto aspect-[3/4] object-cover'  // Set aspect ratio
                                    alt={manga.attributes.title.en} 
                                />
                            </Link>
                            <Link href={`/manga/${manga.id}`} className='absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black/80 text-shadow-md z-10 p-2'>
                                <span className='text-gray-100 font-semibold line-clamp-2'>{manga.attributes.title.en}</span>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (<div className='text-gray-300'>No data found</div>)}            
        </div>
  )
}

export default MangaCardComponent