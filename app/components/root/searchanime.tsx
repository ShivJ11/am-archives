import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SearchAnimeButton() {
    return (
        <div className="pt-5">
            <Link href={'/anime'}>
                <Button style={{ backgroundColor: 'rgb(140, 180, 230)', color: 'black' }}> Watch anime <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                </Button>
            </Link>
        </div>
    )
}