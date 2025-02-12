import MangaHeader from '@/app/components/layout/mangaHeader'
import MangaLatestPage from '@/app/components/manga/mangaLatestPage'
import React from 'react'

const LatestPage = () => {
  return (
    <>
        <MangaHeader/>
        <div className='w-full px-5 mt-6'>
        <div className='font-bold text-gray-300 text-4xl line-clamp-3'>Latest Updates</div>
            <div className='mt-4'>
            <MangaLatestPage/>
            </div>
        </div>
    </>
  )
}

export default LatestPage