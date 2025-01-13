import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import '../components/manga/manga.css'

function LoadingPage() {
    const array = new Array(1).fill(null);
    return (
        <Carousel className="w-full ">
            <CarouselContent>
                {array.length > 0 ? (
                    array.map((_, index) => (
                        <CarouselItem key={index}> {/* Using index as the key */}
                            <div className="p-0">
                                <Card>
                                    <CardContent className="p-0 ">
                                        <div className="carousel-container" style={{ position: 'relative' }}>
                                            <div className='flex z-40'>
                                                <div className="cover-image-container" style={{height:'306px'}} >
                                                    <Skeleton className="w-[200px] h-[300px]" />
                                                </div>
                                                <div className='carousel-right-side w-full' >
                                                    <h1 className='font-extrabold text-gray-300 text-4xl manga-title'>
                                                        <Skeleton className="w-[80%] h-8" />
                                                    </h1>
                                                    <div className='pt-2 opacity-100'>
                                                        <span className='mr-2 mt-1'>
                                                            <Skeleton className="h-8 w-[30%] " />
                                                        </span>
                                                    </div>
                                                    <div className='text-gray-300 manga-desc'>
                                                            <Skeleton className="h-[140px] w-full " />                                                        
                                                    </div>
                                                    <div className='manga-author'>
                                                        <span className=''>
                                                            <Skeleton className="w-[150px] h-[20px]" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))
                ) : (
                    <div>No items available</div>
                )}
            </CarouselContent>
        </Carousel>
    )
}

export default LoadingPage