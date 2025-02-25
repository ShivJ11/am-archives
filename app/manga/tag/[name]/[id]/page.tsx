'use client'
import MangaHeader from '@/app/components/layout/mangaHeader';
import MangaTagPage from '@/app/components/manga/component/mangaTagById';
import PageScrollUp from '@/app/components/root/pageScrollUp';
import { removeHyphen } from '@/lib/helper';
import { usePathname } from 'next/navigation';
import React from 'react'

const MangaTagById = () => {
    const pathname = usePathname();
    const tagId = pathname?.split('/')[4];
    const tagName =pathname?.split('/')[3];
    return (
        <>
            <MangaHeader />
            <div className='w-full px-5 mt-6'>
                {/* add button to tag page */}
                <div className='font-bold text-gray-300 text-4xl line-clamp-3'>{removeHyphen(tagName)}</div>
                <div className='mt-4'>
                    <MangaTagPage tagId={tagId} tagName={tagName}/>
                </div>
            </div>
            <PageScrollUp />
        </>
    )
}

export default MangaTagById