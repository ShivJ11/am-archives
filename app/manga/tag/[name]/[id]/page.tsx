'use client'
import MangaHeader from '@/app/components/layout/mangaHeader';
import MangaTagPage from '@/app/components/manga/component/mangaTagById';
import PageScrollUp from '@/app/components/root/pageScrollUp';
import { Button } from '@/components/ui/button';
import { removeHyphen } from '@/lib/helper';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const MangaTagById = () => {
    const pathname = usePathname();
    const tagId = pathname?.split('/')[4];
    const tagName = pathname?.split('/')[3];
    const router = useRouter();
    const buttonClick = () => {
        router.push(`/manga/tag`);
    };
    return (
        <>
            <MangaHeader />
            <div className='w-full px-5 mt-6'>
                {/* add button to tag page */}
                <div className='font-bold text-gray-300 text-4xl line-clamp-3 flex'>
                    <Button className='bg-transparent hover:bg-transparent' type='button' onClick={buttonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width:'1.75rem',height:'1.75rem'}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    </Button>
                    {removeHyphen(tagName)}
                </div>
                <div className='mt-4'>
                    <MangaTagPage tagId={tagId} tagName={tagName} />
                </div>
            </div>
            <PageScrollUp />
        </>
    )
}

export default MangaTagById