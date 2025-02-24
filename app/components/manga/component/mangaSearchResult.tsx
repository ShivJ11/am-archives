import { MangaData } from '@/interfaces/manga.interface'
import { getSearchMangaResults } from '@/services/getMangaData';
import Link from 'next/link';
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MangaChapterListPagination from './mangaChapterListPagination';
import { LoadingSearchResults } from '../loadingUI/loadingSearchResult';

const MangaSearchResult = (searchQuery: { searchQuery: string }) => {
    const [mangaData, setMangaData] = React.useState<MangaData[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [totalChapters, setTotalChapters] = React.useState<number>();
    const searchParams = useSearchParams()
    const pageNumber = Number(searchParams.get('page') || "1")
    const itemsPerPage = 32;
    const router = useRouter();
    React.useEffect(() => {
        async function fetchMangaDetails() {
            try {
                const offset = (pageNumber - 1) * itemsPerPage;
                const result = await getSearchMangaResults(searchQuery.searchQuery,offset);
                setMangaData(result.data);
                setTotalChapters(result.total);
            }
            catch (error) {
                console.error("Error fetching trending manga data", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMangaDetails()
    }, [searchQuery,pageNumber])
    const handlePageChange = (page: number) => {
        router.push(`/manga/search?q=${searchQuery.searchQuery}&page=${page}`);
    };
    if (loading) {
        return <div><LoadingSearchResults/></div>;
    }
    if (!mangaData) {
        return <div>No Search Results for {searchQuery.searchQuery}</div>;
    }
    return (
        <>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
            {mangaData.length > 0 ? (
                mangaData.map((manga: any, index: number) => (                    
                    <div className='rounded-sm block overflow-hidden relative' key={manga.id}>
                        <div className='w-full relative'>
                            <Link href={`/manga/${manga.id}`} className='group flex items-start relative mb-auto select-none aspect h-full w-full left-0 top-0'>
                                <img 
                                    src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find((item: { type: string; }) => item.type === 'cover_art').attributes.fileName}`} 
                                    className='rounded shadow-md w-full h-auto aspect-[3/4] object-cover'  // Set aspect ratio
                                    alt={manga.attributes.title.en} 
                                />
                            </Link>
                            <Link href={`/manga/${manga.id}`} className='absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black/80 text-shadow-md z-10 p-2'>
                                <span className='text-gray-100 font-semibold line-clamp-2'>{manga.attributes.title.en}</span>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (<div className='text-gray-300'>No data found</div>)}            
        </div>
        {mangaData.length > 0 ? (
        <div className='flex justify-center flex-wrap gap-2 mt-6 pb-7 text-gray-300'>
            <MangaChapterListPagination currentPage={pageNumber} onPageChange={handlePageChange} totalChapters={totalChapters} contentPerPage={32}/>
        </div>
        ):(<></>)}
        </>
    )    
}

export default MangaSearchResult