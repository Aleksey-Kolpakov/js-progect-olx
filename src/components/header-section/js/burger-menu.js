import refs from './refs';

refs.burgerMenuButton.addEventListener('click', openMobileMenu);
refs.mobileCloseButton.addEventListener('click', closeMobileMenu);

function openMobileMenu() {
  refs.mobileMenu.classList.add('is-open');
  refs.authenticationBlock.classList.add('is-open');
  refs.myCabinetBlock.classList.add('is-open');
  refs.filterClearBlock.classList.add('is-open');
}

function closeMobileMenu() {
  refs.mobileMenu.classList.remove('is-open');
  refs.authenticationBlock.classList.remove('is-open');
  refs.myCabinetBlock.classList.remove('is-open');
  refs.filterClearBlock.classList.remove('is-open');
  refs.filtersContainer.classList.remove('is-open');
}
