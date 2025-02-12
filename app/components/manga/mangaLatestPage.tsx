'use client'
import { MangaData } from '@/interfaces/manga.interface';
import { getLatestMangaCovers, getLatestUpdates } from '@/services/getMangaData';
import React from 'react'
import './manga.css'
import Link from 'next/link';
import { processLanguageCode } from '@/lib/helper';
import { formatDistanceToNow } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import MangaChapterListPagination from './mangaChapterListPagination';

const MangaLatestPage = () => {
    const [chapterData, setChapterData] = React.useState<MangaData[] | null>(null);
    const [mangaCover, setMangaCover] = React.useState<MangaData[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [showAll, setShowAll] = React.useState(false);
    const [totalChapters, setTotalChapters] = React.useState<number>();
    const searchParams = useSearchParams()
    const pageNumber = Number(searchParams.get('page') || "1")
    const itemsPerPage = 32;
    const router = useRouter();
    React.useEffect(() => {
        async function fetchMangaChapters() {
            try {
                setLoading(true);
                const offset = (pageNumber - 1) * itemsPerPage;
                const [result, cover] = await Promise.all([getLatestUpdates(itemsPerPage,offset), getLatestMangaCovers(itemsPerPage,offset)]);
                setChapterData(result.data);
                setMangaCover(cover.data);
                setTotalChapters(result.total);
            } catch (error) {
                console.error("Error fetching manga details", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMangaChapters();
    }, [pageNumber]);

    if (loading) return <div>Loading...</div>;
    if (!chapterData || !mangaCover) return <div>No data</div>;

    // Group chapters by manga ID
    const groupedManga = chapterData.reduce((acc, chapter) => {
        const mangaid = chapter.relationships.find((item: { type: string }) => item.type === 'manga')?.id;
        if (!mangaid) return acc;

        if (!acc[mangaid]) {
            acc[mangaid] = { manga: chapter, chapters: [] };
        }
        acc[mangaid].chapters.push(chapter);
        return acc;
    }, {} as Record<string, { manga: any; chapters: any[] }>);
    const handlePageChange = (page: number) => {
        router.push(`/manga/latest?page=${page}`);
    };
    return (
        <>
            {Object.entries(groupedManga).map(([mangaid, { manga, chapters }]) => {
                const cover = mangaCover.find((id: { id: string }) => id.id === mangaid);
                const fileName = cover?.relationships.find((item: { type: string }) => item.type === 'cover_art')?.attributes.fileName;
                const visibleChapters = showAll ? chapters : chapters.slice(0, 3);
                return (
                    <div
                        key={mangaid}
                        className="chapter-feed-container details expand mb-4 bg-accent rounded-sm grid gap-2 p-2 grid-cols-[48px_minmax(0,_1fr)] lg:grid-cols-[120px_minmax(0,_1fr)] xl:grid-cols-[140px_minmax(0,_1fr)]"
                        style={{ backgroundColor: 'rgb(75, 85, 99)' }}
                    >
                        {/* Image section (Left side) */}
                        <div className="border-sm max-w-full overflow-hidden relative shadow-sm lg:h-[200px]">
                            <div className="group flex items-start mb-auto select-none w-full h-full left-0 top-0 absolute">
                                <img
                                    src={`https://uploads.mangadex.org/covers/${cover?.id}/${fileName}`}
                                    alt={`Cover of ${cover?.attributes.title.en}`}
                                    className="rounded shadow-md w-full h-[100px]  lg:h-[240px] object-cover"
                                />
                            </div>
                        </div>

                        {/* Content section (Right side) */}
                        <div className="flex flex-col gap-2">
                            <div className="self-start text-sm font-bold leading-tight w-full overflow-hidden break-words lg:text-base lg:leading-6 text-gray-300 line-clamp-1">
                                {cover?.attributes.title.en}
                            </div>
                            <div className="border-b-[1px] border-b-gray-300 w-full "></div>

                            {/* UploaderContent - Render all chapters of this manga */}
                            <UploaderContentWithStyle key={mangaid} chapters={visibleChapters} />
                        </div>
                        <div className="col-span-2 flex justify-center items-center w-full">{chapters.length > 3 && (
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-gray-300 hover:underline mt-2 self-start w-full"
                            >
                                {showAll ? "Show Less" : "Show More"}
                            </button>
                        )}</div>
                    </div>
                );
            })}
            <div className='flex justify-center flex-wrap gap-2 mt-6 pb-7 text-gray-300'>
            <MangaChapterListPagination currentPage={pageNumber} onPageChange={handlePageChange} totalChapters={totalChapters} contentPerPage={32} showLastPage={false}/>
        </div>
        </>
    );
};

export default MangaLatestPage

const UploaderContentWithStyle = ({ chapters }: { chapters: any[] }) => {
    return (
        <div className="rounded flex flex-col gap-2 h-auto">
            {chapters.map((chapter) => (
                <UploaderContent key={chapter.id} chapter={chapter} />
            ))}
        </div>
    );
};


const UploaderContent = ({ chapter }: { chapter: any }) => {
    return (
        <div className='flex chapter relative read text-gray-300' id={chapter.attributes.chapter}>
            <Link href={chapter.attributes.externalUrl ?? `/chapter/${chapter.id}`} target={chapter.attributes.externalUrl ? '_blank' : '_self'} className='chapter-grid flex-grow' style={{ padding: '0' }}>
                <div className='flex flex-grow items-center' style={{ gridArea: "title" }}>
                    {/* flag image */}
                    <img src={`https://mangadex.org/img/flags/${processLanguageCode(chapter.attributes.translatedLanguage)}.svg`} onError={(e) => { (e.target as HTMLImageElement).src = 'https://mangadex.org/img/flags/gb.svg'; }} alt="" className='inline-block select-none flex-shrink-0 !h-5 !w-5 ' />
                    {chapter.attributes.externalUrl ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg> : ''}
                    <span className='chapter-link ml-1 font-bold my-auto flex items-center space-x-1'>
                        <span className='line-clamp-1 px-1'>
                            {(chapter.attributes.title && chapter.attributes.title !== "")
                                ? chapter.attributes.title
                                : `Ch.${chapter.attributes.chapter}`}
                        </span></span>
                </div>
                <div className='comment-container hover justify-self-start' style={{ gridArea: "comments" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    9
                </div>
                <div className='flex items-center justify-self-start' style={{ gridArea: "groups" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <div className='flex items-center space-x-1'>
                        <div className='px-1 line-clamp-1'>
                            {/* username */}
                            {chapter.relationships.find((relation: { type: string }) => relation.type === "scanlation_group")?.attributes.name ?? "No group"}
                        </div>
                    </div>
                </div>
                <div className='flex items-center whitespace-nowrap justify-self-start' style={{ gridArea: "views" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <span className='px-1'>N/A</span>
                </div>
                <div className='user-tag flex items-center justify-self-start' style={{ gridArea: "uploader" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <div className='line-clamp-1 break-all px-1 rounded duration-100 pill lift'>
                        {/* User tag */}
                        {chapter.relationships.find((relation: { type: string }) => relation.type === "user")?.attributes.username ?? "No user"}
                    </div>
                </div>
                <div className='flex items-center timestamp justify-self-start' style={{ gridArea: "timestamp" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <div className='whitespace-nowrap px-1'>
                        {/* some time ago */}
                        {formatDistanceToNow(chapter.attributes.updatedAt) ?? ""}
                    </div>
                </div>

            </Link>
        </div>
    )
}