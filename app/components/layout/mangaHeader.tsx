import React from 'react'
import { SearchBar } from '../root/searchBar';
import Link from 'next/link';

const MangaHeader = () => {
    return (
        <nav className="bg-slate-600 ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex py-3 items-center justify-between">
                <Link href={'/manga'}>
                    <img src="/logo2.png" alt="am Archives" className="w-40" />
                </Link>
                <SearchBar name="manga" />
                <h1 className='text-gray-300 ml-2 flex'>
                    User</h1>
            </div>
        </nav>
    );
}

export default MangaHeader