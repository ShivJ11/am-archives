import { Skeleton } from "@/components/ui/skeleton";
import '../manga.css'
import { Separator } from "@/components/ui/separator";

export function LoadingMangaDetailsPage() {
    return (
        <div className="flex flex-wrap pt-16 pb-8 px-10 " >
            <div className="detail-page-first-section justify-center">
                <Skeleton className="w-[190px] h-[240px]" />
            </div>
            <div className="text-gray-300 detail-page-mid-section">
                <div className='flex'>
                    <Skeleton className="h-6 w-[20%]" />
                    <div className='dot-center'></div>
                    <Skeleton className="h-6 w-[40%]" />
                </div>
                <h1 className='text-4xl pt-4 font-bold line-clamp-3'><Skeleton className="h-9 w-full" /></h1>
                <div className='flex pt-4'>
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className='pt-4'>
                    <Skeleton className="h-[150px] rounded-md " />
                </div>
            </div>
            <div className="text-gray-300 detail-page-last-section">
                <div><Skeleton className="w-[90%] h-6" /></div>
                <div className='pt-1'><Skeleton className="w-[40%] h-6" /></div>
                <div className='pt-1'><Skeleton className="w-[20%] h-6" /></div>
                <div className='pt-1'><Skeleton className="w-[30%] h-6" /></div>
                <div className='pt-1'><Skeleton className="w-[10%] h-6" /></div>
                <div className='pt-3 pb-2 detail-page-last-section-separator'><Separator /></div>
                <div className='pt-1'><Skeleton className="w-[50%] h-6" /></div>
                <div className='pt-1'><Skeleton className="w-[60%] h-6" /></div>
            </div>
        </div>
    )
}