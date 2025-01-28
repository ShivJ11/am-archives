import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const MangaChapterListPagination = ({
    totalChapters,
    currentPage,
    onPageChange,
}: {
    totalChapters:number|undefined;
    currentPage: number;
    onPageChange: (page: number) => void;
}) => {
    let totalPages;
    if(totalChapters){
        totalPages = Math.ceil(totalChapters/96);
    } else{
        totalPages = 1;                
    }
    if(totalPages===1){
        return
    }
    const pageNumbers = [];
    // Add two pages before, the current page, and two pages after
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        pageNumbers.push(i);
    }
    // Add ellipsis if there are pages to the left of the current range
    const showLeftEllipsis = pageNumbers[0] > 1;
    // Add ellipsis if there are pages to the right of the current range
    const showRightEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

    return (
        <Pagination  className="mx-auto">
            <PaginationContent className="flex flex-wrap justify-center items-center gap-2">
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) {
                                onPageChange(currentPage - 1); // Go to the previous page
                            }
                        }}
                    />
                </PaginationItem>

                {/* Show the left ellipsis if needed */}
                {showLeftEllipsis && (
                    <PaginationItem key="ellipsis-left">
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Show the page numbers */}
                {pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page); // Go to the clicked page
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Show the right ellipsis if needed */}
                {showRightEllipsis && (
                    <PaginationItem key="ellipsis-right">
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Show the last page number */}
                {showRightEllipsis && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(totalPages); // Go to the last page
                            }}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) {
                                onPageChange(currentPage + 1); // Go to the next page
                            }
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};


export default MangaChapterListPagination