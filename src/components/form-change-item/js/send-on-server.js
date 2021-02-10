import {
  changeItemFetch,
  deleteItemFetch,
} from '../../../utils/backend-services.js';

export function ChangeItemOnServer(id) {
  const form = document.querySelector('.form');

  const buttonDeleteRef = document.querySelector('.button-delete');
  buttonDeleteRef.addEventListener('click', deleteItem);

  function deleteItem(event) {
    event.preventDefault();
    const newID = Number(id);

    deleteItemFetch(id).then(obj => {
      // console.log(typeof id);
      const deletedItemRef = document.querySelector(`[data-id="${id}"]`);
      deletedItemRef.parentElement.remove();
    });
  }

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
    // console.log(event.target);
    console.log('test');
    // const formInputs = document.querySelectorAll('.form__input');
    // formInputs.forEach(input => {
    //   console.log(input.value);
    // });

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

    // foData.forEach((value, key) => {
    //   if (key !== 'file') {
    //     formData.set(key, value);
    //     if (listOfCategory.hasOwnProperty(value)) {
    //       formData.set('category', listOfCategory[value]);
    //     }
    //   }
    // });
    downloadInput.files.forEach(file => {
      formData.append('file', file);
    });

    var object = {};
    foData.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    // console.log(json);

    changeItemFetch(id, formData);
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
