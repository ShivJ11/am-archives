'use client'
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MangaData } from '@/interfaces/manga.interface';
import { getPopularNewTitles } from '@/services/getMangaData'
import Autoplay from 'embla-carousel-autoplay';
import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import './manga.css'
import { ScrollArea } from '@/components/ui/scroll-area';
import LoadingPage from '@/app/manga/loading';

export function HomeCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 200000, stopOnInteraction: false, stopOnFocusIn: false, stopOnLastSnap: false, stopOnMouseEnter: false })
    )
    const [mangaData, setMangaData] = useState<MangaData[] | null>(null);
    useEffect(() => {
        async function fetchLatestManga() {
            try {
                const result = await getPopularNewTitles();
                setMangaData(result.data);
            }
            catch (error) {
                console.error("Error fetching trending manga data", error);
            }
        }
        fetchLatestManga();
    }, [])
    if (!mangaData) {
        return <LoadingPage /> // You can add a loading state here
    }
    
    return (
        <div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full "
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {mangaData.length > 0 ? (
                        mangaData.map((manga: any, index: number) => (
                            <CarouselItem key={manga.id}>
                                <div className="p-0">
                                    <Card>
                                        <CardContent className="p-0 ">
                                            <div className="carousel-container" style={{ position: 'relative' }}>
                                                <div className="carousel-image-container">
                                                    <img style={{ position: "absolute", opacity: 0.10, width: '100%' }} src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find((item: { type: string; }) => item.type === 'cover_art').attributes.fileName}`} alt="" />
                                                </div>
                                                <div className='flex z-40'>
                                                    <div className="cover-image-container" >
                                                        <img src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find((item: { type: string; }) => item.type === 'cover_art').attributes.fileName}`} alt="Vertical Image" />
                                                    </div>
                                                    <div className='carousel-right-side' >
                                                        <h1 className='font-extrabold text-gray-300 text-4xl manga-title'>{manga.attributes.title.en}</h1>
                                                        <div className='pt-2 opacity-100'>{manga.attributes.tags
                                                            .filter((tag: any) => tag.attributes.group === 'genre') // Filter only genre tags
                                                            .map((tag: any, index: number) => (
                                                                <span className='manga-tags mr-2 mt-1' key={index}>{tag.attributes.name.en}</span> // Render the genre name
                                                            ))}</div>
                                                        <div className='text-gray-300 manga-desc pt-2'>
                                                            <ScrollArea className="rounded-md scroll-area-height">
                                                                {manga.attributes.description.en}
                                                            </ScrollArea>
                                                        </div>
                                                        <p className='manga-author'>{manga.relationships
                                                            .filter((author: any) => author.type === 'author')
                                                            .map((author: any, index: number) => (
                                                                <span className='text-gray-300' key={index}>{author.attributes.name}</span>
                                                            ))
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))) : (<div></div>)}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}