'use client'
import { MangaTag } from '@/interfaces/manga.interface'
import { capitalizeFirstLetter, removeSpace } from '@/lib/helper';
import { getMangaTag } from '@/services/getMangaData';
import React, { useState, useEffect, useMemo } from 'react'
import LoadingMangaTags from '../loadingUI/loadingMangaTags';
import Link from 'next/link';

const MangaTags = () => {
    const [mangaTags, setMangaTags] = useState<MangaTag[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchMangaTags() {
            try {
                const result = await getMangaTag();
                setMangaTags(result.data);
            }
            catch (error) {
                console.error("Error fetching manga tags", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMangaTags();
    }, []);

    const groupedTags = useMemo(() => {
        if (!mangaTags) return {};

        return mangaTags.reduce((acc, tag) => {
            const group = tag.attributes.group;
            if (!group) return acc;
            if (!acc[group]) {
                acc[group] = { group: group, tags: new Map() };
            }
            if (tag.attributes.name && tag.attributes.name.en) {
                acc[group].tags.set(tag.id, tag.attributes.name.en);
            }
            return acc;
        }, {} as Record<string, { group: string, tags: Map<string, string> }>);
    }, [mangaTags]);

    if (loading) {
        return <div><LoadingMangaTags /></div>;
    }
    if (!mangaTags || Object.keys(groupedTags).length === 0) {
        return <div>No tags found</div>;
    }

    return (
        <>
            {Object.entries(groupedTags).map(([groupId, { group, tags }]) => (
                <div key={groupId}>
                    <h3 className='font-semibold text-xl text-gray-300 mt-3'>
                        {capitalizeFirstLetter(group)}
                    </h3>
                    <div>
                        {Array.from(tags.entries()).map(([id, tag]) => (
                            <Link
                                href={`/manga/tag/${removeSpace(tag)}/${id}`}
                                className='mr-2 text-gray-300 content-center inline-flex justify-center rounded-sm px-1 mt-2'
                                style={{ backgroundColor: 'rgb(75, 85, 99)' }}
                                key={tag}
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default MangaTags;
