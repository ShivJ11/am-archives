import { MangaFeedData } from '@/interfaces/manga.interface';
import { getMangaChaptersList } from '@/services/getMangaData';
import Link from 'next/link';
import React from 'react'
import LoadingChaptersScrollArea from './loadingChaptersScrollArea';
import { processLanguageCode } from '@/lib/helper';
import { formatDistanceToNow } from 'date-fns';
import MangaChapterListPagination from './mangaChapterListPagination';

const MangaChaptersScrollArea = ({ id }: { id: string }) => {
  const [mangaChapters, setMangaChapters] = React.useState<MangaFeedData[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isChapterVisible, setIsChapterVisible] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalChapters, setTotalChapters] = React.useState<number>();
  const itemsPerPage = 96;
  const toggleVisibility = (chapterId: string | number) => {
    setIsChapterVisible((prevState: { [x: string]: any; }) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],  // Toggle visibility for this chapter
    }));
  };
  let lastChapterMap: Map<any, any> = new Map();
  let uploaderChapterInVolumeCount: Map<any, any> = new Map();
  let chapterInVolumeCount: number
  React.useEffect(() => {
    async function fetchMangaChapters() {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * itemsPerPage;
        const data = await getMangaChaptersList(id, offset + 1);
        if (data) {
          setMangaChapters(data.data);
          setTotalChapters(data.total);
        } else {
          console.error('Invalid data structure', data);
        }
      } catch (error) {
        console.error("Error fetching manga details", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMangaChapters();
  }, [id, currentPage])
  if (loading) {
    return <LoadingChaptersScrollArea />
  }
  if (!mangaChapters) {
    return <div>Error fetching manga chapters </div>;
  }
  return (
    <div className='flex gap-6 items-start px-10 text-gray-300 manga-chapter-root'>
      <div className='flex-grow'>
        <div className='flex gap-x-2 mb-4'></div>
        <div>
          {mangaChapters.length > 0 ? (mangaChapters.map((manga: any, index: number) => {
            const isFirstChapterInVolume = index === 0 || manga?.attributes.volume !== mangaChapters[index - 1]?.attributes.volume;
            chapterInVolumeCount++
            if (index === mangaChapters.length - 1) {
              uploaderChapterInVolumeCount.set(mangaChapters[index - 1]?.attributes.volume, chapterInVolumeCount + 1)
              lastChapterMap.set(mangaChapters[index - 1]?.attributes.volume, mangaChapters[index - 1]?.attributes.chapter)
            }
            if (isFirstChapterInVolume) {
              uploaderChapterInVolumeCount.set(mangaChapters[index - 1]?.attributes.volume, chapterInVolumeCount)
              chapterInVolumeCount = 0
              lastChapterMap.set(mangaChapters[index - 1]?.attributes.volume, mangaChapters[index - 1]?.attributes.chapter)
            }
            if (index === 0) {
              return <VolumeContent key={index} manga={manga} toggleVisibility={toggleVisibility} isChapterVisible={isChapterVisible} lastChapterMap={lastChapterMap} chapterInVolumeCount={uploaderChapterInVolumeCount} />;
            } else {
              if (manga?.attributes.volume !== mangaChapters[index - 1]?.attributes.volume) {
                return <VolumeContent key={index} manga={manga} toggleVisibility={toggleVisibility} isChapterVisible={isChapterVisible} lastChapterMap={lastChapterMap} chapterInVolumeCount={uploaderChapterInVolumeCount} />;
              } else if (manga?.attributes.chapter === mangaChapters[index - 1]?.attributes.chapter) {
                return <UploaderContentWithStyle key={index} manga={manga} isChapterVisible={isChapterVisible} />;
              } else {
                return <ChapterContent key={index} manga={manga} toggleVisibility={toggleVisibility} isChapterVisible={isChapterVisible} />
              }
            }
          })) : (<div></div>)}
          <div className='flex justify-center flex-wrap gap-2 mt-6'>
            {/* pagination */}
            <MangaChapterListPagination currentPage={currentPage} onPageChange={setCurrentPage} totalChapters={totalChapters} contentPerPage={96} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangaChaptersScrollArea

const VolumeContent = ({ manga, toggleVisibility, isChapterVisible, lastChapterMap, chapterInVolumeCount }: { manga: any, toggleVisibility: any, isChapterVisible: any, lastChapterMap: Map<any, any>, chapterInVolumeCount: Map<any, any> }) => {
  return (
    <div className='flex flex-col mt-6'>
      <div className='grid grid-cols-12 mb-2 cursor-pointer'>
        <div className='col-span-4'>{manga.attributes.volume ? `Volume ${manga.attributes.volume}` : "No Volume"}</div>
        <div className='col-span-4 text-center'>Ch. {manga.attributes.chapter}-{lastChapterMap.get(manga.attributes.volume)}</div>
        <div className='col-span-4 text-right'>
          <span>{chapterInVolumeCount.get(manga.attributes.volume)}
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 feather feather-chevron-down arrow-icon text-icon-contrast text-undefined" style={{ transition: "transform 150ms ease-in-out", transform: "rotate(180deg)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg> */}
          </span>
        </div>
      </div>
      <ChapterContent manga={manga} toggleVisibility={toggleVisibility} isChapterVisible={isChapterVisible} />
    </div>
  )
}

const ChapterContent = ({ manga, toggleVisibility, isChapterVisible }: { manga: any, toggleVisibility: any, isChapterVisible: any }) => {
  const handleSvgClick = (e: { target: any; }) => {
    // Directly toggle rotation on the SVG element
    const svgElement = document.getElementById(`svg-${manga.attributes.chapter}`) as unknown as SVGSVGElement;
    if (svgElement) {
      svgElement.style.transform = svgElement.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
      svgElement.style.transition = 'transform 0.3s ease';
    }
    toggleVisibility(manga.attributes.chapter);
  };
  return (
    <div className='rounded flex flex-col gap-2 h-auto mt-2'>
      <div className='rounded-sm' style={{ backgroundColor: 'rgb(75 85 99 )' }}>
        <div className='chapter-header two-line' onClick={handleSvgClick}>
          <div className='flex'>
            <span className='font-bold self-center whitespace-nowrap'>
              {/* Chapter 1 */}
              Chapter {manga.attributes.chapter}
            </span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" id={`svg-${manga.attributes.chapter}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" style={{ transition: "transform 150ms ease-in-out", transform: "rotate(180deg)" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            {/* chapter chevron */}
          </svg>
        </div>
        <div className='h-auto'>
          {/* looping for this same chapter different uploader div */}
          {isChapterVisible[manga.attributes.chapter] && (
            <div id={manga.attributes.chapter.toString()}>
              {/* looping for this same chapter different uploader div */}
              <UploaderContent manga={manga} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
const UploaderContentWithStyle = ({ manga, isChapterVisible }: { manga: any, isChapterVisible: any }) => {
  return (
    <div className='rounded flex flex-col gap-2 h-auto'>
      <div className='rounded-sm' style={{ backgroundColor: 'rgb(75 85 99 )' }}>
        {isChapterVisible[manga.attributes.chapter] && (
          <div id={manga.attributes.chapter.toString()}>
            <UploaderContent manga={manga} />
          </div>
        )}
      </div>
    </div>
  )
}
const UploaderContent = (manga: { manga: any }) => {
  return (
    <div className='flex chapter relative read' id={manga.manga.attributes.chapter}>
      <div className='chapter-line twoLine'>
        <div className='chapter-line-top twoLine'></div>
        <div className='chapter-line-bottom twoLine'></div>
        <div className='chapter-line-extend twoLine'></div>
      </div>
      <Link href={manga.manga.attributes.externalUrl ?? `/chapter/${manga.manga.id}`}target={manga.manga.attributes.externalUrl ?'_blank':'_self'} className='chapter-grid flex-grow'>
        <div className='flex flex-grow items-center' style={{ gridArea: "title" }}>
          {/* flag image */}
          <img src={`https://mangadex.org/img/flags/${processLanguageCode(manga.manga.attributes.translatedLanguage)}.svg`} onError={(e) => { (e.target as HTMLImageElement).src = 'https://mangadex.org/img/flags/gb.svg'; }} alt="" className='inline-block select-none flex-shrink-0 !h-5 !w-5 ' />
          {manga.manga.attributes.externalUrl? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>:''}
          <span className='chapter-link ml-1 font-bold my-auto flex items-center space-x-1'>            
            <span className='line-clamp-1 px-1'>
            {(manga.manga.attributes.title && manga.manga.attributes.title !== "")
              ? manga.manga.attributes.title
              : `Ch.${manga.manga.attributes.chapter}`}
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
              {manga.manga.relationships.find((relation: { type: string }) => relation.type === "scanlation_group")?.attributes.name ?? "No group"}
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
            {manga.manga.relationships.find((relation: { type: string }) => relation.type === "user")?.attributes.username ?? "No user"}
          </div>
        </div>
        <div className='flex items-center timestamp justify-self-start' style={{ gridArea: "timestamp" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <div className='whitespace-nowrap px-1'>
            {/* some time ago */}
            {formatDistanceToNow(manga.manga.attributes.updatedAt) ?? ""}
          </div>
        </div>

      </Link>
    </div>
  )
}