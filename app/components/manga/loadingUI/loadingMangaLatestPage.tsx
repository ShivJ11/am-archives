import { Skeleton } from "@/components/ui/skeleton";
import { UploaderContentWithStyle } from "./loadingChaptersScrollArea";

export function LoadingMangaLatestPage() {
    const array = new Array(8).fill(null);
    return (
        <div>
            {array.length > 0 ? (array.map((manga: any, index: number) => {
                return (
                    <div key={index}
                        className="chapter-feed-container details expand mb-4 bg-accent rounded-sm grid gap-2 p-2 grid-cols-[48px_minmax(0,_1fr)] lg:grid-cols-[120px_minmax(0,_1fr)] xl:grid-cols-[140px_minmax(0,_1fr)]"
                        style={{ backgroundColor: 'rgb(75, 85, 99)' }}>
                        {/* Image section (Left side) */}
                        <div className="border-sm max-w-full overflow-hidden relative shadow-sm lg:h-[200px]">
                            <div className="group flex items-start mb-auto select-none w-full h-full left-0 top-0 absolute">
                                {/* <img
                                    src={`https://uploads.mangadex.org/covers/${cover?.id}/${fileName}`}
                                    alt={`Cover of ${cover?.attributes.title.en}`}
                                    className="rounded shadow-md w-full h-[100px]  lg:h-[240px] object-cover"
                                /> */}
                                <Skeleton className="w-full h-[100px]  lg:h-[240px] rounded shadow-md"/>
                            </div>
                        </div>

                        {/* Content section (Right side) */}
                        <div className="flex flex-col gap-2">
                            <div className="self-start text-sm font-bold leading-tight w-full overflow-hidden break-words lg:text-base lg:leading-6 text-gray-300 line-clamp-1">
                                <Skeleton className="w-[80%] h-6"/>
                            </div>
                            <div className="border-b-[1px] border-b-gray-300 w-full "></div>

                            {/* UploaderContent - Render all chapters of this manga */}
                            <UploaderContentWithStyle />
                        </div>
                    </div>
                )
            })) : (<div></div>)}
        </div>
    )
}