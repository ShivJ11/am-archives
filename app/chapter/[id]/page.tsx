import ChapterContent from '@/app/components/chapter/chapterContent'
import MangaHeader from '@/app/components/layout/mangaHeader'
import PageScrollUp from '@/app/components/root/pageScrollUp'
import React from 'react'

const Chapter = () => {

    return (
        <div>
            <MangaHeader />
            <ChapterContent/>
            <PageScrollUp/>
        </div>
    )
}

export default Chapter