export default function () {
  const formImgList = document.querySelector('.form__input-download');

  formImgList.insertAdjacentHTML(
    'beforeend',
    '<li class="item download__item start-list-item"><label class= "download__label" > <img class="download__img" width="78" height="50" ><input class="download__input" type="file" style="display: none" multiple /></label></li > ',
  );

  // const fileInput = document.querySelector('.download__input');

  let firstItem = document.querySelector('.start-list-item');

  formImgList.addEventListener('change', insertImages);

  function insertImages(e) {
    if (e.target.nodeName === 'INPUT') {
      // console.log('bla');
      const allImg = Object.values(e.target.files);
      let allListItems = document.querySelectorAll('.download__item');

      if (allImg.length < 6 && allImg.length + allListItems.length <= 6) {
        if (allImg.length === 5) {
          firstItem.remove();
        }
        allImg.forEach((file, i) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            formImgList.insertAdjacentHTML(
              'afterbegin',
              `<li  class="item download__item img${i}"> <img src="${reader.result}" data-position="${i}"  class="download__img" width="78" height="50" ><button data-index="${i}" type="button" class="close-image-button">X</button></li > `,
            );
            const allListItems = document.querySelectorAll('.download__item');
          };

          reader.readAsDataURL(file);
        });
        allListItems = document.querySelectorAll('.download__item');
        firstItem = document.querySelector('.start-list-item');
        console.log(allListItems);
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
          'beforeend',
          '<li class="item download__item start-list-item"><label class= "download__label" > <img class="download__img" width="78" height="50" ><input class="download__input" type="file" style="display: none" multiple /></label></li > ',
        );
      }
      firstItem = document.querySelector('.start-list-item');
    }
  }
}
