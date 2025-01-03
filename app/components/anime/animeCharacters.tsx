import { useState } from 'react';
import { CharacterEdge } from "@/interfaces/anime.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface AnimeData {    
    edges: CharacterEdge[];      
}

const AnimeCharacters: React.FC<AnimeData> = ({ edges }) => {
    const [showModal, setShowModal] = useState(false); // To control modal visibility
    const [visibleCount, setVisibleCount] = useState(8); // Initially show 2 rows (16 characters for 2 rows)

    // Handle the Show More button click
    const handleShowMore = () => {
        setShowModal(true); // Show modal when "Show More" is clicked
    };

    // Handle closing the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8">
                <ul role="list" className="characters-list grid gap-x-8 gap-y-12">
                    {edges.slice(0, visibleCount).map((person) => (
                        <li key={person.node.name.full}>
                            <div className="flex items-center gap-x-6">
                                <img alt="" src={person.node.image.large} className="size-16 rounded-full" />
                                <div>
                                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-300">{person.node.name.full}</h3>
                                    <p className="text-sm/6 font-semibold text-gray-300">{person.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul></div>
                {visibleCount < edges.length && (
                    <div className='flex justify-center pt-5'>
                        <button 
                        onClick={handleShowMore} 
                        className="text-sm  hover:underline " style={{color:"#ffbade"}}
                    >
                        Show More
                    </button>
                    </div>
                )}
            

            {/* Modal for displaying all characters */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-slate-600 p-6 rounded-lg w-full max-w-lg max-h-[85vh] overflow-hidden">
                        <h2 className="text-xl font-semibold text-gray-300 ">All Characters</h2>

                        {/* Scrollable area with ScrollArea component */}
                        <ScrollArea className="h-60 max-h-[70vh] space-y-4 overflow-hidden">
                            <div className="p-4">
                                {edges.map((person) => (
                                    <div key={person.node.name.full}>
                                        <div className="flex items-center gap-x-6">
                                            <img alt="" src={person.node.image.large} className="size-16 rounded-full" />
                                            <div>
                                                <h3 className="text-base/7 font-semibold tracking-tight text-gray-300">{person.node.name.full}</h3>
                                                <p className="text-sm/6 font-semibold text-gray-300">{person.role}</p>
                                            </div>
                                        </div>
                                        <Separator className="my-2" />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <button 
                            onClick={closeModal} 
                            className="mt-4 text-sm text-gray-300 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimeCharacters;
