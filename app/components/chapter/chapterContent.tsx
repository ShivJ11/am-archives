'use client'
import ChapterNextPreviousButton from '@/app/components/chapter/chapterNext&PreviousButton';
import { Switch } from '@/components/ui/switch';
import { AggregateChapterData, ChapterData, ChapterDetails } from '@/interfaces/chapter.interface';
import { isMangaAttributes, isScanlationGroupAttributes } from '@/lib/helper';
import { getChapterDetailsById, getChapterFeedById } from '@/services/getChapterData';
import { getMangaGroup } from '@/services/getMangaData';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { ChapterListDropdown } from './chapterListDropdown';
import LoadingChapterContent from './loadingChapterContent';
import Head from 'next/head';

const ChapterContent = () => {
    const prevChapterId = React.useRef<string | null>(null);
    const pathname = usePathname();
    const chapterId = pathname?.split('/')[2];
    const [chapterDetails, setChapterDetails] = React.useState<ChapterDetails | null>(null);
    const [chapterFeed, setChapterFeed] = React.useState<ChapterData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isDataSaver, setIsDataSaver] = React.useState<boolean>(false);
    const [group, setGroup] = React.useState<AggregateChapterData | null>(null);
    const router = useRouter();
    React.useEffect(() => {
        const storedDataSaverState = localStorage.getItem('dataSaver');
        if (storedDataSaverState !== null) {
            setIsDataSaver(JSON.parse(storedDataSaverState));  // parse the stored string to boolean
        }
    }, []);
    React.useEffect(() => {
        if (chapterId !== prevChapterId.current) {
            setLoading(true);
            async function fetchChapterDetails() {
                try {
                    const [detail, feed] = await Promise.all([getChapterDetailsById(chapterId, router), getChapterFeedById(chapterId, router)])
                    if (detail === null) { router.push('/404'); }
                    setChapterDetails(detail.data);
                    setChapterFeed(feed);
                    if (!group) {
                        const mangaId = detail.data.relationships.find(isMangaAttributes)?.id;
                        const translatedLanguage = detail.data.attributes.translatedLanguage;
                        const groupId = detail.data.relationships.find(isScanlationGroupAttributes)?.id;
                        if (mangaId && translatedLanguage && groupId) {
                            const groupData = await getMangaGroup(mangaId, translatedLanguage, groupId);
                            setGroup(groupData);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching manga details", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchChapterDetails();
            prevChapterId.current = chapterId;  // Update the ref to the current chapterId
        }
    }, [chapterId, router]);
    const handleSwitchChange = (checked: boolean) => {
        setIsDataSaver(checked);
        localStorage.setItem('dataSaver', JSON.stringify(checked)); // store the new state
    };
    if (loading) {
        return <div><LoadingChapterContent /></div>;
    }
    if (!chapterDetails || !chapterFeed) {
        return <div>Error fetching chapter details or no manga found.</div>;
    }
    const getImageUrls = () => {
        return isDataSaver
            ? chapterFeed.chapter.dataSaver.map((image: any) => `${chapterFeed.baseUrl}/data-saver/${chapterFeed.chapter.hash}/${image}`)
            : chapterFeed.chapter.data.map((image: any) => `${chapterFeed.baseUrl}/data/${chapterFeed.chapter.hash}/${image}`);
    };
    const imageUrls = getImageUrls();
    const manga = chapterDetails.relationships.find(isMangaAttributes);
    const scanlationGroup = chapterDetails.relationships.find(isScanlationGroupAttributes);
    return (
        <>
            <Head>
                <title>{`Ch. ${chapterDetails.attributes.chapter} - am Archives`}</title>
                <meta name="description" content={`Read the chapter ${chapterDetails.attributes.chapter} of ${manga?.attributes?.title?.en}`} />
            </Head>
            <div>
                {/* Chapter options to add */}
                <div className='p-4 '>
                    <div className='flex-grow'>
                        <Link className='font-bold text-gray-300 text-4xl text-left line-clamp-2' href={`/manga/${manga?.id}`}>
                            {manga?.attributes?.title?.en}
                        </Link>
                        {chapterDetails.attributes.title && <div className='text-gray-300 text-left line-clamp-2' style={{ color: 'rgb(140, 180, 230)' }}>{chapterDetails.attributes.title}</div>}
                    </div>
                    <div className='grid mt-2 mb-2 gap-x-2 grid-cols-2'>
                        <ChapterListDropdown group={group} currentChapter={chapterDetails.attributes.chapter}
                            currentVolume={chapterDetails.attributes.volume} mangaId={manga?.id} />
                        <div className='items-center rounded-sm flex justify-center text-gray-300' style={{ backgroundColor: 'rgb(71, 85, 105)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                            <span className='ml-1 line-clamp-1'>{scanlationGroup?.attributes?.name ?? "No group"}</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center'>
                        <span className='text-gray-300 flex w-full justify-center items-center mb-1'>Image Server:</span>
                        <div className='flex w-full justify-center items-center'>
                            <span className='text-gray-300 mr-1'>High Quality </span>
                            <Switch checked={isDataSaver} onCheckedChange={handleSwitchChange} />
                            <span className='ml-1 text-gray-300'>Data Saver</span>
                        </div>
                    </div>
                    <ChapterNextPreviousButton group={group} currentChapter={chapterDetails.attributes.chapter}
                        currentVolume={chapterDetails.attributes.volume} mangaId={manga?.id} />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Chapter image ${index + 1}`} loading="lazy" />
                    ))}
                </div>
                <div className='p-4 mt-1'>
                    <ChapterNextPreviousButton group={group} currentChapter={chapterDetails.attributes.chapter}
                        currentVolume={chapterDetails.attributes.volume} mangaId={manga?.id} />
                </div>
            </div>
        </>
    )
}

export default ChapterContent