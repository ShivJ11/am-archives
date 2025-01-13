import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import './manga.css'
import Link from 'next/link';

function LoadingPage() {
    const array = new Array(16).fill(null);
    return (
        <div className='latest-update-container font-bold text-gray-300 text-4xl'>
            <div className='font-bold text-gray-300 text-4xl'>Latest Updates</div>
            <div className='grid gap-x-6 3xl:grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1'>
                <div style={{ backgroundColor: 'rgb(75 85 99 )', minHeight: '200px' }}>
                    <div className='grid gap-4 p-4'>
                        {array.length > 0 ? (
                            array.slice(0,8).map((manga: any, index: number) => {
                                return (
                                    <div className='flex gap-2' key={index}>
                                        <div style={{ height: '80px', minWidth: '56px', maxWidth: '56px' }}>
                                            <Link className='group flex items-start relative mb-auto select-none w-full h-full' href={{}}>
                                                <Skeleton className='w-full h-full'/>
                                            </Link>
                                        </div>
                                        <div className='flex-grow flex flex-col justify-evenly'>
                                            <Link href={{}}>
                                                <Skeleton className='w-[180px] h-[20px] text-base font-bold line-clamp-1 break-all'/>
                                            </Link>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2'>
                                                    <span className='line-clamp-1 text-base'><Skeleton className='w-[130px] h-[20px]'/></span>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center text-sm'><Skeleton className='w-[75px] h-[20px]'/></div>
                                                <div className='flex items-center text-sm'><Skeleton className='w-[60px] h-[20px]'/></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : (<div></div>)}
                    </div>                    
                </div>
                <div style={{ backgroundColor: 'rgb(75 85 99 )', minHeight: '200px' }}>
                <div className='grid gap-4 p-4'>
                        {array.length > 0 ? (
                            array.slice(8).map((manga: any, index: number) => {                               
                                return (
                                    <div className='flex gap-2' key={index}>
                                        <div style={{ height: '80px', minWidth: '56px', maxWidth: '56px' }}>
                                            <Link className='group flex items-start relative mb-auto select-none w-full h-full' href={{}}>
                                                <Skeleton className='w-full h-full'/>
                                            </Link>
                                        </div>
                                        <div className='flex-grow flex flex-col justify-evenly'>
                                            <Link href={{}}>
                                                <Skeleton className='w-[180px] h-[20px] text-base font-bold line-clamp-1 break-all'/>
                                            </Link>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-1 sm:gap-2 mr-1 sm:mr-2'>
                                                    <span className='line-clamp-1 text-base'><Skeleton className='w-[130px] h-[20px]'/></span>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center text-sm'><Skeleton className='w-[75px] h-[20px]'/></div>
                                                <div className='flex items-center text-sm'><Skeleton className='w-[60px] h-[20px]'/></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : (<div></div>)}
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default LoadingPage