import {
  getRussianCategories,
  getEnglishCategories,
  getUsersInfoByToken,
  getUsersFavouritesByToken,
} from './backend-services';
import localStoradge from './local-storadge.js';
export const RussianCategoriesPromise = getRussianCategories();
export const EnglishCategoriesPromise = getEnglishCategories();

import {
  showAuthorizationBlock,
  showMyCabinetBlock,
} from '../components/header-section/js/service';
export let userFavourites = [];
export function isUserAutorized() {
  const accesToken = localStoradge.load('accessTokenOlx');
  if (accesToken) {
    return getUsersFavouritesByToken().then(favourites => {
      userFavourites = [...favourites];
      // console.log(userFavourites);
      return favourites;
    });
  }
  return Promise.reject(new Error('Ashibka'));
}

isUserAutorized()
  .then(data => {
    showMyCabinetBlock();
  })
  .catch(data => {
    showAuthorizationBlock();
  });
