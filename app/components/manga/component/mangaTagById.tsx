import { MangaData } from '@/interfaces/manga.interface';
import { getMangaDetailsByTag } from '@/services/getMangaData';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { LoadingSearchResults } from '../loadingUI/loadingSearchResult';
import MangaCardComponent from './mangaCardComponent';
import MangaChapterListPagination from './mangaChapterListPagination';

const MangaTagPage = (tag:{tagId:string,tagName:string}) => {
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
                const result = await getMangaDetailsByTag(tag.tagId,offset);
                setMangaData(result.data);
                setTotalChapters(result.total);
            }
            catch (error) {
                console.error("Error fetching manga data", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMangaDetails()
    }, [tag,pageNumber])
    const handlePageChange = (page: number) => {
        router.push(`/manga/tag/${tag.tagName}/${tag.tagId}?page=${page}`);
    };
    if (loading) {
        return <div><LoadingSearchResults/></div>;
    }
    if (!mangaData) {
        return <div>No Search Results for {tag.tagName}</div>;
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

export default MangaTagPage