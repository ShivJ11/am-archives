import { Skeleton } from "@/components/ui/skeleton";

function LoadingChapterContent() {
    return (
        <div>
            {/* Chapter options to add */}
            <div className='p-4 '>
                <div className='flex-grow'>
                    <Skeleton className='w-[60%] h-9 mb-2 ' />
                    <Skeleton className="w-[40%] h-5" />
                </div>
                <div className='grid mt-2 mb-2 gap-x-2 grid-cols-2'>
                    <Skeleton className="w-full h-5" />
                    <Skeleton className="w-full h-5" />
                </div>
                <div className='flex flex-wrap items-center'>
                    <span className='text-gray-300 flex w-full justify-center items-center mb-1'><Skeleton className="w-56 h-5" /></span>
                    <div className='flex w-full justify-center items-center'>
                        <span className='text-gray-300 mr-1'><Skeleton className="w-32 h-5" /> </span>
                        <Skeleton className="w-7 h-5" />
                        <span className='ml-1 text-gray-300'><Skeleton className="w-32 h-5" /></span>
                    </div>
                </div>
                <div className='grid mt-2 mb-2 gap-x-2 grid-cols-2'>
                    <Skeleton className="w-full h-5" />
                    <Skeleton className="w-full h-5" />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <ImageLoading />
            </div>
            <div className='p-4 mt-1'>
                <div className='grid mt-2 mb-2 gap-x-2 grid-cols-2'>
                    <Skeleton className="w-full h-5" />
                    <Skeleton className="w-full h-5" />
                </div>
            </div>
        </div>
    )
}
function ImageLoading() {
    return (
        <Skeleton className="w-full h-80" />
    )
}
export default LoadingChapterContent