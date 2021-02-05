const formChangeItem = `<div class="container__form">
  <button class="button-close" type="button" data-action="close">
    <svg
      class="button-close__icon"
      width="24"
      height="24"
      aria-label="Закрытие модального окна"
    >
      <use href="./images/sprite/sprite.svg#icon-close"></use>
    </svg>
  </button>

  <form class="form" autocomplete="off">
    <h3 class="form__title">Редактировать объявление</h3>
    <ul class="list form__list">
      <li class="item form__item">
        <label class="form__label" for="input-text">Название товара</label>
        <input class="form__input" type="text" id="input-text" />
      </li>
      <li class="item form__item">
        <p class="form__label-text">Фото</p>
        <ul class="form__input-download"></ul>
      </li>
      <li class="item form__item">
        <label class="form__label" for="input-textarea">Описание товара</label>
        <textarea class="form__input" rows="5" id="input-textarea"></textarea>
      </li>
      <li class="item form__item">
        <label class="form__label" for="input-select">Категория товара</label>
        <select class="form__input" id="input-select"></select>
      </li>
      <li class="item form__item">
        <label class="form__label" for="input-number">Цена</label>
        <input
          class="form__input"
          type="number"
          placeholder="0.00 €"
          id="input-number"
        />
      </li>
      <li class="item form__item">
        <label class="form__label" for="input-tel">Телефон</label>
        <input
          class="form__input"
          type="tel"
          placeholder="+38 (0--) --- -- --"
          for="input-tel"
        />
      </li>
      <li class="item form__item-delete">
        <button class="button-delete" type="click" data-action="delete">
          <span class="button-delete__span">
            <svg
              class="button-delete__icon"
              width="13"
              height="14"
              aria-label="Удалить объявление"
            >
              <use href="./images/sprite/sprite.svg#icon-file"></use>
            </svg>
          </span>
          Удалить объявление
        </button>
      </li>
      <li class="item form__item-submit">
        <button class="button-submit" type="submit" data-action="submit">
          Добавить
        </button>
      </li>
    </ul>
  </form>
</div>
`;

// import func from './form-item-image-markup';
// func();

// import obj from './objectForTest';
// console.log(obj.imageUrls);
// const formImgList = document.querySelector('.form__input-download');
// // console.log(obj.imageUrls);
// obj.imageUrls.forEach((img, i) => {
//   console.log(img);
//   formImgList.insertAdjacentHTML(
//     'afterbegin',
//     `<li  class=item download__item img${i}> <img src=${img} data-position=${i}  class=download__img width="78" height="50" ><button data-index="${i}" type="button" class="close-image-button">X</button></li > `,
//   );
// });
