'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileSearchBar } from "./mobileSearchBar";
import { useRouter } from "next/navigation";

export function SearchBar({ name }: { name: string }) {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleSearch = () => {
        router.push(`/manga/search?q=${query}`);
    };

    return (
        <div className="flex w-full max-w-sm items-center space-x-2 justify-end">
            <Input type="text" placeholder={`Search ${name}...`} className="max-sm:hidden" value={query} onChange={handleInputChange}/>
            <Button type="button" className="max-sm:hidden" style={{ backgroundColor: 'rgb(140, 180, 230)', color: 'black' }} onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </Button>
            <div className="sm:hidden">
                <MobileSearchBar name={name} />
            </div>
        </div>
    );
}
