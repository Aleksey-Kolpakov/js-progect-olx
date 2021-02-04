import { getItembyTitle } from '../../../utils/backend-services.js';
import template from './search.hbs';
import './search.scss';
import '../../../main.scss';

const mainRef = document.querySelector('.js-main');
const wrapRef = document.querySelector('.js-search-container');
const searchRef = document.querySelector('.js-search');
const input = document.querySelector('.js-input-search');

searchRef.addEventListener('submit', findGoods);

function findGoods(event) {
  event.preventDefault();
  getItembyTitle(input.value).then(onSearchMarkup);
}

function onSearchMarkup(data) {
  const markup = template(data);

  if (!data.length) {
    alert('No matches found');
    return;
  }
  wrapRef.classList.remove('search-is-hidden');
  wrapRef.classList.add('search-is-shown');
  wrapRef.innerHTML = '';
  mainRef.innerHTML = '';
  wrapRef.insertAdjacentHTML('beforeend', markup);
  input.value = '';
}
