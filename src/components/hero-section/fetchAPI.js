export function callAPI (page) {
    const url = `https://callboard-backend.goit.global/call?page=${page}`;
    return fetch(url)
        .then(response => response.ok ? response.json() :
                Promise.reject(new Error(`Error. Failed callAPI`)))
        .then(data => {
            console.log(url + ':');
            console.dir(data);
        })
        .catch(console.error)
}

export function callFindAPI (searchQuery) {
    const url = `https://callboard-backend.goit.global/call/find?search=${searchQuery}`;
    return fetch(url)
        .then(response => response.ok ? response.json() :
                Promise.reject(new Error(`Error. Failed callFindAPI`)))
        .then(data => {
            console.log(url + ':');
            console.dir(data);
        })
        .catch(console.error)
}

export function callCategoriesAPI () {
    const url = `https://callboard-backend.goit.global/call/categories`;
    return fetch(url)
        .then(response => response.ok ? response.json() :
                Promise.reject(new Error(`Error. Failed callCategoriesAPI`)))
        .then(data => {
            console.log(url + ':');
            console.dir(data);
        })
        .catch(console.error)
}

export function callRussianCategoriesAPI () {
    const url = `https://callboard-backend.goit.global/call/russian-categories`;
    return fetch(url)
        .then(response => response.ok ? response.json() :
                Promise.reject(new Error(`Error. Failed callRussianCategoriesAPI`)))
        .then(data => {
            console.log(url + ':');
            console.dir(data);
        })
        .catch(console.error)
}

export function callSpecificCategoryAPI () {
    const url = `https://callboard-backend.goit.global/call/specific/transport`;
    return fetch(url)
        .then(response => response.ok ? response.json() :
                Promise.reject(new Error(`Error. Failed callSpecificCategoryAPI`)))
        .then(data => {
            console.log(url + ':');
            console.dir(data);
        })
        .catch(console.error)
}

export function callAdsAPI () {
    const url = `https://callboard-backend.goit.global/call/ads`;
    return fetch(url)
        .then(response => response.ok ? response.json() :
                Promise.reject(new Error(`Error. Failed callAdsAPI`)))
        .then(data => {
            console.log(url + ':');
            console.dir(data);
            return data;
        })
        .catch(console.error)
}