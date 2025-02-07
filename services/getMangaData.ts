export function getPopularNewTitles() {
    const url = 'https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleResponse);
}

export function getLatestUpdates() {
    const url = 'https://api.mangadex.org/chapter?limit=16&offset=0&includes[]=user&includes[]=scanlation_group&includes[]=manga&contentRating[]=safe&contentRating[]=suggestive&order[readableAt]=desc';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleResponse);
}

export function getLatestMangaCovers() {
    const url = 'https://api.mangadex.org/chapter?limit=16&offset=0&includes[]=user&includes[]=scanlation_group&includes[]=manga&contentRating[]=safe&contentRating[]=suggestive&order[readableAt]=desc';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(mangaCovers)
}
export function getLatestMangaCoverImageDetails(id: string) {
    const url = `https://api.mangadex.org/manga?${id}&limit=100&includes[]=author&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic&includes[]=cover_art`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleResponse);
}
function mangaCovers(response: { json: () => Promise<any>; ok: any }) {
    return response.json().then(function (json) {
        if (!response.ok) {
            console.error('API response not OK', json);
            return Promise.reject(json);
        }
        let str = '';
        json.data.forEach((manga: any, index: number) => {
            const found = manga.relationships.find((item: { type: string; }) => item.type === 'manga');
            if (found) {
                if (str) {
                    str += `&ids[]=${found.id}`;
                } else {
                    str = `&ids[]=${found.id}`;
                }
            }
        });
        return getLatestMangaCoverImageDetails(str);
    });
}

export function getMangaDetailsById(id: string, router: any) {
    const url = `https://api.mangadex.org/manga/${id}?includes[]=artist&includes[]=author&includes[]=cover_art`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleMangaResponse);

    function handleMangaResponse(response: { json: () => Promise<any>; ok: any }) {
        return response.json().then(function (json) {
            if (!response.ok) {
                console.error('API response not OK', json);
                router.push('/404');
                return;
            }
            console.log(json);
            return json;
        });
    }
}

function handleResponse(response: { json: () => Promise<any>; ok: any }) {
    return response.json().then(function (json) {
        if (!response.ok) {
            console.error('API response not OK', json);
            return Promise.reject(json);
        }
        console.log(json);
        return json;
    });
}

export function getMangaChaptersList(mangaId:string,offset?:number){
    if(!offset){
        offset=0;
    }
    const url = `https://api.mangadex.org/manga/${mangaId}/feed?limit=96&includes[]=scanlation_group&includes[]=user&order[volume]=asc&order[chapter]=asc&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleResponse);
}

export function getMangaGroup(mangaId:string,translatedLanguage:string,groups:string){
    const url=`https://api.mangadex.org/manga/${mangaId}/aggregate?translatedLanguage[]=${translatedLanguage}&groups[]=${groups}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleResponse);
}

export function getSearchMangaResults(searchQuery:string,offset?:number){
    if(!offset){
        offset=0;
    }
    const url=`https://api.mangadex.org/manga?limit=32&offset=${offset}&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&title=${searchQuery}&includedTagsMode=AND&excludedTagsMode=OR`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    return fetch(url, options)
        .then(handleResponse);
}