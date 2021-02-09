import { modalBackDrop } from '../modal-window/modal-logic.js';
import { DynamicMarkUp } from '../form-change-item/form-item-image-markup';
import { addRusCategory } from '../form-item/form-create.js';
import { sendItemOnServer } from '../form-item/form-create.js';

const formCreate = `<form class="form" autocomplete="off">
  <h3 class="form__title">Создать объявление</h3>
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
      <span class="form__error">Это поле должно содержать телефон в формате +38073737300</span>
      <input class="form__input valid" type="tel" placeholder="+38 (0--) --- -- --" for="input-tel"
      pattern="\+3\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" minlength="13" maxlength="13" name="phone">
    </li>
    <li class="item form__item-submit">
      <button class="button-submit" type="submit" data-action="submit">Добавить</button>
    </li>
  </ul>
</form>`;

/*const formCreateRef = document.querySelector(".create-ad-button");
formCreateRef.addEventListener('click', funModalBackDrop);
function funModalBackDrop() { modalBackDrop(formCreate) };*/

// const formCreateRef = document.querySelector('.create-ad-button');
// formCreateRef.addEventListener('click', openModalAddItem);

function openModalAddItem() {

  //-----------------------------------------------> Ф-я динамической загрузки формы в модальное окно
  const tempale = modalBackDrop(formCreate);

  //-----------------------------------------------> Ф-я загрузки шаблона для фотографий в инпут
  DynamicMarkUp();

  //-----------------------------------------------> Ф-я загрузки списка категорий в инпут
  addRusCategory();

  sendItemOnServer();
}

export { openModalAddItem };
