'use client'; // This file is a client-side component

import Link from 'next/link';
import { useState } from 'react';

const HamburgerButton = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div>
            {/* Mobile menu button */}
            <div className="relative">
                <button
                    type="button"
                    className="fixed top-3  z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
                    onClick={toggleMobileMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    {/* Icon when menu is closed */}
                    <svg
                        className={`block w-6 h-6 ${isMobileMenuOpen ? 'hidden' : 'block'} mr-1`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                    {/* Icon when menu is open */}
                    <svg
                        className={`block w-6 h-6 ${isMobileMenuOpen ? 'block' : 'hidden'} mr-1`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    Menu
                </button>
            </div>

            {/* Mobile menu (the box below the navbar) */}
            <div
                className={` rounded-3xl sm:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block mt-8 fixed inset-x-0 bg-black text-white p-4 opacity-90 mx-4' : 'hidden'}`}
                id="mobile-menu" style={{zIndex:'110'}}
            >
                <ul>
                    <li>
                        <Link href={''} className="flex justify-center px-4 py-3 text-white">Home</Link>
                    </li>
                    {/* Add other menu items here */}
                    <li>
                        <Link href={''} className="flex justify-center px-4 py-3 text-white">Movies</Link>
                    </li>
                    <li>
                        <Link href={''} className="flex justify-center px-4 py-3 text-white">TV Series</Link>
                    </li>
                    <li>
                        <Link href={''} className="flex justify-center px-4 py-3 text-white">Most Popular</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HamburgerButton;
