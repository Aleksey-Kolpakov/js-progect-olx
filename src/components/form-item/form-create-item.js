import { modalBackDrop } from '../modal-window/modal-logic.js';
import fnDownloadPhoto from '../form-change-item/form-item-image-markup';

const formCreate = `<form class="form" autocomplete="off">
  <h3 class="form__title">Редактировать объявление</h3>
  <ul class="list form__list">
    <li class="item form__item">
      <label class="form__label" for="input-text">Название товара</label>
      <input class="form__input" type="text" id="input-text" name="title"> 
    </li>
    <li class="item form__item">
      <p class="form__label-text">Фото</p>
      <ul class="form__input-download">
      </ul>
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-textarea">Описание товара</label>
      <textarea class="form__input" rows="5" id="input-textarea" name="description"></textarea>
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-select">Категория товара</label>
      <select id="form-category" class="form__input select" id="input-select" size="1" name="category">
        <option class="select__option"></option>
      </select>
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-number">Цена</label>
      <input class="form__input" type="number" placeholder="0.00 €" id="input-number" name="price">
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-tel">Телефон</label>
      <input class="form__input" type="tel" placeholder="+38 (0--) --- -- --" for="input-tel" name="phone">
    </li>
    <li class="item form__item-delete">
      <button class="button-delete" type="click" data-action="delete">
        <span class="button-delete__span">
          <svg class="button-delete__icon" width="13" height="14" aria-label="Удалить объявление">
            <use href="./images/sprite/sprite.svg#icon-file"></use>
          </svg>
        </span>
        Удалить объявление</button>
    </li>
    <li class="item form__item-submit">
      <button class="button-submit" type="submit" data-action="submit">Добавить</button>
    </li>
  </ul>
</form>`


/*const formCreateRef = document.querySelector(".create-ad-button");
formCreateRef.addEventListener('click', funModalBackDrop);
function funModalBackDrop() { modalBackDrop(formCreate) };*/

const formCreateRef = document.querySelector(".create-ad-button");
formCreateRef.addEventListener('click', openModalAddItem);


function openModalAddItem() {
  const tempale = modalBackDrop(formCreate)
  fnDownloadPhoto();
}
