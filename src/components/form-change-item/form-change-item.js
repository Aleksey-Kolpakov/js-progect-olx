const imgRef = document.querySelectorAll('.download__img');
const images = Object.values(imgRef);
const fileInput = document.querySelector('.download__input');

const donwloadtems = document.querySelectorAll('.download__item');

const downloadLabels = document.querySelectorAll('.download__label');
// console.log(imageItems);

fileInput.addEventListener('change', insertImages);

function insertImages(e) {
  const allImg = Object.values(e.target.files);
  const position = images.reduce((acc, file) => {
    if (file.src !== '') {
      acc += 1;
    }
    return acc;
  }, 0);

  let currentPosition = position;

  if (allImg.length < 6) {
    allImg.forEach(file => {
      const reader = new FileReader();

      reader.onloadend = () => {
        imgRef[currentPosition].src = reader.result;
        donwloadtems[currentPosition].insertAdjacentHTML(
          'afterbegin',
          '<button type="button" class="close-image-button">X</button>',
        );

        const closeImgRef = document.querySelectorAll('.close-image-button');
        console.log(currentPosition);
        closeImgRef[currentPosition].setAttribute(
          'data-position',
          currentPosition,
        );
        closeImgRef[currentPosition].addEventListener('click', clearImgSrc);
        currentPosition += 1;
      };

      function clearImgSrc(event) {
        // console.log(event.target);
        let position = event.target.getAttribute('data-position');
        imgRef[position].src = '';
        event.target.remove();
      }

      reader.readAsDataURL(file);
    });
  }
}
