import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileSearchBar } from "./mobileSearchBar";

export function SearchBar(name:{name:string}) {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2 justify-end">
            <Input type="text" placeholder={`Search ${name.name}...`} className="max-sm:hidden"/>
            <Button type="submit" className="max-sm:hidden"  style={{ backgroundColor: 'rgb(140, 180, 230)', color: 'black'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>  
            </Button>
            <div className="sm:hidden "><MobileSearchBar name={name.name}/></div>
        </div>
    )
}
