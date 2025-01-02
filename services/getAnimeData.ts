import { animeDetailsById, getTrendingAnime } from "@/lib/queries";

export function getTrendingAnimeData() {
    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: getTrendingAnime,
        }),
    };

    return fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response: { json: () => Promise<any>; ok: any }) {
        return response.json().then(function (json) {
            if (!response.ok) {
                console.error('API response not OK', json);
                return Promise.reject(json);
            }
            return json;
        });
    }

    function handleData(data: any) {
        console.log('API response data:', data);
        if (data && data.data.Page && Array.isArray(data.data.Page.media)) {
            return data;
        } else {
            console.error('Unexpected data structure:', data);
            return { Page: { media: [] } };
        }
    }

    function handleError(error: any) {
        console.error('Error fetching data:', error);
        return { Page: { media: [] } };
    }

}

export function getAnimeDetailById(animeId: number, router: any) {
    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: animeDetailsById,
            variables: { id: animeId }
        }),
    };

    return fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response: { json: () => Promise<any>; ok: any }) {
        return response.json().then(function (json) {
            if (!response.ok) {
                console.error('API response not OK', json);
                router.push('/404');  
                return;
            }
            return json;
        });
    }

    function handleData(data: any) {
        console.log('API response data:', data);
        if (data && data.data.Media) {
            return data;
        } else {
            console.error('Unexpected data structure:', data);
            return { Page: { media: [] } };
        }
    }

    function handleError(error: any) {
        console.error('Error fetching data:', error);
        return { Page: { media: [] } };
    }
}
