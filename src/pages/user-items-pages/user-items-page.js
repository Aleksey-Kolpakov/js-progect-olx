import { loginFetch } from '../../utils/backend-services';
import EdikMarkUpHbs from '../../pages/main-page/templates/categories-markup.hbs';
import favouritesHbs from '../user-items-pages/templates/favourites.hbs';
import ownItemsHbs from '../user-items-pages/templates/ownItems.hbs';
import emptyFavHbs from '../user-items-pages/templates/emptyFav.hbs';
import emptyOwnHbs from '../user-items-pages/templates/emptyOwn.hbs';
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
function noContentMarkup(markUpHbs) {
  const markup = markUpHbs();
  mainRef.insertAdjacentHTML('beforeend', markup);
}

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
      noContentMarkup(emptyFavHbs);
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
      noContentMarkup(emptyOwnHbs);
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
      list =>
        new Slider({
          listUlSelector: '.card-list',
          buttons: true,
          parentPadding: '5px 2px',
          dotsVerticalPosition: -20, //положення кнопок-точок по вертикалі відносно нижнього краю блоку слайдера
          dotButtonColor: '#CDCDCD', //колір неактивних кнопок
          dotButtonActiveColor: '#FF6B09', //колір активної
        }),
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
