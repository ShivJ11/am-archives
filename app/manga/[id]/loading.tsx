import LoadingChaptersScrollArea from "@/app/components/manga/loadingUI/loadingChaptersScrollArea";
import { LoadingMangaDetailsPage } from "@/app/components/manga/loadingUI/loadingMangaDetailsPage";

function LoadingPage() {
    return (
        <div>
            <LoadingMangaDetailsPage />
            <LoadingChaptersScrollArea />
        </div>
 )
}

export default LoadingPage