import MangaHeader from "../components/layout/mangaHeader"
import { HomeCarousel } from "../components/manga/component/mangaHomeCarousel"
import LatestUpdates from "../components/manga/component/mangaLatestUpdates"
import { Metadata } from 'next';
import PageScrollUp from "../components/root/pageScrollUp";

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
        <PageScrollUp/>
    </div>
  )
}

export default Manga