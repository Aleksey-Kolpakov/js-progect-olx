import refs from './refs';
import {
  RussianCategoriesPromise,
  EnglishCategoriesPromise,
} from '../../../utils/initial-load';
import { getItemsInCategory } from '../../../utils/backend-services';
import { closeMobileMenu } from './service';
import template from '../../../pages/main-page/templates/categories-markup.hbs';
import { itemOpener } from '../../../utils/item-opener';
refs.filterList.addEventListener('click', onFilterButtonClick);

function onFilterButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    refs.filterList.children.forEach(li => {
      li.children[0].classList.remove('is-active');
    });
    event.target.classList.add('is-active');

    RussianCategoriesPromise.then(array => {
      const index = array.indexOf(event.target.textContent.trim()); // trim() - убирает отступы справа и слева (текстовые узлы)

      EnglishCategoriesPromise.then(array => {
        // console.log(array[index]);
        const currentButton = array[index];
        history.pushState(null, null, currentButton.replace(/ /g, '-'));

        getItemsInCategory(array[index]).then(array => {
          // console.log(array);

          const mappedArray = array.map(item => ({
            ...item,
            imageUrls: item.imageUrls[0],
          }));

          const markup = template(mappedArray);

          refs.mainSection.innerHTML = '';
          refs.mainSection.insertAdjacentHTML('beforeend', markup);
          // Batyuschenko
          const sectionTittleRef = document.querySelector('.section-title');
          const activeSectionValueRef = document.querySelector(
            '.header-filter-item.is-active',
          );
          sectionTittleRef.textContent = activeSectionValueRef.textContent;

          itemOpener();
          if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            refs.filtersContainer.classList.remove('tablet-is-open');
          }

          if (window.innerWidth < 768) {
            closeMobileMenu();
          }
        });
      });
    });
  }
}
