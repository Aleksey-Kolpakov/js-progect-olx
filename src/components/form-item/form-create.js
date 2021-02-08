import {
  getEnglishCategories,
  getRussianCategories,
  createItemFetch,
  registerUserApi,
  loginFetch,
  getUsersOwnItems,
  getItembyTitle,
} from '../../utils/backend-services.js';
import templateCategory from './category.hbs';
import { RussianCategoriesPromise } from '../../utils/initial-load.js';

//------------------------------------------- ф-я загрузки категорий с бэкэнда в input
export function addRusCategory() {
  const categoryRef = document.querySelector('#form-category');

  RussianCategoriesPromise.then(function (data) {
    const template = templateCategory(data);
    categoryRef.insertAdjacentHTML('beforeend', template);
    return;
  })
}

export function sendItemOnServer() {
  const form = document.querySelector('.form');

  //------------------------------------------- Список доступных категорий (должно совпадать с бэкэндом)
  
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
  //-------------------------------------Переводчик категорий для отправки на бэкэнд
  
  function translator(rus, list) {
    if (listOfCategory[rus] === undefined) {
      console.warn('Отсутствует перевод. Отредактируйте список категорий - listOfCategory (form-create)')
    }
    return listOfCategory[rus];
  }
  
  //------------------------------------------- ф-я сбора всех полей
  
  function formDataCollect(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitData = {};

    formData.forEach((value, key) => { submitData[key] = value;});
    submitData.category = translator(submitData.category, listOfCategory);
    submitData.price = Number.parseInt(submitData.price);

    /*const allImages = document.querySelectorAll('.download__img');
    const allImagesSrc = Array.from(allImages).map(img => {
      if (img.src.length > 10) {
        return img.src.toString(2);
      }
    });

    submitData.file = allImagesSrc;*/


    console.log(submitData)

    createItemFetch(submitData);

    getItembyTitle('test2').then(data=>console.log(data));

    return submitData;
  }
  
  form.addEventListener("submit", formDataCollect);
}


const item = {
  title: "oleg",
  description: "хорошая",
  category: "property",
  price: 200,
  phone: "+380000400000",
  imageUrls: ["https://storage.googleapis.com/kidslikev2_bucket/053663dc-ec4e-497d-97ee-d2e9eb600573.jpg"],
}
 
createItemFetch(item).then(data => console.log(data))

getItembyTitle('oleg').then(data=>console.log(data));

getUsersOwnItems("oleg").then(data=>console.log(data))