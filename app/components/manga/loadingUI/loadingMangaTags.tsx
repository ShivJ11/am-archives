import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const LoadingMangaTags = () => {
    const array = new Array(4).fill(null);
    const subArray = new Array(32).fill(null);
    return (
        <div>
            {array.length > 0 ? (array.map((manga: any, index: number) => {
                return (
                    <div key={index}>
                        <h3 className='font-semibold text-xl text-gray-300 mt-3'><Skeleton className='w-[50%] h-5' /></h3>
                        {subArray.length > 0 ? (subArray.map((sub: any,index:number) => {
                            return (
                                <div key={index} className='mr-2 text-gray-300 content-center inline-flex justify-center rounded-sm px-1 mt-2'>
                                    <Skeleton className='w-24 h-4' />
                                </div>
                            )
                        })) : (<div></div>)}
                    </div>
                )
            })) : (<div></div>)}
        </div>
    )
}

export default LoadingMangaTags