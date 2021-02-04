import axios from 'axios';
import localStoradge from './local-storadge.js';
export let jsDataBase = [];
let pageNumber = 1;
let id = "6018c8769dfece51e3667546";
const getHeroAds = function () {
    return axios.get('https://callboard-backend.goit.global/call/ads')
        .then(({ data }) => data)
        .catch((error) => error)
};


const registerData = {
    email: "testwwerdfcwq@test.com",
    password: "qwerty123",
};
export const registerUserApi = function (registerData) {

    return axios.post('https://callboard-backend.goit.global/auth/register', registerData).
        then(({ data }) => data)
        .catch(error => console.log(error));
}

export const loginFetch = function (loginData) {
    return fetch(`https://callboard-backend.goit.global/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => {
            localStoradge.save('accessTokenOlx', data.accessToken);
            return data;

        })
        .catch(error => console.log(error));
}
// loginFetch(registerData).then(data => {
//     console.log(data);
//     console.log(data.accessToken)
// });

export const logoutFetch = function () {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/auth/logout`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => {
            localStorage.clear()
            return response.json();
        })
        .catch(error => console.log(error));
}

export const getUsersInfoByToken = function () {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getUsersInfoByID = function (id) {
    return fetch(`https://callboard-backend.goit.global/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const getAllCategoriesWithItemsByPages = function (pageNumber) {
    return fetch(`https://callboard-backend.goit.global/call?page=${pageNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => {
            const dataArr = Object.values(data);
            dataArr.forEach(element => {
                jsDataBase = [...jsDataBase, ...element];
            });
            return data;
        })
        .catch(error => console.log(error));
}

export const getUsersFavouritesByToken = function () {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call/favourites`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(({ favourites }) => {
            jsDataBase = favourites.length ? [...jsDataBase, ...favourites] : jsDataBase;
            return favourites;
        })
        .catch(error => console.log(error));
}
/// нужно тестить
export function createItemFetch(item) {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .then(data => {
            jsDataBase.push(data);
            return data;
        })
        .catch(error => console.log(error));
}

export function addItemToFavourite(itemId) {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call/favourite/${itemId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function deleteItemFromFavourite(itemId) {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call/favourite/${itemId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function changeItemFetch(id, newItem) {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newItem),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .then(data => {
            let changedItemIndex =
                jsDataBase.map(item => {
                    if (item._id === id) {
                        return data;
                    }
                    return item;
                })
            return data;
        })
        .catch(error => console.log(error));
}

export function deleteItemFetch(id) {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function getUsersOwnItems() {
    const accessToken = localStoradge.load('accessTokenOlx');
    return fetch(`https://callboard-backend.goit.global/call/own`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(({ favourites }) => {
            jsDataBase = favourites.length ? [...jsDataBase, ...favourites] : jsDataBase;
            return favourites;
        })
        .catch(error => console.log(error));
};

export function getItembyTitle(searchQuerry) {
    return fetch(`https://callboard-backend.goit.global/call/find?search=${searchQuerry}`, {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(({ favourites }) => {
            jsDataBase = favourites.length ? [...jsDataBase, ...favourites] : jsDataBase;
            return favourites;
        })
        .catch(error => console.log(error));
};
// getItembyTitle("mack").then(data => console.dir(data));

export function getEnglishCategories() {
    return fetch(`https://callboard-backend.goit.global/call/categories`, {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};


export function getRussianCategories() {
    return fetch(`https://callboard-backend.goit.global/call/russian-categories`, {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};



export function getItemsInCategory(category) {
    return fetch(`https://callboard-backend.goit.global/call/specific/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => {
            jsDataBase = [...data];
            return data;
        })
        .catch(error => console.log(error));
};
