// import { loginFetch } from '../../utils/backend-services';
// import EdikMarkUpHbs from '../../pages/main-page/templates/categories-markup.hbs';
import EdikMarkUpHbs from '../user-items-pages/templates/categories-markup.hbs';
import favouritesHbs from '../user-items-pages/templates/favourites.hbs';
import ownItemsHbs from '../user-items-pages/templates/ownItems.hbs';
import emptyFavHbs from '../user-items-pages/templates/emptyFav.hbs';
import emptyOwnHbs from '../user-items-pages/templates/emptyOwn.hbs';
import {
  getUsersFavouritesByToken,
  getUsersOwnItems,
} from '../../utils/backend-services';
import Slider from '../../components/Slider';
import { itemOpener, openChangeOwnItemModal } from '../../utils/item-opener';
import { colorInOrangeHeartsOfFavourites } from '../../utils/favourites-rest-logic';//Єгор додав
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
function onClickBtnMyAccount(event) {
  // event.preventDefault();
  const promiseOwnResult = getUsersOwnItems();
  const promiseFavourResult = getUsersFavouritesByToken();

  Promise.all([promiseFavourResult, promiseOwnResult]).then((promisesResultsArray) => {
    mainRef.innerHTML = '';
    const [promiseFavourResult, promiseOwnResult] = promisesResultsArray;

    if (promiseFavourResult.length === 0) {
      noContentMarkup(emptyFavHbs);
    }
    if (promiseFavourResult.length > 0) {
      updateMarkupWithSlider(promiseFavourResult, favouritesHbs);
      const seeAllFavBtnRef = document.querySelector('.favourites');
      console.log(seeAllFavBtnRef);
      seeAllFavBtnRef.addEventListener('click', onClickBtnSeeAllFavourites(promiseFavourResult));
      itemOpener();
    }

    if (promiseOwnResult.length === 0) {
      noContentMarkup(emptyOwnHbs);
    }
    if (promiseOwnResult.length > 0) {
      updateMarkupWithSlider(promiseOwnResult, ownItemsHbs);
      const seeAllOwnBtnRef = document.querySelector('.ownItems');
      seeAllOwnBtnRef.addEventListener('click', onClickBtnSeeAllOwn(promiseOwnResult));
      itemOpener('[data-items="own"]', openChangeOwnItemModal);
    }

    const listBlockCollection = document.querySelectorAll('.card-list');
    listBlockCollection.forEach(
      () =>
        new Slider({
          listUlSelector: '.card-list',
          buttons: true,
          parentPadding: '5px 2px',
          dotsVerticalPosition: -20, //положення кнопок-точок по вертикалі відносно нижнього краю блоку слайдера
          dotButtonColor: '#CDCDCD', //колір неактивних кнопок
          dotButtonActiveColor: '#FF6B09', //колір активної
        }),
    );
    colorInOrangeHeartsOfFavourites(true);//Єгор додав
    history.pushState(null, null, 'cabinet'); //добавил изменение ссылки Вансовский
  });
}

function updateMarkupWithSlider(elementsArray, markUpHbs) {
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

export function noContentMarkup(markUpHbs, position='beforeend') {
  const markup = markUpHbs();
  mainRef.insertAdjacentHTML(position, markup);
}

function updateMarkupAll(elementsArray) {
  const checkedElementsArray = elementsArray.map(element => ({
    ...element,
    imageUrls: element.imageUrls[0],
  }));

  const markup = EdikMarkUpHbs(checkedElementsArray);
  mainRef.insertAdjacentHTML('beforeend', markup);
}

// const goBack = () => {

// }

const onClickBtnSeeAllOwn = (promiseResultArray) => (event) => {
  event.preventDefault();
    mainRef.textContent = '';
  updateMarkupAll(promiseResultArray);
  itemOpener('[data-items="own"]', openChangeOwnItemModal);
  history.pushState(null, null, '/all-my-own'); //добавил изменение ссылки Вансовский
  const btnGoBack = document.querySelector('.js-btn-back');
    btnGoBack.addEventListener('click', onClickBtnMyAccount);
};

const onClickBtnSeeAllFavourites = (promiseResultArray) => (event) => {
    event.preventDefault();
    mainRef.textContent = '';
    updateMarkupAll(promiseResultArray);
    const ulContainerRef = document.querySelector('[data-items="own"]');
    ulContainerRef.dataset.items = '';
    itemOpener();
    history.pushState(null, null, '/all-my-favourites'); //добавил изменение ссылки Вансовский
    const btnGoBack = document.querySelector('.js-btn-back');
    btnGoBack.addEventListener('click', onClickBtnMyAccount);
};
