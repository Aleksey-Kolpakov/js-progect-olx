// const imgRef = document.querySelectorAll('.download__img');
// const images = Object.values(imgRef);

// const downloadLabels = document.querySelectorAll('.download__label');
// console.log(imageItems);

const formImgList = document.querySelector('.form__input-download');
console.log(formImgList);

formImgList.insertAdjacentHTML(
  'afterbegin',
  '<li class="item download__item"><label class= "download__label" > <img class="download__img" width="78" height="50" ><input class="download__input" type="file" style="display: none" multiple /></label></li > ',
);

const fileInput = document.querySelector('.download__input');

fileInput.addEventListener('change', insertImages);

function insertImages(e) {
  console.log(images);
  const allImg = Object.values(e.target.files);

  let currentPosition = position;

  if (allImg.length < 6) {
    allImg.forEach(file => {
      const donwloadtems = document.querySelectorAll('.download__item');
      const reader = new FileReader();

      reader.onloadend = () => {
        // imgRef[currentPosition].;

        const closeImgRef = document.querySelectorAll('.close-image-button');
        closeImgRef[currentPosition].setAttribute(
          'data-position',
          currentPosition,
        );

        closeImgRef[currentPosition].addEventListener('click', clearImgSrc);
      };

      function clearImgSrc(event) {
        // console.log(event.target);
        let position = event.target.getAttribute('data-position');
        imgRef[position].src = 'a';
        event.target.remove();
      }

      reader.readAsDataURL(file);
    });
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
