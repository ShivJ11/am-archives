function fetchData(url: string, options: RequestInit, router: any) {
    return fetch(url, options)
        .then(async (response) => {
            if (!response.ok) {
                const errorJson = await response.json();
                console.error('API response not OK', errorJson);
                router.push('/404');
                throw new Error('API response not OK');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Network error or other issue:', error);
            router.push('/404');
        });
}

export function getChapterDetailsById(id: string, router: any) {
    const url = `https://api.mangadex.org/chapter/${id}?includes[]=scanlation_group&includes[]=manga&includes[]=user`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    return fetchData(url, options, router)
        .then((json) => {
            console.log(json);
            return json;
        });
}

export function getChapterFeedById(id: string, router: any) {
    const url = `https://api.mangadex.org/at-home/server/${id}?forcePort443=false`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };
    return fetchData(url, options, router)
        .then((json) => {
            console.log(json);
            return json;
        });
}
