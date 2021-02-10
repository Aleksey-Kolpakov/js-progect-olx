import { getItembyTitle } from '../../../utils/backend-services.js';
import template from './search.hbs';
import './search.scss';
import '../../../main.scss';
import {itemOpener} from '../../../utils/item-opener.js'
const mainRef = document.querySelector('.js-main');
const wrapRef = document.querySelector('.search-is-hidden');
const searchRef = document.querySelector('.js-search');
const input = document.querySelector('.js-input-search');

searchRef.addEventListener('submit', findGoods);

function findGoods(event) {
  event.preventDefault();
  getItembyTitle(input.value)
    .then(data =>
      data.map(item => ({
        ...item,
        imageUrls: item.imageUrls[0],
      })),
    )
    .then(onSearchMarkup);
    history.pushState(null, null,'search');
}

function onSearchMarkup(data) {
  const markup = template(data);

  if (!data.length) {
    alert('No matches found');
    return;
  }

  wrapRef.classList.remove('search-is-hidden');
  mainRef.innerHTML = markup;
  input.value = '';
  itemOpener();
}
