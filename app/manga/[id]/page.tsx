'use client'
import MangaHeader from '@/app/components/layout/mangaHeader'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MangaData } from '@/interfaces/manga.interface';
import { getMangaDetailsById } from '@/services/getMangaData';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import '../../components/manga/manga.css'
import { capitalizeFirstLetter, formatDate } from '@/lib/helper';
import MangaChaptersScrollArea from '@/app/components/manga/mangaChaptersScrollArea';

const MangaDetails = () => {
    const pathname = usePathname();
    const mangaId = pathname?.split('/')[2];
    const [manga, setManga] = React.useState<MangaData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const router = useRouter();

    React.useEffect(() => {
        async function fetchMangaDetails() {
            try {
                const data = await getMangaDetailsById(mangaId, router);
                if (data === null) { router.push('/404'); }
                if (data) {
                    setManga(data.data);
                } else {
                    console.error('Invalid data structure', data);
                }
            } catch (error) {
                console.error("Error fetching manga details", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMangaDetails();
    }, [mangaId, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!manga) {
        return <div>Error fetching manga details or no manga found.</div>;
    }
    const coverImage = manga.relationships?.find((item) => item.type === 'cover_art')?.attributes.fileName;
    const imageUrl = coverImage ? `https://uploads.mangadex.org/covers/${manga.id}/${coverImage}` : 'default-image-url';

    return (
        <div>
            <MangaHeader />
            <div className="flex flex-wrap pt-16 pb-8 px-10 " >
                <div className='cover-image' style={{ backgroundImage: `url('${imageUrl}')` }}></div>
                <div className="detail-page-first-section">
                    <img src={imageUrl} alt={manga.attributes.title.en} className='detail-page-image' />
                </div>
                <div className="text-gray-300 detail-page-mid-section">
                    <div className='flex'>
                        <Link href={'/'}>Home</Link>
                        {manga.attributes.publicationDemographic && (
                            <>
                                <div className='dot-center'></div>
                                <div>{capitalizeFirstLetter(manga.attributes.publicationDemographic)}</div>
                            </>
                        )}
                        <div className='dot-center'></div>
                        <div className='line-clamp-1'>{manga.attributes.altTitles?.find((title) => title[manga.attributes.originalLanguage])?.[manga.attributes.originalLanguage] ?? ''}
                        </div>
                    </div>
                    <h1 className='text-4xl pt-4 font-bold line-clamp-3'>{manga.attributes.title.en}</h1>
                    <div className='flex pt-4'>
                        <div className='pg-box mr-2'>{manga.attributes.contentRating === "safe" || "suggestive" ? "PG-13" : "18+"}</div>
                        <div className='hd-box mr-2'>HD</div>
                        <div className='pink-box mr-2'>{manga.attributes.status}</div>
                        <div className='episode-box'>{manga.type}</div>
                        <div className='dot'></div>
                        <div>{manga.attributes.year}</div>
                    </div>
                    <div className='pt-4'>
                        <ScrollArea className="h-[150px] rounded-md ">{manga.attributes.description.en}</ScrollArea>
                    </div>
                </div>
                <div className="text-gray-300 detail-page-last-section">
                    <div><span className='font-extrabold'>Native name: </span>{manga.attributes.altTitles?.find((title) => title[manga.attributes.originalLanguage])?.[manga.attributes.originalLanguage] ?? ''}</div>
                    <div className='pt-1'><span className='font-extrabold'>Created At: </span>{formatDate(manga.attributes.createdAt)}</div>
                    <div className='pt-1'><span className='font-extrabold'>State: </span>{manga.attributes.state}</div>
                    <div className='pt-1'><span className='font-extrabold'>Status: </span>{manga.attributes.status}</div>
                    <div className='pt-1'><span className='font-extrabold'>MAL Score: </span>rating to be added</div>
                    <div className='pt-3 pb-2 detail-page-last-section-separator'><Separator /></div>
                    <div className=''><span className='font-extrabold'>Genres: </span>
                        {manga.attributes.tags?.map((genre) => (
                            <span className='border-box mr-2 mt-1' key={genre.id || genre.attributes.name.en}>{genre.attributes.name.en}</span>
                        ))}
                    </div>
                    <div className='pt-3 pb-2 detail-page-last-section-separator'><Separator /></div>
                    <div className='pt-1'><span className='font-extrabold'>Author: </span>{manga.relationships?.find((item) => item.type === 'author')?.attributes.name ?? 'Unknown'}</div>
                    <div className='pt-1'><span className='font-extrabold'>Artist: </span>{manga.relationships?.find((item) => item.type === 'artist')?.attributes.name ?? 'Unknown'}</div>
                </div>
            </div>
            <MangaChaptersScrollArea id={mangaId}/>
        </div>
    );
}
export default MangaDetails;
