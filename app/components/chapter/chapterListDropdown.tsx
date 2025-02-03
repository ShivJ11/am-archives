"use client"
import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AggregateChapterData } from "@/interfaces/chapter.interface"
import { capitalizeFirstLetter } from "@/lib/helper"
import { useRouter } from "next/navigation"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const ChapterListDropdown = ({ group, currentChapter, currentVolume, mangaId }: {
    group: AggregateChapterData | null;
    currentChapter: string;
    currentVolume: string;
    mangaId: string | undefined;
}) => {
    const [selectedChapter, setSelectedChapter] = React.useState(currentChapter)
    const router = useRouter()
    const handleChapterSelect = (chapterNumber:string,chapterId: string) => {
        setSelectedChapter(chapterNumber)
        router.push(`/chapter/${chapterId}`)
    }
    const renderChapters = () => {
        if (!group) return null
        return Object.values(group.volumes).map((volume) => (
            <div key={volume.volume}>
                <DropdownMenuLabel>{`Vol. ${capitalizeFirstLetter(volume.volume)}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.values(volume.chapters).map((chapter) => (
                    <DropdownMenuCheckboxItem
                        key={chapter.id}
                        checked={selectedChapter === chapter.chapter}
                        onCheckedChange={() => handleChapterSelect(chapter.chapter,chapter.id)}
                    >
                        {`Ch.${chapter.chapter}`}
                    </DropdownMenuCheckboxItem>
                ))}
            </div>
        ))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='items-center rounded-sm flex justify-center text-gray-300 cursor-pointer' 
                style={{ backgroundColor: 'rgb(71, 85, 105)' }}>
                    {currentVolume ? `Vol. ${currentVolume},` : ''}
                    <span className='ml-1'>Ch. {currentChapter}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto">                
                {renderChapters()}
            </DropdownMenuContent>

        </DropdownMenu>
    )
}
