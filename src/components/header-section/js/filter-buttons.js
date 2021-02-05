import refs from './refs';
import {
  RussianCategoriesPromise,
  EnglishCategoriesPromise,
} from '../../../utils/initial-load';
import { getItemsInCategory } from '../../../utils/backend-services';

refs.filterList.addEventListener('click', onFilterButtonClick);

function onFilterButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    RussianCategoriesPromise.then(array => {
      const index = array.indexOf(event.target.textContent.trim()); // trim() - убирает отступы справа и слева (текстовые узлы)

      EnglishCategoriesPromise.then(array => {
        console.log(array[index]);

        getItemsInCategory(array[index]).then(array => console.log(array));
      });
    });
  }
}
