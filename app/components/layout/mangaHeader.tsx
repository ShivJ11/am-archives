'use client'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '../root/searchBar';
import Link from 'next/link';
import { UserAuth } from '@/app/context/authContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const MangaHeader = () => {
    const { user, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const handleLogOut = async () => {
        try {
            await logOut();
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    });
    return (
        <nav className="bg-slate-600 ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex py-3 items-center justify-between">
                <Link href={'/manga'}>
                    <img src="/logo2.png" alt="am Archives" className="w-40" />
                </Link>
                <SearchBar name="manga" />
                {loading ? null : !user ? (
                    <Link href={'/login'} className='text-gray-300 ml-2 flex'>
                        Login
                    </Link>
                ) : (
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={ 'dp2.jpg'} />
                                        <AvatarFallback>MR</AvatarFallback>
                                    </Avatar>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="flex flex-col gap-2 px-3 py-2">    
                                        <li><NavigationMenuLink href="/manga">Profile</NavigationMenuLink></li>
                                        {/* <li><NavigationMenuLink href="/">Settings</NavigationMenuLink></li> */}
                                        <li><NavigationMenuLink onClick={handleLogOut} style={{cursor:'pointer'}}>Logout</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                )}

            </div>
        </nav>
    );
}

export default MangaHeader