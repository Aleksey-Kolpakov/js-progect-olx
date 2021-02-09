import obj from './objectForTest';
import { modalBackDrop } from '../modal-window/modal-logic.js';
import formChangeItem from './form-change-item';
import templateCategory from '../form-item/category.hbs';
import { RussianCategoriesPromise } from '../../utils/initial-load.js';
import { changeItemFetch } from '../../utils/backend-services.js';

export function MarkUpFormChange() {
  modalBackDrop(formChangeItem);

  const categoryRef = document.querySelector('#form-category');

  RussianCategoriesPromise.then(function (data) {
    const template = templateCategory(data);
    categoryRef.insertAdjacentHTML('beforeend', template);
    return;
  });
  ChangeItemOnServer();
}

export function DynamicMarkUp(obj) {
  const formImgList = document.querySelector('.form__input-download');
  let allListItems = document.querySelectorAll('.download__item');
  let firstItem = document.querySelector('.start-list-item');

  if (typeof obj != 'undefined') {
    const values = [
      obj.title,
      obj.description,
      obj.category,
      obj.price,
      obj.phone,
    ];
    const formInputs = document.querySelectorAll('.form__input');

    const formRef = document.querySelector('.form');

    formInputs.forEach((form, i) => {
      form.value = values[i];
    });

    obj.imageUrls.forEach((img, i) => {
      formImgList.insertAdjacentHTML(
        'afterbegin',
        `<li  class="item download__item img${i}"> 
        <img src="${img}" data-position="${i}"  class="download__img" width="78" height="50" >
        <button data-index="${i}" type="button" class="close-image-button">
        <svg class='item-close-button' >
        <use href="./images/sprite/sprite.svg#icon-close">
        </use>
        </svg>
        </button>
        </li >`,
      );
    });
  }

  formImgList.insertAdjacentHTML(
    'beforeend', ///--->>
    '<li class="item download__item start-list-item"><label class= "download__label" > <img class="download__img" width="78" height="50" ><input class="download__input" type="file" style="display: none" multiple /></label></li > ',
  );

  formImgList.addEventListener('change', insertImages);

  function insertImages(e) {
    if (e.target.nodeName === 'INPUT') {
      const allImg = Object.values(e.target.files);
      let allListItems = document.querySelectorAll('.download__item');
      firstItem = document.querySelector('.start-list-item');
      if (allImg.length < 6 && allImg.length + allListItems.length <= 6) {
        if (allImg.length + allListItems.length >= 6) {
          firstItem.remove();
        }
        if (allImg.length === 5) {
          firstItem.remove();
        }
        allImg.forEach((file, i) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            formImgList.insertAdjacentHTML(
              'afterbegin', ///----->>>
              `<li  class="item download__item img${i}"> 
        <img src="${reader.result}" data-position="${i}"  class="download__img" width="78" height="50" >
        <button data-index="${i}" type="button" class="close-image-button">
        <svg class='item-close-button' >
        <use href="./images/sprite/sprite.svg#icon-close">
        </use>
        </svg>
        </button>
        </li >`,
            );
            allListItems = document.querySelectorAll('.download__item');
          };

          reader.readAsDataURL(file);
        });
        allListItems = document.querySelectorAll('.download__item');
        firstItem = document.querySelector('.start-list-item');

        if (allListItems.length >= 5) {
          firstItem.remove();
        }
      }
    }
  }

  formImgList.addEventListener('click', clearImgSrc);

  function clearImgSrc(event) {
    if (event.target.nodeName === 'BUTTON') {
      let position = event.target.dataset.index;
      const currentLi = document.querySelector(`.img${position}`);
      const startListItem = document.querySelector('.start-list-item');
      currentLi.remove();

      const allListItems = document.querySelectorAll('.download__item');

      if (allListItems.length < 5 && !startListItem) {
        formImgList.insertAdjacentHTML(
          'beforeend', ////------>
          '<li class="item download__item start-list-item"><label class= "download__label" > <img class="download__img" width="78" height="50" ><input class="download__input" type="file" style="display: none" multiple /></label></li > ',
        );
      }
      firstItem = document.querySelector('.start-list-item');
    }
  }
}

function ChangeItemOnServer() {
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

  function translator(rus, list) {
    if (listOfCategory[rus] === undefined) {
      console.warn(
        'Отсутствует перевод. Отредактируйте список категорий - listOfCategory (form-create)',
      );
    }
    return listOfCategory[rus];
  }

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
    // console.dir(categorrySelectRef)
  }
}
