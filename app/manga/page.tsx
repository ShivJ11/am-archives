import MangaHeader from "../components/layout/mangaHeader"
import { HomeCarousel } from "../components/manga/mangaHomeCarousel"
import LatestUpdates from "../components/manga/mangaLatestUpdates"
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Manga - am Archives",
    description: "Read latest manga at am Archives",
  };

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