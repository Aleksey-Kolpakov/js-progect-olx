import refs from './refs';

refs.mobileSearchButton.addEventListener('click', toggleSearchInput);

function toggleSearchInput() {
  refs.headerForm.classList.toggle('is-open');
  refs.headerInput.focus();
}
