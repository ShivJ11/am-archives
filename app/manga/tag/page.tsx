import MangaHeader from '@/app/components/layout/mangaHeader'
import MangaTags from '@/app/components/manga/mangaTags'
import PageScrollUp from '@/app/components/root/pageScrollUp'
import React from 'react'

const Tags = () => {
    return (
        <div>
            <MangaHeader />
            <div className='w-full px-5 mt-6'>
                <div className='font-bold text-gray-300 text-4xl line-clamp-3'>Tags</div>
                <div className='mt-4'>
                    <MangaTags />
                </div>
            </div>
            <PageScrollUp />
        </div>
    )
}

export default Tags