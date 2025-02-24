import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSearchResults(){
    const array = new Array(32).fill(null);
    return(
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
            {array.length > 0 ? (
                array.map((manga: any, index: number) => (                    
                    <div className='rounded-sm block overflow-hidden relative' key={index}>
                        <div className='w-full relative'>
                            <div className='group flex items-start relative mb-auto select-none aspect h-full w-full left-0 top-0'>                                
                                <Skeleton className='rounded shadow-md w-full h-auto aspect-[3/4] object-cover' />
                            </div>
                        </div>
                    </div>
                ))
            ) : (<></>)}            
        </div>
    )
}