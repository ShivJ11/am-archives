'use client'
import { MangaTag } from '@/interfaces/manga.interface'
import { capitalizeFirstLetter } from '@/lib/helper';
import { getMangaTag } from '@/services/getMangaData';
import React from 'react'
import LoadingMangaTags from '../loadingUI/loadingMangaTags';

const MangaTags = () => {
    const [mangaTags, setMangaTags] = React.useState<MangaTag[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        async function getMangaTags() {
            try {
                const result = await getMangaTag();
                setMangaTags(result.data);
            }
            catch (error) {
                console.error("Error fetching trending manga data", error);
            }
            finally {
                setLoading(false);
            }
        }
        getMangaTags();
    }, [])
    if (loading) {
        return <div><LoadingMangaTags/></div>;
    }
    if (!mangaTags) {
        return <div>No tags found</div>
    }
    const groupedTags = mangaTags.reduce((acc, tag) => {
        const group = tag.attributes.group;
        if (!group) return acc;
        if (!acc[group]) {
            acc[group] = { group: group, tags: [] };
        }
        if (tag.attributes.name && tag.attributes.name.en) {
            acc[group].tags.push(tag.attributes.name.en);
        }
        return acc;
    }, {} as Record<string, { group: string, tags: string[] }>);
    
    return (
        <>
            {Object.entries(groupedTags).map(([groupId, { group, tags }]) => (
                <div key={groupId}>
                    <h3 className='font-semibold text-xl text-gray-300 mt-3'>{capitalizeFirstLetter(group)}</h3>
                    <div>
                        {tags.map((tag, index) => (
                            <span className='mr-2 text-gray-300 content-center inline-flex justify-center rounded-sm px-1 mt-2' style={{backgroundColor:'rgb(75, 85, 99)'}} key={index}>{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default MangaTags