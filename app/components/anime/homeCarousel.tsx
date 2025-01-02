'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getTrendingAnimeData } from "@/services/getAnimeData"
import './anime.css'
import { getMonthName, truncateDescription } from "@/lib/helper"
import { WatchNowButton } from "./watchNowButton"
import { DetailsButton } from "./detailsButton"
import { AnimeData } from "@/interfaces/anime.interface"

export function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnFocusIn: false, stopOnLastSnap: false, stopOnMouseEnter: false })
  )
  const [trendingAnime, setTrendingAnime] = React.useState<AnimeData[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  // Fetching data when the component is mounted
  React.useEffect(() => {
    async function fetchTrendingAnime() {
      try {
        const data = await getTrendingAnimeData(); // Await the promise returned from the function
        if (data && data.data.Page && Array.isArray(data.data.Page.media)) {
          setTrendingAnime(data.data.Page.media); // Set the state with the fetched data
        } else {
          console.error('Invalid data structure', data);
        }
      } catch (error) {
        console.error("Error fetching trending anime data", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    }

    fetchTrendingAnime();
  }, [])

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {trendingAnime.length > 0 ? (
          trendingAnime.map((anime: any, index: number) => (
            <CarouselItem key={anime.id}>
              <div className="p-0">
                <Card>
                  <CardContent className="p-0 ">
                    <div className="carousel-container" style={{ position: 'relative' }}>
                      <div className="carousel-image-container" style={{ position: "absolute", top: "0", right: "0", bottom: "0", overflow: "hidden" }}>
                        <img style={{ width: "100%", height: "100%", position: "absolute", objectFit: "cover", opacity: "0.5" }} src={anime.bannerImage} alt="" />
                      </div>
                      <div style={{ zIndex: 100, position: "relative", maxWidth: "500px" }}>
                        <div className="italic" style={{color:"rgb(140, 180, 230)"}}>#{anime.trending} trending</div>
                        <h1 className="text-gray-300 text-6xl mb-2 pt-4">{anime.title.romaji || anime.title.english}</h1>
                        <div className="flex text-gray-300 pt-4">
                          <div className="flex pr-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                          </svg><div className="pl-1">{anime.format}</div></div>
                          <div className="flex pr-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <div className="pl-1">{anime.duration}m</div>
                          </div>
                          <div className="flex pr-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                          </svg><div className="pl-1">{getMonthName(anime.startDate.month)} {anime.startDate.day}, {anime.startDate.year}</div>
                          </div>
                          <div className="flex pr-4">
                            <div className="hd-box">HD</div>
                          </div>
                          <div className="flex">
                            <div className="flex episode-box"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg><div className="pl-1">{anime.episodes}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-300 pt-4">
                          {truncateDescription(anime.description, 130)}
                        </div>
                        <div className="flex gap-4">
                          <WatchNowButton/>
                          <DetailsButton animeId={anime.id}/>
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
  )
}
