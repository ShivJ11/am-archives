import LoadingMangaTags from "@/app/components/manga/loadingUI/loadingMangaTags";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingPage(){
    return(
        <div>
            <div className='w-full px-5 mt-6'>                
                <div className='font-bold text-gray-300 text-4xl line-clamp-3'>
                    <Skeleton className="w-[80%] h-9"/>
                </div>
                <div className='mt-4'>
                    <LoadingMangaTags/>
                </div>
            </div>              
        </div>
    )
}
export default LoadingPage