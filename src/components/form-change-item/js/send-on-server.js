import { changeItemFetch } from '../../../utils/backend-services.js';

export function ChangeItemOnServer() {
  const form = document.querySelector('.form');

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

    changeItemFetch(formData);
  }

  form.addEventListener('submit', formDataCollect);

  //-------------------функция для установки цену в ноль на двух категориях
  const categorrySelectRef = document.querySelector('#form-category');
  categorrySelectRef.addEventListener('change', chancePriceInput);

  function chancePriceInput() {
    const inputPriceRef = document.querySelector('#input-number');
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
      inputPriceRef.value = '';
      inputPriceRef.removeAttribute('readonly');
    }
  }
}
