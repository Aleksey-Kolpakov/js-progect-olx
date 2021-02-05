import throttle from 'lodash.throttle';
import './_slider.scss';

export default class Slider {
  constructor({ listUlSelector, buttons = false, autoScroll = false, timeAutoScroll = 3000, parentPadding = '0' }) {
    this.position = 0;
    this.itemsSelector = listUlSelector;
    this.buttons = buttons;
    this.autoScrolling = autoScroll;
    this.autoScrollTime = timeAutoScroll;
    this.parentBlockPadding = parentPadding;
    this.lengthToScroll = null;
    this.slidesAmount = null;
    this.intervalId = null;
    this.refs = this.getRefs();
    this.renderSliderComponents();
    window.addEventListener('resize', throttle(this.resizeWindowRerender, 1500));
  }

  getRefs() {
    const refs = {};
    /* перевіряємо наш селектор це клас/id чи дом обєкт */
    refs.sliderList = typeof this.itemsSelector === 'object'
      ? this.itemsSelector
      : document.querySelector(this.itemsSelector);
    /* якщо селектор має такий клас, слайдер не додаємо повторно */
    if (refs.sliderList.classList.contains('slider-wrap')) {
      return;
    }
    /* додаємо селектору клас та падінги */
    refs.sliderList.classList.add('slider-wrap');
    refs.sliderList.style['padding'] = this.parentBlockPadding;
    /* створюємо обгортку для селектора */
    refs.sliderBlock = document.createElement('div');
    refs.sliderBlock.classList.add('slider');
    refs.sliderList.parentNode.insertBefore(refs.sliderBlock, refs.sliderList);
    refs.sliderBlock.append(refs.sliderList);
    refs.blockDots = document.createElement('div');
    refs.buttonsBlock = document.createElement('div');
    return refs;
  }
/* -------------------------------------------------- */
  renderSliderComponents = () => {
  /* збираємо дітей селектора в псевдомасив-колекцію і вішаємо кожному клас, якщо діти існують */
    if (!this.refs) {
      setInterval(this.renderSliderComponents, 300);
      return;
    }
    const itemCollection = this.refs.sliderList.children;
    if (!itemCollection[0]) {
      console.error('Error: array of items did not come from server yet. Connect Slider inside async function');
      return;
    }
    itemCollection.forEach(item => item.classList.add('slider-item'));

    /* вираховую довжину, на яку треба прокрутити слайд, і к-сть прокруток слайду */
    const parentStyles = getComputedStyle(this.refs.sliderList);
    const { paddingLeft, paddingRight, width } = parentStyles;
    const parentContentWidth = parseInt(width) - parseInt(paddingLeft) - parseInt(paddingRight);
    const itemWidth = itemCollection[0]?.offsetWidth;
    const itemStyles = getComputedStyle(itemCollection[0]);
    const { marginLeft, marginRight } = itemStyles;
    const itemMarginSum = parseInt(marginLeft) + parseInt(marginRight);
    this.lengthToScroll = parentContentWidth + itemMarginSum;//довжина, на яку треба прокрутити слайд
    const itemOnScreen = this.lengthToScroll / (itemWidth + itemMarginSum);
    const itemAllAmount = itemCollection.length;
    this.slidesAmount = Math.ceil(itemAllAmount / itemOnScreen);//к-сть прокруток слайду.
    /* -------- */

    /* умова створення кнопок вправо-вліво */
      if (this.buttons && innerWidth >= 768) {
        const { prevButton, nextButton } = this.createButtons();
        nextButton.addEventListener('click', this.slideRight);
        prevButton.addEventListener('click', this.slideLeft);
      }
    /* умова створення кнопок-точок під слайдером */
      if (this.buttons && innerWidth < 768 || !this.buttons) {
        this.refs.blockDots = this.createDots();
        this.refs.sliderBlock.append(this.refs.blockDots);
      }
    /* умова увімкнення автоскролу */
      if (this.autoScrolling) {
        this.intervalId = setInterval(this.slideRight, this.autoScrollTime);
      }
    }
/* -------------------------------------------------- */

