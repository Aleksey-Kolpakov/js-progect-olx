import axios from 'axios';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDE4Yzg3NjlkZmVjZTUxZTM2Njc1NDYiLCJzaWQiOiI2MDE5NTQ2OTlkZmVjZTUxZTM2Njc1ODgiLCJpYXQiOjE2MTIyNzI3NDUsImV4cCI6MTYxMjI3NjM0NX0.yhVpCBYIsIDLuILzwWxpsrhxIstAMJWp7qq-ThIOt3c';
let pageNumber = 1;
let id = "6018c8769dfece51e3667546";
const getHeroAds = function () {
    axios.get('https://callboard-backend.goit.global/call/ads').
        then(({ data }) => console.log(data));
};
const registerData = {
    email: "testwawwerdfcxc91@test.com",
    password: "qwerty123",
};
const registrerUserApi = function (registerData) {

    return axios.post('https://callboard-backend.goit.global/auth/register', registerData).
        then(({ data }) => data)
        .catch(error => console.log(error));
}


const registerFetch = function (registerData) {
    return fetch(`https://callboard-backend.goit.global/auth/register`, {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

const loginFetch = function (registerData) {
    return fetch(`https://callboard-backend.goit.global/auth/login`, {
        method: 'POST',
        body: JSON.stringify(registerData),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

// loginFetch(registerData).then(data => {
//     console.log(data);
//     console.log(data.accessToken)
// });

const logoutFetch = function () {
    return fetch(`https://callboard-backend.goit.global/auth/logout`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

const getUsersInfoByToken = function () {
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

const getUsersInfoByID = function (id) {
    return fetch(`https://callboard-backend.goit.global/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',



        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

const getAllCategoriesWithItemsByPages = function (pageNumber) {
    return fetch(`https://callboard-backend.goit.global/call?page=${pageNumber}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

const getUsersFavouritesByToken = function () {
    return fetch(`https://callboard-backend.goit.global/call/favourites`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(({ favourites }) => favourites)
        .catch(error => console.log(error));
}
// не тестил, нужны имуджи
function createItemFetch(item) {
    return fetch(`https://callboard-backend.goit.global/call`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

function addItemToFavourite(itemId) {
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

function changeItemFetch(id, newItem) {
    return fetch(`https://callboard-backend.goit.global/call/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newItem),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',

        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

function deleteItemFetch(id) {
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

function getUsersOwnItems() {
    return fetch(`https://callboard-backend.goit.global/call/own`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};


function getItembyTitle(searchQuerry) {
    return fetch(`https://callboard-backend.goit.global/call/find?search=${searchQuerry}`, {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};


function getEnglishCategories() {
    return fetch(`https://callboard-backend.goit.global/call/categories`, {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};
getEnglishCategories().then(data => console.log(data));

function getRussianCategories() {
    return fetch(`https://callboard-backend.goit.global/call/russian-categories`, {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};



function getItemsInCategory(category) {
    return fetch(`https://callboard-backend.goit.global/call/specific/${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
};