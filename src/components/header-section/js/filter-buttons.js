import refs from './refs';
import {
  getRussianCategories,
  getEnglishCategories,
  getItemsInCategory,
} from '../../../utils/backend-services';

refs.filterList.addEventListener('click', onFilterButtonClick);

function onFilterButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    getRussianCategories().then(array => {
      const index = array.indexOf(event.target.textContent);

      getEnglishCategories().then(array => {
        console.log(array[index]);

        getItemsInCategory(array[index]).then(array => console.log(array));
      });
    });
  }
}
