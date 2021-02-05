import {
  getRussianCategories,
  getEnglishCategories,
  getUsersInfoByToken,
} from './backend-services';
import localStoradge from './local-storadge.js';
export const RussianCategoriesPromise = getRussianCategories();
export const EnglishCategoriesPromise = getEnglishCategories();

import {
  showAuthorizationBlock,
  showMyCabinetBlock,
} from '../components/header-section/js/service';

export function isUserAutorized() {
  const accesToken = localStoradge.load('accessTokenOlx');
  if (accesToken) {
    return getUsersInfoByToken();
  }
  return Promise.reject(new Error('Ashibka'));
}

isUserAutorized()
  .then(data => {
    console.log('Рендер Юзера ');
    showMyCabinetBlock();
  })
  .catch(data => {
    console.log('Рендер логин/Рега');
    showAuthorizationBlock();
  });
