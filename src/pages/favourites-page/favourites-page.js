import { loginFetch } from '../../utils/backend-services';
import EdikMarkUp from '../../pages/main-page/templates/categories-markup.hbs';
import favouritesHbs from '../favourites-page/templates/favourites.hbs';
import ownItemsHbs from '../favourites-page/templates/ownItems.hbs';
import {
  getUsersFavouritesByToken,
  getUsersOwnItems,
} from '../../utils/backend-services';
import Slider from '../../components/Slider';

// Дані тестового юзера:
const registerData = {
  email: 'Ruslantester@test.com',
  password: 'qwerty123',
};

// functions
const startTestinLogin = async function () {
  const loginData = await loginFetch({
    email: 'Ruslantester@test.com',
    password: 'qwerty123',
  });
};

function updateMarkupFavouritesAll(elementsArray) {
  const checkedElementsArray = elementsArray.map(element => ({
    ...element,
    imageUrls: element.imageUrls[0],
  }));

  const markup = EdikMarkUp(checkedElementsArray);
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

function onMyAccountClick() {
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
      onSeeAllClickY(fetchPromiseFavourites),
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
      onSeeAllClickY(fetchPromiseFavourites),
    );
  });

  Promise.all([favProm, ownProm]).then(() => {
    const listBlockCollection = document.querySelectorAll('.card-list');
    listBlockCollection.forEach(
      list => new Slider({ listUlSelector: list, buttons: true }),
    );
  });
}

const onSeeAllClickY = promise => e => {
  e.preventDefault();
  promise.then(data => {
    mainRef.innerHTML = '';
    updateMarkupFavouritesAll(data);
  });
};

// refs
const mainRef = document.querySelector('main');
const myAccountBtnRef = document.querySelector(
  '.my-cabinet-button.header-button',
);

// listeners
myAccountBtnRef.addEventListener('click', onMyAccountClick);

// startTestinLogin();
