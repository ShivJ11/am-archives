const BASE_URL = `https://am-archives-api-f9eyawcrf0hzdmcb.southeastasia-01.azurewebsites.net/api/Manga`;

export function getPopularNewTitles() {
    const url = `${BASE_URL}/popular-new-titles`;
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

export function getLatestUpdates(limit:number,offset?:number) {
    if(!offset){
        offset=0;
    }
    const url = `${BASE_URL}/latest-updates?limit=${limit}&offset=${offset}`;
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

export function getLatestMangaCovers(limit:number,offset?:number) {
    if(!offset){
        offset=0;
    }
    const url = `${BASE_URL}/latest-manga-covers?limit=${limit}&offset=${offset}`;
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
    const url = `${BASE_URL}/latest-manga-cover-image-details?id=${id}`;
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
    const url = `${BASE_URL}/details/${id}`
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
    const url = `${BASE_URL}/chapters/${mangaId}?offset=${offset}`;
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
    const url=`${BASE_URL}/group/${mangaId}?translatedLanguage=${translatedLanguage}&groups=${groups}`
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
    const url=`${BASE_URL}/search?searchQuery=${searchQuery}&offset=${offset}`
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

export function getMangaTag(){
    const url=`${BASE_URL}/tags`
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

export function getMangaDetailsByTag(tagId:string,offset?:number){
    if(!offset){
        offset=0;
    }
    const url=`${BASE_URL}/by-tag?tagId=${tagId}&offset=${offset}`
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