  slideRight=()=> {
    this.position += 1;
    const maxPosition = this.slidesAmount - 1;
    if (this.position > maxPosition) {
        this.position = 0;
    };
    const activeScrollLength = this.position * this.lengthToScroll;
    if (this.refs) {
      this.refs.sliderList.style["transform"] = `translateX(calc(-${activeScrollLength}px))`;
    }
    this.changeActiveDot();
  }

  slideLeft=()=> {
    this.position -= 1;
    const maxPosition = this.slidesAmount - 1;
    if (this.position < 0) {
        this.position = maxPosition;
    };
    const activeScrollLength = this.position * this.lengthToScroll;
    this.refs.sliderList.style["transform"] = `translateX(calc(-${activeScrollLength}px))`;
    this.changeActiveDot();
  }

  createButtons() {
    const prevButton = document.createElement('div');
    const nextButton = document.createElement('div');

    prevButton.insertAdjacentHTML(
      'beforeend',
      `<svg class="arrow-icon">
                  <use href="../images/sprite/sprite.svg#icon-chevron_left" />
                </svg>`,
    );
    nextButton.insertAdjacentHTML(
      'beforeend',
      `<svg class="arrow-icon">
                  <use href="../images/sprite/sprite.svg#icon-chevron_right" />
                </svg>`,
    );
    this.refs.buttonsBlock = document.createElement('div');
    this.refs.buttonsBlock.classList.add('slider-buttons-block');
    this.refs.sliderBlock.parentNode.insertBefore( this.refs.buttonsBlock, this.refs.sliderBlock );
    this.refs.buttonsBlock.append(this.refs.sliderBlock);

    prevButton.classList.add('button-prev');
    nextButton.classList.add('button-next');
    this.refs.buttonsBlock.append(prevButton, nextButton);
    return {prevButton, nextButton};
  }

  refresh = () => {
    clearInterval(this.intervalId);
    this.refs?.blockDots?.remove();
    if (this.refs?.buttonsBlock.parentNode) {
      this.refs.buttonsBlock.parentNode.insertBefore(this.refs.sliderBlock, this.refs.buttonsBlock);
      this.refs.sliderBlock.append(this.refs.buttonsBlock);
      this.refs.buttonsBlock.remove();
    }
  }

  createDots(){
    const dotsArray = [];
    for (let i = 0; i < this.slidesAmount; i += 1){
      const newDot = document.createElement('li');
      newDot.setAttribute('data-id', i);
      newDot.classList.add('slider-dot');
      if (i == 0) {
          newDot.classList.add('dot-active');
      };
      dotsArray.push(newDot);
    }
    const blockDots = document.createElement('ul');
    blockDots.addEventListener('click', this.toTargetSlide);
    blockDots.classList.add('slider-dots-block');
    blockDots.append(...dotsArray);
    return blockDots;
  }

  toTargetSlide=(event)=> {
    if (event.target === event.currentTarget) {
      return;
    }
      this.position = Number(event.target.dataset.id);
      const activeScrollLength = this.position * this.lengthToScroll;
    this.refs.sliderList.style["transform"] = `translateX(calc(-${activeScrollLength}px))`;
    this.changeActiveDot();
    if (this.autoScrolling) {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.slideRight, this.autoScrollTime);
    }
  }

  changeActiveDot() {
    if (!this.refs) {
      return
    };
      const allDots = this.refs?.blockDots?.children;
      allDots?.forEach(dot => dot.classList.remove('dot-active'));
      const activeDot = allDots[this.position];
      activeDot?.classList.add('dot-active');
  }

  resizeWindowRerender = () => {
      this.refresh();
      this.renderSliderComponents();
      this.position = this.slidesAmount;
      this.slideRight();
    }
}