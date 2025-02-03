import React, { useMemo } from 'react'
import { AggregateChapterData } from '@/interfaces/chapter.interface';
import Link from 'next/link';
import { ChapterListDropdown } from './chapterListDropdown';

const ChapterNextPreviousButton = ({ group, currentChapter, currentVolume, mangaId }:{
    group: AggregateChapterData | null;
    currentChapter: string;
    currentVolume: string;
    mangaId:string|undefined;
}) => {
    
    const findNextPreviousChapters = (group: AggregateChapterData | null, currentChapter: string, currentVolume: string) => {
        if (!group || !group.volumes) return { next: null, prev: null };

        const volumes = Object.values(group.volumes);
        let nextChapter = null;
        let prevChapter = null;

        // Handle the special "none" volume case
        if (currentVolume === null) {
            const noneVolumeChapters = group.volumes["none"].chapters;
            const chapters = Object.values(noneVolumeChapters);
            const currentChapterObj = chapters.find(chap => chap.chapter === currentChapter);

            if (currentChapterObj) {
                const currentIndex = chapters.findIndex(chap => chap.chapter === currentChapter);
                if (currentIndex > 0) {
                    prevChapter = chapters[currentIndex - 1]; // Previous chapter
                }
                if (currentIndex < chapters.length - 1) {
                    nextChapter = chapters[currentIndex + 1]; // Next chapter
                }
            }
        } else {
            // Find the current volume's chapters
            let currentVolumeChapters = volumes.find(vol => vol.volume === currentVolume);
            if (!currentVolumeChapters) return { next: null, prev: null };

            const chapters = Object.values(currentVolumeChapters.chapters);
            const currentChapterObj = chapters.find(chap => chap.chapter === currentChapter);

            if (currentChapterObj) {
                // Find next and previous chapter within the current volume
                const currentIndex = chapters.findIndex(chap => chap.chapter === currentChapter);
                if (currentIndex > 0) {
                    prevChapter = chapters[currentIndex - 1]; // Previous chapter
                }
                if (currentIndex < chapters.length - 1) {
                    nextChapter = chapters[currentIndex + 1]; // Next chapter
                }

                // If there is no next chapter in the current volume, go to the first chapter in the next volume
                if (!nextChapter) {
                    const nextVolume = volumes.find(vol => parseInt(vol.volume) === parseInt(currentVolume) + 1);
                    if (nextVolume) {
                        nextChapter = Object.values(nextVolume.chapters)[0]; // First chapter of the next volume
                    }
                }

                // If there is no previous chapter in the current volume, go to the last chapter of the previous volume
                if (!prevChapter) {
                    const prevVolume = volumes.find(vol => parseInt(vol.volume) === parseInt(currentVolume) - 1);
                    if (prevVolume) {
                        prevChapter = Object.values(prevVolume.chapters)[Object.values(prevVolume.chapters).length - 1]; // Last chapter of the previous volume
                    }
                }
            }
        }

        return { next: nextChapter, prev: prevChapter };
    };

    const { next, prev } = useMemo(() => findNextPreviousChapters(group, currentChapter, currentVolume), [group, currentChapter, currentVolume]);


    return (
        <div className='grid mt-2 mb-2 gap-x-2 grid-cols-2'>
            <Link href={prev?`/chapter/${prev.id}`:`/manga/${mangaId}`} 
                className='items-center rounded-sm flex justify-center text-gray-300 cursor-pointer' 
                style={{ backgroundColor: 'rgb(71, 85, 105)' }}
            >
                {prev ? 'Previous' : 'ⓘ Details'}
            </Link>
            <Link href={next?`/chapter/${next.id}`:`/manga/${mangaId}`}
                className='items-center rounded-sm flex justify-center text-gray-300 cursor-pointer' 
                style={{ backgroundColor: 'rgb(71, 85, 105)' }}
            >
                {next ? 'Next' : 'ⓘ Details'}
            </Link>
        </div>
    );
}

export default ChapterNextPreviousButton;
