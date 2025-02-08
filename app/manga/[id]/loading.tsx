import LoadingChaptersScrollArea from "@/app/components/manga/loadingChaptersScrollArea";
import { LoadingMangaDetailsPage } from "@/app/components/manga/loadingMangaDetailsPage";

function LoadingPage() {
    return (
        <div>
            <LoadingMangaDetailsPage />
            <LoadingChaptersScrollArea />
        </div>
 )
}

export default LoadingPage