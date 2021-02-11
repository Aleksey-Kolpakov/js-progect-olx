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
import { makeNoticeError, makeNoticeSuccess } from '../../utils/pnotify.js';
import ownItems from './own-items-item.hbs';
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
    function closeModal() {
      const backDropRef = document.querySelector('.back-drop');
      const hiddenModal = document.querySelector('body');
      const modalRef = document.querySelector('.modal');
      backDropRef.classList.remove('is-open');
      hiddenModal.classList.remove('hiddenModalStyle');
      modalRef.innerHTML = '';
    }
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

    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    // console.log(json);

    createItemFetch(formData)
      .then(resp => {
        if (resp.ok === true) {
          makeNoticeSuccess('Товар успешно создан');
          closeModal();
        } else {
          makeNoticeError(
            'Товар не был создан. Пожалуйста проверьте поля заполнения',
          );
        }

        return resp.json();
      })
      .then(obj => {
        if (document.querySelector('.section-own-items')) {
          const ownItemsSectionRef = document.querySelector(
            '.section-own-items',
          );
          const ownItemsListRef = ownItemsSectionRef.querySelector(
            '.slider-wrap',
          );
          const listItemMarkUp = ownItems(obj);
          ownItemsListRef.insertAdjacentHTML('beforeend', listItemMarkUp);
        }
      });
  }

  form.addEventListener('submit', formDataCollect);

  //-------------------функция для установки цену в ноль на двух категориях
  const categorrySelectRef = document.querySelector('#form-category');
  categorrySelectRef.addEventListener('change', chancePriceInput);

  function chancePriceInput() {
    const inputPriceRef = document.querySelector('#input-number');
    if (
      categorrySelectRef.value === 'Работа' ||
      categorrySelectRef.value === 'Отдам бесплатно' ||
      categorrySelectRef.value === 'Обмен'
    ) {
      inputPriceRef.value = 0;
      inputPriceRef.setAttribute('readonly', '');
    }
    if (
      categorrySelectRef.value !== 'Работа' &&
      categorrySelectRef.value !== 'Отдам бесплатно' &&
      categorrySelectRef.value !== 'Обмен'
    ) {
      inputPriceRef.value = '';
      inputPriceRef.removeAttribute('readonly');
    }
    // console.dir(categorrySelectRef)
  }
}
