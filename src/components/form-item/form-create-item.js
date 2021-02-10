import { modalBackDrop } from '../modal-window/modal-logic.js';
import { DynamicMarkUp } from '../form-change-item/form-item-image-markup';
import { addRusCategory } from '../form-item/form-create.js';
import { sendItemOnServer } from '../form-item/form-create.js';

const formCreate = `<form class="form" autocomplete="off">
  <h3 class="form__title">Создать объявление</h3>
  <ul class="list form__list">
    <li class="item form__item">
      <label class="form__label" for="input-text">Название товара</label>
      <input class="form__input" required type="text" id="input-text" name="title"> 
    </li>
    <li class="item form__item">
      <p class="form__label-text">Фото</p>
      <ul class="form__input-download">
      </ul>
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-textarea">Описание товара</label>
      <textarea class="form__input" required rows="5" id="input-textarea" name="description"></textarea>
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-select">Категория товара</label>
      <select id="form-category" class="form__input select" required id="input-select" size="1" name="category">
        <option class="select__option"></option>
      </select>
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-number">Цена</label>
      <input class="form__input valid" required type="tel" 
      placeholder="0.00 €" id="input-number"
      pattern="[^0][0-9]{0,10}"
      minlength="1" maxlength="10"
      name="price">
    </li>
    <li class="item form__item">
      <label class="form__label" for="input-tel">Телефон</label>
      <input class="form__input valid" required type="tel" 
      placeholder="+38 0XX XXX XX XX" for="input-tel"
      pattern="[+][3][8][0][0-9]{9}"
      minlength="13" maxlength="13"
      name="phone">
    </li>
    <li class="item form__item-submit">
      <button class="button-submit" type="submit" data-action="submit">Добавить</button>
    </li>
  </ul>
</form>`;

function openModalAddItem() {
  //-----------------------------------------------> Ф-я динамической загрузки формы в модальное окно
  modalBackDrop(formCreate);

  //-----------------------------------------------> Ф-я загрузки шаблона для фотографий в инпут
  DynamicMarkUp();
  const inputDownloadRef = document.querySelector('.download__input');
  inputDownloadRef.setAttribute('required', ' ');

  //-----------------------------------------------> Ф-я загрузки списка категорий в инпут
  addRusCategory();

  //-----------------------------------------------> Ф-я отправки формы на бэкэенд
  sendItemOnServer();
}

export { openModalAddItem };
