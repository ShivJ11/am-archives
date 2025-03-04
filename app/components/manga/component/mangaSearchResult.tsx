import { MangaData } from '@/interfaces/manga.interface'
import { getSearchMangaResults } from '@/services/getMangaData';
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MangaChapterListPagination from './mangaChapterListPagination';
import { LoadingSearchResults } from '../loadingUI/loadingSearchResult';
import MangaCardComponent from './mangaCardComponent';

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
        <MangaCardComponent mangaData={mangaData}/>
        {mangaData.length > 0 ? (
        <div className='flex justify-center flex-wrap gap-2 mt-6 pb-7 text-gray-300'>
            <MangaChapterListPagination currentPage={pageNumber} onPageChange={handlePageChange} totalChapters={totalChapters} contentPerPage={32}/>
        </div>
        ):(<></>)}
        </>
    )    
}

export default MangaSearchResult