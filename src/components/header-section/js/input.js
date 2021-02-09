import refs from './refs';

refs.headerForm.addEventListener('submit', event => {
  event.preventDefault();
  refs.headerForm.classList.remove('is-open');
});
