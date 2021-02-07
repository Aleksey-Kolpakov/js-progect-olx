import { loginFetch } from '../../utils/backend-services';
import EdikMarkUpHbs from '../../pages/main-page/templates/categories-markup.hbs';
import favouritesHbs from '../favourites-page/templates/favourites.hbs';
import ownItemsHbs from '../favourites-page/templates/ownItems.hbs';
import {
  getUsersFavouritesByToken,
  getUsersOwnItems,
} from '../../utils/backend-services';
import Slider from '../../components/Slider';
// ===============================================================================//
// refs
const mainRef = document.querySelector('main');
const myAccountBtnRef = document.querySelector(
  '.my-cabinet-button.header-button',
);

// listeners
myAccountBtnRef.addEventListener('click', onClickBtnMyAccount);
//===============================================================================//

// functions
function updateMarkupFavouritesAll(elementsArray) {
  const checkedElementsArray = elementsArray.map(element => ({
    ...element,
    imageUrls: element.imageUrls[0],
  }));

  const markup = EdikMarkUpHbs(checkedElementsArray);
  mainRef.insertAdjacentHTML('beforeend', markup);
}

function updateMarkupFavouritesWithSlider(elementsArray, markUpHbs) {
  const checkedElementsArray = elementsArray.reduce(
    (accArray, element, indx) => {
      if (indx < 15) {
        accArray.push({ ...element, imageUrls: element.imageUrls[0] });
      }
      return accArray;
    },
    [],
  );
  const markup = markUpHbs(checkedElementsArray);
  mainRef.insertAdjacentHTML('beforeend', markup);
}

function onClickBtnMyAccount() {
  // const fetchPromiseOwnItems = getUsersOwnItems();
  const fetchPromiseFavourites = getUsersFavouritesByToken();
  mainRef.innerHTML = '';

  const favProm = fetchPromiseFavourites.then(data => {
    if (data.length === 0) {
      return;
    }
    updateMarkupFavouritesWithSlider(data, favouritesHbs);
    const seeAllBtnRef = document.querySelector('.favourites');
    seeAllBtnRef.addEventListener(
      'click',
      onClickBtnSeeAll(fetchPromiseFavourites),
    );
  });

  const ownProm = fetchPromiseFavourites.then(data => {
    if (data.length === 0) {
      return;
    }
    updateMarkupFavouritesWithSlider(data, ownItemsHbs);
    const seeAllBtnRef = document.querySelector('.ownItems');
    seeAllBtnRef.addEventListener(
      'click',
      onClickBtnSeeAll(fetchPromiseFavourites),
    );
  });

  Promise.all([favProm, ownProm]).then(() => {
    const listBlockCollection = document.querySelectorAll('.card-list');
    listBlockCollection.forEach(
      list => new Slider({ listUlSelector: list, buttons: true }),
    );
  });
}

const onClickBtnSeeAll = promise => e => {
  e.preventDefault();
  promise.then(data => {
    mainRef.innerHTML = '';
    updateMarkupFavouritesAll(data);
  });
};

// Дані тестового юзера:
const registerData = {
  email: 'Ruslantester@test.com',
  password: 'qwerty123',
};

const startTestinLogin = async function () {
  const loginData = await loginFetch({
    email: 'Ruslantester@test.com',
    password: 'qwerty123',
  });
};

startTestinLogin();
