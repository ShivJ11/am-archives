"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useState } from "react"

const searchButtonStyle = {
    backgroundColor: 'rgb(140, 180, 230)',
    color: 'black'
}

export function MobileSearchBar({ name }: { name: string }) {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleSearch = () => {
        router.push(`/manga/search?q=${query}`);
    };
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </Button>

            </SheetTrigger>
            <SheetContent side="top" className="bg-slate-600 border-none">
                <SheetHeader>
                    <SheetTitle className="text-gray-300">Search {name}</SheetTitle>
                </SheetHeader>
                <SheetDescription className="text-gray-300">
                    Use the search bar below to find {name}.
                </SheetDescription>
                <div className="flex w-full max-w-sm items-center space-x-2 mt-1">
                    <Input type="text" placeholder={`Search ${name}...`} value={query} onChange={handleInputChange} />
                    <Button type="submit" style={searchButtonStyle} onClick={handleSearch} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
