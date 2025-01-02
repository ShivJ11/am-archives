import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DetailsButton({  animeId }: {  animeId:number }) {
    return (
        <div className="pt-5">
            <Link href={`/anime/${encodeURIComponent(animeId)}`}>
                <Button style={{ backgroundColor: 'rgb(71 85 105)', color: 'rgb(209 213 219)' }}> Detail<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                </Button>
            </Link>
        </div>
    )
}