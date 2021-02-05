console.log('hello');

import { getEnglishCategories, getRussianCategories,  createItemFetch} from '../../utils/backend-services.js';
import templateCategory from './category.hbs';

const categoryRef = document.querySelector('#form-category');
const form = document.querySelector('.form');

//------------------------------------------- ф-я загрузки категорий в input

/*getEnglishCategories().then(function (data) {
  return console.log(data);
});*/

getRussianCategories().then(function (data) {
    const template = templateCategory(data);
    categoryRef.insertAdjacentHTML('beforeend', template);
    return console.log(data);
});

//------------------------------------------- ф-я сбора всех полей

//let submitData = {};

function formDataCollect(event) {
    console.dir(event.target);
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitData = {};
    formData.forEach((value, key) => { submitData[key] = value;});
    console.log(submitData);
    console.log(translator(submitData.category, listOfCategory));
    submitData.category = translator(submitData.category, listOfCategory);
    console.log(submitData);
    //createItemFetch(submitData);
    return submitData;
}


form.addEventListener("submit", formDataCollect);

//-------------------------------------Переводчик категорий
const listOfCategory = {
  "Недвижимость": "property",
  "Транспорт": "transport",
  "Работа": "work",
  "Электроника": "electronics",
  "Бизнес и услуги": "business and services",
  "Отдых и спорт": "recreation and sport",
  "Отдам бесплатно": "free",
  "Обмен": "trade",
}

function translator(rus, list) {
  if (listOfCategory[rus] === undefined) {
  console.warn('Отсутствует перевод. Отредактируйте список категорий - listOfCategory')
  }

  return listOfCategory[rus];
}

//console.log(translator('Транспорт', listOfCategory));

