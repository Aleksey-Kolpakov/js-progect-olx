import {
  changeItemFetch,
  deleteItemFetch,
} from '../../../utils/backend-services.js';
import emptyOwnHbs from '../../../pages/user-items-pages/templates/emptyOwn.hbs';
import { noContentMarkup } from '../../../pages/user-items-pages/user-items-page';
import emptyOwnHbs from '../../../pages/user-items-pages/templates/emptyOwn.hbs';
import { noContentMarkup } from '../../../pages/user-items-pages/user-items-page';
import { makeNoticeError, makeNoticeSuccess } from '../../../utils/pnotify.js';

export function ChangeItemOnServer(id) {
  function closeModal() {
    const backDropRef = document.querySelector('.back-drop');
    const hiddenModal = document.querySelector('body');
    const modalRef = document.querySelector('.modal');
    backDropRef.classList.remove('is-open');
    hiddenModal.classList.remove('hiddenModalStyle');
    modalRef.innerHTML = '';
  }
  const form = document.querySelector('.form');

  const buttonDeleteRef = document.querySelector('.button-delete');
  buttonDeleteRef.addEventListener('click', deleteItem);

  function deleteItem(event) {
    event.preventDefault();
    deleteItemFetch(id).then(resp => {
      // console.log(typeof id);
      const deletedItemRef = document.querySelector(`[data-id="${id}"]`);
      const UlRef = deletedItemRef.parentElement.parentElement;
      deletedItemRef.parentElement.remove();
      if (UlRef.children.length === 0) {
        const sectionOwnRef = document.querySelector('.section-own-items');
        sectionOwnRef.remove();
        noContentMarkup(emptyOwnHbs, 'beforeend');
      }
      closeModal();
      makeNoticeSuccess('Товар успешно удален');
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
    // console.log('test');
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

    downloadInput.files.forEach(file => {
      formData.append('file', file);
    });

    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    // console.log(json);

    changeItemFetch(id, formData).then(resp => {
      if (resp.ok === true) {
        makeNoticeSuccess('Товар успешно отредактирован');
        closeModal();
      } else {
        makeNoticeError(
          'Товар не был отредактирован. Пожалуйста проверьте поля заполнения',
        );
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
  }
}
