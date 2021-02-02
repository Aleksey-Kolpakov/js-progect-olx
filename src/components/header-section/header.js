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

  inputContainer: document.querySelector('.input-container'),
  input: document.querySelector('.header-input'),
  loupeIcon: document.querySelector('.loupe-icon'),
};

refs.burgerMenuButton.addEventListener('click', openMobileMenu);
refs.mobileSearchButton.addEventListener('click', toggleSearchInput);
refs.mobileCloseButton.addEventListener('click', closeMobileMenu);
refs.filterButton.addEventListener('click', toggleFiltersContainer);
refs.loupeIcon.addEventListener('click', () => refs.input.focus());

function openMobileMenu() {
  refs.mobileMenu.classList.remove('is-hidden');
  refs.authenticationBlock.classList.remove('is-hidden'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  // refs.myCabinetBlock.classList.remove('is-hidden'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  refs.filterClearBlock.classList.remove('is-hidden');
}

function closeMobileMenu() {
  refs.mobileMenu.classList.add('is-hidden');
  refs.authenticationBlock.classList.add('is-hidden'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  // refs.myCabinetBlock.classList.add('is-hidden'); // одна из двух остается в зависимости от того авторизирован ли пользователь
  refs.filtersContainer.classList.add('is-hidden');
  refs.filterClearBlock.classList.add('is-hidden');
}

function toggleSearchInput() {
  refs.inputContainer.classList.toggle('is-hidden');
}

function toggleFiltersContainer() {
  refs.filtersContainer.classList.toggle('is-hidden');
}
