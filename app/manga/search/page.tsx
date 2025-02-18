'use client'
import React from 'react'
import MangaHeader from '@/app/components/layout/mangaHeader'
import { useSearchParams } from 'next/navigation'
import MangaSearchResult from '@/app/components/manga/mangaSearchResult'
import PageScrollUp from '@/app/components/root/pageScrollUp'

const MangaSearch = () => {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('q') || ""     
    return (
        <>
            <MangaHeader />
            <div className='w-full px-5 mt-6'>                
                <div className='font-bold text-gray-300 text-4xl line-clamp-3'>Results for {searchQuery}</div>
                <div className='mt-4'>
                    <MangaSearchResult searchQuery={searchQuery} />
                </div>
            </div>       
            <PageScrollUp/>     
        </>
    )
}   

export default MangaSearch
