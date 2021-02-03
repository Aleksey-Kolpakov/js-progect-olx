import refs from './refs';

refs.filterButton.addEventListener('click', toggleFiltersContainer);

function toggleFiltersContainer() {
  if (window.innerWidth < 768) {
    refs.filtersContainer.classList.toggle('is-open');
  }
  if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    refs.filtersContainer.classList.toggle('tablet-is-hidden');
  }
}
