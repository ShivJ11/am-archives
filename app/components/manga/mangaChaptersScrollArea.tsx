import { ScrollArea } from '@/components/ui/scroll-area'
import { MangaFeedData } from '@/interfaces/manga.interface';
import { getMangaChaptersList } from '@/services/getMangaData';
import Link from 'next/link';
import React from 'react'

const MangaChaptersScrollArea = ({ id }: { id: string }) => {
  const [mangaChapters, setMangaChapters] = React.useState<MangaFeedData[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    async function fetchMangaChapters() {
      try {
        const data = await getMangaChaptersList(id);
        if (data) {
          setMangaChapters(data.data);
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
  }, [id])
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!mangaChapters) {
    return <div>Error fetching manga chapters </div>;
  }
  return (
    <div className='flex gap-6 items-start px-10 text-gray-300'>
      <div className='flex-grow'>
        <div className='flex gap-x-2 mb-4'></div>
        <div>
          <div className='flex flex-col mb-6'>
            <div className='grid grid-cols-12 mb-2 cursor-pointer'>
              <div className='col-span-4'>Volume 1</div>
              <div className='col-span-4 text-center'>Ch. 1-7</div>
              <div className='col-span-4 text-right'>
                <span>85<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 feather feather-chevron-down arrow-icon text-icon-contrast text-undefined" style={{transition:"transform 150ms ease-in-out",transform:"rotate(180deg)"}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

                </span>
              </div>
            </div>
            <div className='rounded flex flex-col gap-2 h-auto'>
              <div className='rounded-sm' style={{ backgroundColor: 'rgb(75 85 99 )' }}>
                <div className='chapter-header two-line'>
                  <div className='flex'>
                    <span className='font-bold self-center whitespace-nowrap'>Chapter 1</span>
                  </div>
                  {/* looping for this flag div */}
                  <div className='langs-holder opacity-0'>
                    <div className='flex items-center bg-accent rounded px-1 my-auto flex-shrink-0'>
                      {/* flag images here */}
                      <img src='' className='inline-block select-none !h-4 !w-4 rounded' width={24} height={24}></img>
                      {/* flag upload count */}
                      <span className='ml-1 text-[0.625rem] leading-3 font-bold align-middle'>1</span>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <div className='h-auto'>
                  {/* looping for this same chapter different uploader div */}
                  <div className='flex chapter relative read'>
                    <div className='chapter-line twoLine'>
                      <div className='chapter-line-top twoLine'></div>
                      <div className='chapter-line-bottom twoLine'></div>
                      <div className='chapter-line-extend twoLine'></div>
                    </div>
                    <Link href={''} className='chapter-grid flex-grow'>
                      <div className='flex flex-grow items-center'>
                        {/* flag image */}
                        <img src="" alt="" className='inline-block select-none flex-shrink-0 !h-5 !w-5 -mx-0.5' />
                        <span className='chapter-link ml-2 font-bold my-auto flex items-center space-x-1'><span className='line-clamp-1 px-1'>chapter name</span></span>
                      </div>
                      <div className='comment-container hover justify-self-start' style={{ gridArea: "comments" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>

                        9
                      </div>
                      <div className='flex items-center justify-self-start'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        <div className='flex items-center space-x-1'>
                          <div className='px-1'>Username</div>
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
                        <div className='line-clamp-1 break-all px-1 rounded duration-100 pill lift'>User tag</div>
                      </div>
                      <div className='flex items-center timestamp justify-self-start' style={{ gridArea: "timestamp" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div className='whitespace-nowrap px-1'>some time ago</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'></div>
          <div className='flex justify-center flex-wrap gap-2 mt-6'></div>
        </div>
      </div>
    </div>
  )
}

export default MangaChaptersScrollArea