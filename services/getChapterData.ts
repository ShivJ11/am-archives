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

const BASE_URL = `https://am-archives-api-f9eyawcrf0hzdmcb.southeastasia-01.azurewebsites.net/api/Chapter`;

export function getChapterDetailsById(id: string, router: any) {
    const url = `${BASE_URL}/details/${id}`;
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
    const url = `${BASE_URL}/feed/${id}`;
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
