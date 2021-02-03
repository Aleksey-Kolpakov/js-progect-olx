const imgRef = document.querySelectorAll('.download__img');
const images = Object.values(imgRef);
const fileInput = document.querySelector('.download__input');

const imageItems = document.querySelectorAll('.download__item');

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
        imageItems[currentPosition].insertAdjacentElement(
          'beforeend',
          '<button type="button" class="close-image-button">X</button>',
        );
        // console.log(imageItems[currentPosition]);
        currentPosition += 1;
      };

      reader.readAsDataURL(file);
    });
  }
}
