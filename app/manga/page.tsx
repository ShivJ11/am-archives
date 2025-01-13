import MangaHeader from "../components/layout/mangaHeader"
import { HomeCarousel } from "../components/manga/mangaHomeCarousel"
import LatestUpdates from "../components/manga/mangaLatestUpdates"

const Manga = () => {
  return (
    <div>
        <MangaHeader/>
        <HomeCarousel/>
        <LatestUpdates/>    
    </div>
  )
}

export default Manga