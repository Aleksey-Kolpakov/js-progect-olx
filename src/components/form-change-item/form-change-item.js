export default function () {
  const formImgList = document.querySelector('.form__input-download');
  console.log(formImgList);

  formImgList.insertAdjacentHTML(
    'afterbegin',
    '<li class="item download__item"><label class= "download__label" > <img class="download__img" width="78" height="50" ><input class="download__input" type="file" style="display: none" multiple /></label></li > ',
  );

  const fileInput = document.querySelector('.download__input');

  fileInput.addEventListener('change', insertImages);

  function insertImages(e) {
    const allImg = Object.values(e.target.files);

    if (allImg.length < 6) {
      allImg.forEach((file, i) => {
        const donwloadtems = document.querySelectorAll('.download__item');

        const reader = new FileReader();

        reader.onloadend = () => {
          formImgList.insertAdjacentHTML(
            'afterbegin',
            `<li class="item download__item"> <img src="${reader.result}" data-index="${i}"  class="download__img" width="78" height="50" ><button data-index="${i}" type="button" class="close-image-button">X</button></li > `,
          );

          const closeImgRef = document.querySelector('.close-image-button');

          closeImgRef.addEventListener('click', clearImgSrc);
        };

        function clearImgSrc(event) {
          let position = event.target.dataset.index;
          let currentimg = document.querySelectorAll('[data-index]');
          console.log(currentimg);
        }

        reader.readAsDataURL(file);
      });
    }
  }
}

/* <li class="item download__item">        
                      <label class="download__label">
                        <img class="download__img" width="78" height="50" >
                      <input class="download__input" type="file"  style="display: none" multiple/>
                    </label>
                    </li> */

// const position = images.reduce((acc, file) => {
//   if (file.src !== '') {
//     acc += 1;
//   }
//   if (file.src === 'http://localhost:4040/a') {
//     acc -= 1;
//     console.log('test');
//   }
//   return acc;
// }, 0);

// donwloadtems[currentPosition].insertAdjacentHTML(
//   'afterbegin',
//   '<button type="button" class="close-image-button">X</button>',
// );
