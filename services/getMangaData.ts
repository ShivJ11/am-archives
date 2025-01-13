export function getPopularNewTitles() {
    const url = 'https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&createdAtSince=2024-12-06T18%3A30%3A00';
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
export function getLatestMangaCoverImageDetails(id:string){
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
        // ${manga.relationships.find((item: { type: string; }) => item.type === 'cover_art').attributes.fileName}`}
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
        // console.log(str);
        return getLatestMangaCoverImageDetails(str);
    });
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

