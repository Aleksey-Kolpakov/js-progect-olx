import './_slider.scss';

export default class Slider {
  constructor({ listUlSelector, buttons = false }) {
    this.refs = this.getRefs(listUlSelector, buttons);
  }

  getRefs(listSelectorCSS, buttons) {
    const refs = {};
    // refs.sliderList = document.querySelector(listSelectorCSS);
    refs.sliderList =
      typeof listSelectorCSS === 'object'
        ? listSelectorCSS
        : document.querySelector(listSelectorCSS);
    refs.sliderList.classList.add('slider-wrap');

    refs.sliderBlock = document.createElement('div');
    refs.sliderBlock.classList.add('slider');
    refs.sliderList.parentNode.insertBefore(refs.sliderBlock, refs.sliderList);
    refs.sliderBlock.append(refs.sliderList);

    const itemCollection = refs.sliderList.children;
    itemCollection.forEach(item => item.classList.add('slider-item'));
    const itemAmount = itemCollection.length;

    function createDots(amountOfItems, parentNode) {
      const dotsArray = [];
      for (let i = 0; i < amountOfItems; i += 1) {
        const newDot = document.createElement('div');
        newDot.classList.add('slider-dot');
        if (i == 0) {
          newDot.classList.add('dot-active');
        }
        dotsArray.push(newDot);
      }
      refs.blockDots = document.createElement('div');
      refs.blockDots.append(...dotsArray);
      refs.blockDots.classList.add('slider-dots-block');
      parentNode.append(refs.blockDots);
    }

    function createButtons() {
      refs.prevButton = document.createElement('div');
      refs.nextButton = document.createElement('div');

      refs.prevButton.insertAdjacentHTML(
        'beforeend',
        `<svg class="arrow-icon">
                    <use href="../images/sprite/sprite.svg#icon-chevron_left" />
                  </svg>`,
      );
      refs.nextButton.insertAdjacentHTML(
        'beforeend',
        `<svg class="arrow-icon">
                    <use href="../images/sprite/sprite.svg#icon-chevron_right" />
                  </svg>`,
      );

      refs.buttonsBlock = document.createElement('div');
      refs.buttonsBlock.classList.add('slider-buttons-block');
      refs.sliderBlock.parentNode.insertBefore(
        refs.buttonsBlock,
        refs.sliderBlock,
      );
      refs.buttonsBlock.append(refs.sliderBlock);

      refs.prevButton.classList.add('button-prev');
      refs.nextButton.classList.add('button-next');
      refs.buttonsBlock.append(...[refs.prevButton, refs.nextButton]);
    }
    const screenWidth = window.innerWidth;
    console.log('screenWidth', screenWidth);
    if (buttons && screenWidth >= 768) {
      createButtons();
      refs.nextButton.addEventListener('click', this.slideRight.bind(this));
      refs.prevButton.addEventListener('click', this.slideLeft.bind(this));
    }
    if ((buttons && screenWidth < 768) || !buttons) {
      createDots(itemAmount, refs.sliderBlock);
      refs.sliderBlock.addEventListener('click', this.slideRight.bind(this));
    }

    return refs;
  }

  position = 0;

  slideRight() {
    this.position += 1;
    const maxPosition = this.refs.sliderList.children.length - 1;
    if (this.position > maxPosition) {
      this.position = 0;
    }
    this.refs.sliderList.style[
      'transform'
    ] = `translateX(-${this.position}00%)`;
    this.changeActiveDot(this.refs.blockDots, this.position);
  }

  slideLeft() {
    this.position -= 1;
    const maxPosition = this.refs.sliderList.children.length - 1;
    if (this.position < 0) {
      this.position = maxPosition;
    }
    this.refs.sliderList.style[
      'transform'
    ] = `translateX(-${this.position}00%)`;
    this.changeActiveDot(this.refs.blockDots, this.position);
  }

  changeActiveDot(blockDots, currentPosition) {
    if (blockDots) {
      const allDots = blockDots.children;
      allDots.forEach(dot => dot.classList.remove('dot-active'));
      const activeDot = allDots[currentPosition];
      activeDot.classList.add('dot-active');
    }
  }
}
