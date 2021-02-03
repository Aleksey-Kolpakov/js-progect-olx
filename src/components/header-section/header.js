const refs = {
  burgerMenuButton: document.querySelector('.burger-menu-button'),
  mobileMenu: document.querySelector('.mobile-menu'),
  authenticationBlock: document.querySelector('.authentication-block'),
  myCabinetBlock: document.querySelector('.my-cabinet-block'),
  filtersContainer: document.querySelector('.header-filter-container'),
  filterClearBlock: document.querySelector('.filter-clear-block'),
  filterButton: document.querySelector('.header-filter-button'),
  mobileSearchButton: document.querySelector('.mobile-search-button'),
  mobileCloseButton: document.querySelector('.mobile-close-button'),
  headerInputContainer: document.querySelector('.header-input-container'),
  headerInput: document.querySelector('.header-input'),
  headerInputSearchIcon: document.querySelector('.header-input-search-icon'),
};

refs.burgerMenuButton.addEventListener('click', openMobileMenu);
refs.mobileSearchButton.addEventListener('click', toggleSearchInput);
refs.mobileCloseButton.addEventListener('click', closeMobileMenu);
refs.filterButton.addEventListener('click', toggleFiltersContainer);
refs.headerInputSearchIcon.addEventListener('click', () =>
  refs.headerInput.focus(),
);

function openMobileMenu() {
  refs.mobileMenu.classList.add('is-open');
  refs.authenticationBlock.classList.add('is-open'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  refs.myCabinetBlock.classList.add('is-open'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  refs.filterClearBlock.classList.add('is-open');
}

function closeMobileMenu() {
  refs.mobileMenu.classList.remove('is-open');
  refs.authenticationBlock.classList.remove('is-open'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  refs.myCabinetBlock.classList.remove('is-open'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  refs.filterClearBlock.classList.remove('is-open');
  refs.filtersContainer.classList.remove('is-open');
}

function toggleSearchInput() {
  refs.headerInputContainer.classList.toggle('is-open');
  refs.headerInput.focus();
}

function toggleFiltersContainer() {
  if (window.innerWidth < 768) {
    refs.filtersContainer.classList.toggle('is-open');
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    refs.filtersContainer.classList.toggle('tablet-is-hidden');
  }
}
