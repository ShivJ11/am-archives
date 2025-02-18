'use client'
import React from 'react'

const PageScrollUp = () => {
    const isBrowser = () => typeof window !== 'undefined';
    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <div className='text-gray-300 fixed z-50 bottom-0 right-0 mr-4 mb-3 rounded-sm bg-gray-700 opacity-30 hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800 p-3 md:p-4 lg:p-4 text-xs md:text-sm lg:text-base' 
        onClick={scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
            </svg>
        </div>
    )
}

export default PageScrollUp