import refs from './refs';
import { clearFilterButtons } from './service';

refs.headerForm.addEventListener('submit', event => {
  event.preventDefault();
  refs.headerForm.classList.remove('is-open');
  clearFilterButtons();
});
