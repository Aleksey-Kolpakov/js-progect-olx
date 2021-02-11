import axios from 'axios';
import localStoradge from './local-storadge.js';
export let jsDataBase = [];
let pageNumber = 1;
let id = '6018c8769dfece51e3667546';
export const getHeroAds = function () {
  return axios
    .get('https://callboard-backend.goit.global/call/ads')
    .then(({ data }) => data)
    .catch(error => error);
};
const registerData = {
  email: 'testwwerdfcwq@test.com',
  password: 'qwerty123',
};
export const registerUserApi = function (registerData) {
  return axios
    .post('https://callboard-backend.goit.global/auth/register', registerData)
    .then(({ data }) => data);
};

export const loginFetch = function (registerData) {
  return axios
    .post('https://callboard-backend.goit.global/auth/login', registerData)
    .then(({ data }) => {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
      localStoradge.save('accessTokenOlx', data.accessToken);
      return data;
    });
};
// loginFetch(registerData).then(data => {
//     console.log(data);
//     console.log(data.accessToken);
// });

export const logoutFetch = function () {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .post(`https://callboard-backend.goit.global/auth/logout`)
    .then(({ data }) => {
      localStorage.clear();
      return data;
    });
};

export const getUsersInfoByToken = function () {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .get(`https://callboard-backend.goit.global/user`)
    .then(({ data }) => data);
};

export const getUsersInfoByID = function (id) {
  return axios
    .get(`https://callboard-backend.goit.global/user/${id}`)
    .then(({ data }) => data)
    .catch(error => console.log(error));
};

export const getAllCategoriesWithItemsByPages = function (pageNumber) {
  return axios
    .get(`https://callboard-backend.goit.global/call?page=${pageNumber}`)
    .then(({ data }) => {
      const dataArr = Object.values(data);
      dataArr.forEach(element => {
        jsDataBase = [...jsDataBase, ...element];
      });
      return data;
    })
    .catch(error => console.log(error));
};

export const getUsersFavouritesByToken = function () {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .get(`https://callboard-backend.goit.global/call/favourites`)
    .then(({ data }) => data)
    .then(({ favourites }) => {
      jsDataBase = favourites.length
        ? [...jsDataBase, ...favourites]
        : jsDataBase;
      return favourites;
    });
};

export function createItemFetch(item) {
  const accessToken = localStoradge.load('accessTokenOlx');
  return (
    fetch(`https://callboard-backend.goit.global/call`, {
      method: 'POST',
      body: item,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // 'Content-Type': 'multipart/form-data; charset=UTF-8',
      },
    })
      // .then(response => response.json())
      .catch(error => console.log(error))
  );
}

export function addItemToFavourite(itemId) {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .post(`https://callboard-backend.goit.global/call/favourite/${itemId}`)
    .then(({ data }) => data);
}

export function deleteItemFromFavourite(itemId) {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .delete(`https://callboard-backend.goit.global/call/favourite/${itemId}`)
    .then(({ data }) => data);
}

export function changeItemFetch(id, newItem) {
  const accessToken = localStoradge.load('accessTokenOlx');
  return (
    fetch(`https://callboard-backend.goit.global/call/${id}`, {
      method: 'PATCH',
      body: newItem,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // 'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      // .then(response => response.json())
      .catch(error => console.log(error))
  );
}

export function deleteItemFetch(id) {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .delete(`https://callboard-backend.goit.global/call/${id}`)
    .then(({ data }) => data);
}

export function getUsersOwnItems() {
  const accessToken = localStoradge.load('accessTokenOlx');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return axios
    .get(`https://callboard-backend.goit.global/call/own`)
    .then(({ data }) => data)
    .then(({ favourites }) => {
      jsDataBase = favourites.length
        ? [...jsDataBase, ...favourites]
        : jsDataBase;
      return favourites;
    })
    .catch(error => console.log(error));
}

export function getItembyTitle(searchQuerry) {
  return axios
    .get(
      `https://callboard-backend.goit.global/call/find?search=${searchQuerry}`,
    )
    .then(({ data }) => {
      jsDataBase = [...jsDataBase, ...data];
      return data;
    })
    .catch(error => console.log(error));
}

export function getEnglishCategories() {
  return axios
    .get(`https://callboard-backend.goit.global/call/categories`)
    .then(({ data }) => data)
    .catch(error => console.log(error));
}

export function getRussianCategories() {
  return axios
    .get(`https://callboard-backend.goit.global/call/russian-categories`)
    .then(({ data }) => data)
    .catch(error => console.log(error));
}

export function getItemsInCategory(category) {
  return axios
    .get(`https://callboard-backend.goit.global/call/specific/${category}`)
    .then(({ data }) => {
      jsDataBase = [...data];
      return data;
    })
    .catch(error => console.log(error));
}
