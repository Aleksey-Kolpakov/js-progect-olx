import refs from './refs';
import {
  RussianCategoriesPromise,
  EnglishCategoriesPromise,
} from '../../../utils/initial-load';

function showAuthorizationBlock() {
  refs.myCabinetBlock.classList.add('is-hidden');
  refs.authorizationBlock.classList.remove('is-hidden');
}

function showMyCabinetBlock() {
  refs.authorizationBlock.classList.add('is-hidden');
  refs.myCabinetBlock.classList.remove('is-hidden');
}

function openMobileMenu() {
  refs.mobileBackdrop.classList.add('is-open');
  refs.mobileBackdrop.style = 'opacity: 1';
  refs.mobileMenu.classList.add('is-open');
  refs.authorizationBlock.classList.add('is-open');
  refs.myCabinetBlock.classList.add('is-open');
  refs.filterClearBlock.classList.add('is-open');
}

function closeMobileMenu() {
  refs.mobileBackdrop.classList.remove('is-open');
  refs.mobileBackdrop.style = 'opacity: 0';
  refs.mobileMenu.classList.remove('is-open');
  refs.authorizationBlock.classList.remove('is-open');
  refs.myCabinetBlock.classList.remove('is-open');
  refs.filterClearBlock.classList.remove('is-open');
  refs.filtersContainer.classList.remove('is-open');
}

function makeFilterButtonActive(englishCategory) {
  EnglishCategoriesPromise.then(array => {
    const index = array.indexOf(englishCategory);

    RussianCategoriesPromise.then(array => {
      const category = array[index];

      refs.filterList.children.forEach(li => {
        li.children[0].classList.remove('is-active');
        if (li.children[0].textContent.trim() === category) {
          li.children[0].classList.add('is-active');
        }
      });
    });
  });
}

export {
  openMobileMenu,
  closeMobileMenu,
  showAuthorizationBlock,
  showMyCabinetBlock,
  makeFilterButtonActive,
};
