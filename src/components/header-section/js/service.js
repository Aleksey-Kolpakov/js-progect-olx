import refs from './refs';

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
  refs.mobileMenu.classList.add('is-open');
  refs.authorizationBlock.classList.add('is-open');
  refs.myCabinetBlock.classList.add('is-open');
  refs.filterClearBlock.classList.add('is-open');
}

function closeMobileMenu() {
  refs.mobileBackdrop.classList.remove('is-open');
  refs.mobileMenu.classList.remove('is-open');
  refs.authorizationBlock.classList.remove('is-open');
  refs.myCabinetBlock.classList.remove('is-open');
  refs.filterClearBlock.classList.remove('is-open');
  refs.filtersContainer.classList.remove('is-open');
}

export {
  openMobileMenu,
  closeMobileMenu,
  showAuthorizationBlock,
  showMyCabinetBlock,
};
