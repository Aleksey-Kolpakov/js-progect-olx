import {
  getEnglishCategories,
  getRussianCategories,
  createItemFetch,
  registerUserApi,
  loginFetch,
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
  });
}

export function sendItemOnServer() {
  const form = document.querySelector('.form');

  //------------------------------------------- Список доступных категорий (должно совпадать с бэкэндом)

  const listOfCategory = {
    Недвижимость: 'property',
    Транспорт: 'transport',
    Работа: 'work',
    Электроника: 'electronics',
    'Бизнес и услуги': 'business and services',
    'Отдых и спорт': 'recreation and sport',
    'Отдам бесплатно': 'free',
    Обмен: 'trade',
  };
  //-------------------------------------Переводчик категорий для отправки на бэкэнд

  function translator(rus, list) {
    if (listOfCategory[rus] === undefined) {
      console.warn(
        'Отсутствует перевод. Отредактируйте список категорий - listOfCategory (form-create)',
      );
    }
    return listOfCategory[rus];
  }

  //------------------------------------------- ф-я сбора всех полей

  function formDataCollect(event) {
    event.preventDefault();
    const downloadInput = document.querySelector('.download__input');
    const formData = new FormData();

    const foData = new FormData(event.target);
    foData.forEach((value, key) => {
      if (key !== 'file') {
        formData.set(key, value);
        if (listOfCategory.hasOwnProperty(value)) {
          formData.set('category', listOfCategory[value]);
        }
      }
    });
    downloadInput.files.forEach(file => {
      formData.append('file', file);
    });

    // var object = {};
    // formData.forEach(function (value, key) {
    //   object[key] = value;
    // });
    // var json = JSON.stringify(object);
    // console.log(json);

    createItemFetch(formData);
  }

  form.addEventListener('submit', formDataCollect);

  //-------------------функция для установки цену в ноль на двух категориях
  const categorrySelectRef = document.querySelector('#form-category');
  categorrySelectRef.addEventListener('change', chancePriceInput);

  function chancePriceInput() {
    const inputPriceRef = document.querySelector('#input-number');
    console.log(categorrySelectRef.value);
    if (
      categorrySelectRef.value === 'Работа' ||
      categorrySelectRef.value === 'Отдам бесплатно'
    ) {
      inputPriceRef.value = 0;
      inputPriceRef.setAttribute('readonly', '');
    }
    if (
      categorrySelectRef.value !== 'Работа' &&
      categorrySelectRef.value !== 'Отдам бесплатно'
    ) {
      console.log('meh');
      inputPriceRef.value = '';
      inputPriceRef.removeAttribute('readonly');
    }
    // console.dir(categorrySelectRef)
  }
}
