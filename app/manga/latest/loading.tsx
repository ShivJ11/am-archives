import { LoadingMangaLatestPage } from '@/app/components/manga/loadingUI/loadingMangaLatestPage'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingPage = () => {
  return (
    <div>
      <div className='w-full px-5 mt-6'>
        <div className='font-bold text-gray-300 text-4xl line-clamp-3'>
          <Skeleton className='w-[80%] h-9'/>
        </div>
        <div className='mt-4'>
          <LoadingMangaLatestPage />
        </div>
      </div>
    </div>
  )
}

export default LoadingPage