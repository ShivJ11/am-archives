import { Skeleton } from "@/components/ui/skeleton";
import './manga.css'
function LoadingChaptersScrollArea() {
    const array = new Array(8).fill(null);
    return (
          <div className='flex gap-6 items-start px-10 text-gray-300'>
            <div className='flex-grow'>
              <div className='flex gap-x-2 mb-4'></div>
              <div>
                {array.length > 0 ? (array.map((manga: any, index: number) => {                                      
                  if (index === 0) {
                    return <VolumeContent key={index} />;
                  } else {
                    if (manga?.attributes.volume !== array[index - 1]?.attributes.volume) {
                      return <VolumeContent key={index}/>;
                    } else if (manga?.attributes.chapter === array[index - 1]?.attributes.chapter) {
                      return <UploaderContentWithStyle key={index}/>;
                    } else {
                      return <ChapterContent key={index}/>
                    }
                  }
                })) : (<div></div>)}
                <div className='flex justify-center flex-wrap gap-2 mt-6'>
                  {/* pagination */}
                </div>
              </div>
            </div>
          </div>
        )
}

const VolumeContent = () => {
    return (
        <div className='flex flex-col mt-6'>
        <div className='grid grid-cols-12 mb-2 cursor-pointer'>
          <div className='col-span-4 flex justify-start'>
            <Skeleton className='w-[70px] h-full' />
          </div>
          <div className='col-span-4 flex justify-center'>
            <Skeleton className='w-[40px] h-full' />
          </div>
          <div className='col-span-4 flex justify-end'>
            <Skeleton className='w-[20px] h-[20px]' />
          </div>
        </div>
        <ChapterContent />
      </div>
    )
  }
  const ChapterContent = () => {    
    return (
      <div className='rounded flex flex-col gap-2 h-auto mt-2'>
        <div className='rounded-sm' style={{ backgroundColor: 'rgb(75 85 99 )' }}>
          <div className='chapter-header two-line'>
            <div className='flex'>
              <span className='font-bold self-center whitespace-nowrap'>
                {/* Chapter 1 */}
                <Skeleton className='w-[70px] h-[20px]'/>
              </span>
            </div>          
            <Skeleton className='w-[20px] h-[20px] '/>   
          </div>
          <div className='h-auto'>
            {/* looping for this same chapter different uploader div */}
            
              <div >
                {/* looping for this same chapter different uploader div */}
                <UploaderContent />
              </div>
            
          </div>
        </div>
      </div>
    )
  }
  export const UploaderContentWithStyle = () => {
    return (
      <div className='rounded flex flex-col gap-2 h-auto'>
        <div className='rounded-sm' style={{ backgroundColor: 'rgb(75 85 99 )' }}>
        
              <div >  
                <UploaderContent  />
              </div>
            
        </div>
      </div>
    )
  }
  const UploaderContent = () => {
    return (
      <div className='flex chapter relative read' >
        <div className='chapter-line twoLine'>
          <div className='chapter-line-top twoLine'></div>
          <div className='chapter-line-bottom twoLine'></div>
          <div className='chapter-line-extend twoLine'></div>
        </div>
        <div  className='chapter-grid flex-grow'>
          <div className='flex flex-grow items-center'>
            {/* flag image */}
            {/* <img src={`https://mangadex.org/img/flags/${processLanguageCode(manga.manga.attributes.translatedLanguage)}.svg`} onError={(e) => { (e.target as HTMLImageElement).src = 'https://mangadex.org/img/flags/gb.svg'; }} alt="" className='inline-block select-none flex-shrink-0 !h-5 !w-5 ' /> */}
            <span className='chapter-link ml-1 font-bold my-auto flex items-center space-x-1'><span className='line-clamp-1 '>
              {/* chapter name */}
              {/* {manga.manga.attributes.title ?? "No title"} */}<Skeleton className='w-[80px] h-[18px] text-right'/>   
            </span></span>
          </div>
          <div className='comment-container hover justify-self-start' style={{ gridArea: "comments" }}>
            
            <Skeleton className='w-[20px] h-[20px] '/>  
            <Skeleton className='w-[20px] h-[20px] '/>  
          </div>
          <div className='flex items-center justify-self-start'>          
            <div className='flex items-center space-x-1'>
              <div className='px-1'>
                {/* username */}
                <Skeleton className='w-[50px] h-[20px] '/>  
                {/* {manga.manga.relationships.find((relation: { type: string }) => relation.type === "scanlation_group")?.attributes.name ?? "No group"} */}
              </div>
            </div>
          </div>
          <div className='flex items-center whitespace-nowrap justify-self-start' style={{ gridArea: "views" }}>
            <Skeleton className='w-[20px] h-[20px] '/>  
            <Skeleton className='w-[20px] h-[20px] ml-1 '/>  
          </div>
          <div className='user-tag flex items-center justify-self-start' style={{ gridArea: "uploader" }}>            
            <div className='line-clamp-1 break-all px-1 rounded duration-100 pill lift'>                
              {/* User tag */}<Skeleton className='w-[40px] h-[20px] '/>
              {/* {manga.manga.relationships.find((relation: { type: string }) => relation.type === "user")?.attributes.username ?? "No user"} */}
            </div>
          </div>
          <div className='flex items-center timestamp justify-self-start' style={{ gridArea: "timestamp" }}>           
  
            <div className='whitespace-nowrap px-1'>
              {/* some time ago */}<Skeleton className='w-[40px] h-[20px] '/>  
              {/* {formatDistanceToNow(manga.manga.attributes.updatedAt) ?? ""} */}
            </div>
          </div>
        </div>
      </div>
    )
  }  


export default LoadingChaptersScrollArea