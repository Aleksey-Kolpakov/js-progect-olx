import { modalBackDrop } from '../modal-window/modal-logic.js';
import formChangeItem from './form-change-item';
import templateCategory from '../form-item/category.hbs';
import { RussianCategoriesPromise } from '../../utils/initial-load.js';
import { ChangeItemOnServer } from './js/send-on-server.js';

export function MarkUpFormChange(id) {
  modalBackDrop(formChangeItem);

  const categoryRef = document.querySelector('#form-category');

  RussianCategoriesPromise.then(function (data) {
    const template = templateCategory(data);
    categoryRef.insertAdjacentHTML('beforeend', template);
    return;
  });
  ChangeItemOnServer(id);
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
//--------------------------------------------------------------------------------------------------------------
