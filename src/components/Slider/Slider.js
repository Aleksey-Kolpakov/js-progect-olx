import throttle from 'lodash.throttle';
import './_slider.scss';

const { MOBILE, TABLET, DESKTOP } = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop'
}

export default class Slider {
  constructor({ listUlSelector, buttons = false, autoScroll = false, timeAutoScroll = 3000, parentPadding = '0', dotsVerticalPosition = '10', dotButtonColor = '#5E6671', dotButtonActiveColor = '#fff' }) {
    this.itemsSelector = listUlSelector;
    this.buttons = buttons;
    this.autoScrolling = autoScroll;
    this.autoScrollTime = timeAutoScroll;
    this.parentBlockPadding = parentPadding;
    this.dotsPosition = dotsVerticalPosition;
    this.dotBtnColor = dotButtonColor;
    this.dotBtnActiveColor = dotButtonActiveColor;
    this.position = 0;
    this.lengthToScroll = null;
    this.slidesAmount = null;
    this.intervalId = null;
    this.touchStartEvent = null;
    this.prevScreenType = this.setTypeOfScreen();
    this.refs = this.getRefs();
    this.renderSliderComponents();
    this.onTouchMoveSlider();
    window.addEventListener('resize', throttle(this.resizeWindowRerender, 2500),);
  }

  getRefs() {
    const refs = {};
    /* перевіряємо наш селектор це клас/id чи дом обєкт */
    refs.sliderList =
      typeof this.itemsSelector === 'object'
        ? this.itemsSelector
        : document.querySelector(this.itemsSelector);
  /* якщо селектор має такий клас, слайдер не додаємо повторно */
    if (refs.sliderList.classList.contains('slider-wrap')) {
      return;
    }
    /* додаємо селектору клас та падінги */
    // refs.sliderList.classList.add('slider-wrap');
    refs.sliderList.className = 'slider-wrap';//стирає усі попередні класи і залишає тільки нові. js-item-container' треба дял Льоши Колпакова
    refs.sliderList.style['padding'] = this.parentBlockPadding;

    /* створюємо обгортку overflow-hidden для селектора */
    refs.sliderBlock = document.createElement('div');
    refs.sliderBlock.classList.add('slider');
    // /* створюємо блок для розміщення кнопок поверх overflow-hidden */
    refs.buttonsBlock = document.createElement('div');
    refs.buttonsBlock.classList.add('slider-buttons-block');
    refs.buttonsBlock.append(refs.sliderBlock);
    /* обгортаємо селктор цими блоками */
    refs.sliderList.parentNode.insertBefore(refs.buttonsBlock, refs.sliderList);
    refs.sliderBlock.append(refs.sliderList);

    return refs;
  }
  /* -------------------------------------------------- */

  renderSliderComponents = () => {
    /* збираємо дітей селектора в псевдомасив-колекцію і вішаємо кожному клас, якщо діти існують */
    if (!this.refs) {
      // setTimeout(this.renderSliderComponents, 300);
      return;
    }
    const itemCollection = this.refs.sliderList.children;
    if (!itemCollection[0]) {
      console.error(
        'Error: array of items did not come from server yet. Connect Slider inside async function',
      );
      return;
    }
    itemCollection.forEach(item => item.classList.add('slider-item'));

    /* вираховую довжину, на яку треба прокрутити слайд, і к-сть прокруток слайду */
    const parentStyles = getComputedStyle(this.refs.sliderList);
    const { paddingLeft, paddingRight, width, marginLeft: pMarginLeft, marginRight: pMarginRight, } = parentStyles;
    let pMargins = 0;
    if (parseInt(pMarginLeft) < 0) {
      pMargins += parseInt(pMarginLeft);
    }
    if (parseInt(pMarginRight) < 0) {
      pMargins += parseInt(pMarginRight);
    }
    const parentContentWidth = parseInt(width) - parseInt(paddingLeft) - parseInt(paddingRight) + pMargins;
    const itemWidth = itemCollection[0]?.offsetWidth;
    const itemStyles = getComputedStyle(itemCollection[0]);
    const { marginLeft, marginRight } = itemStyles;
    const itemMarginSum = parseInt(marginLeft) + parseInt(marginRight);
    this.lengthToScroll = parentContentWidth + itemMarginSum; //довжина, на яку треба прокрутити слайд
    const itemOnScreen = this.lengthToScroll / (itemWidth + itemMarginSum);
    const itemAllAmount = itemCollection.length;
    this.slidesAmount = Math.ceil(itemAllAmount / itemOnScreen); //к-сть прокруток слайду.
    /* -------- */
    /* створення кнопок вліво-вправо та кнопок-точок*/
    const { prevButton, nextButton } = this.createButtons();
    this.refs.prevButton = prevButton;
    this.refs.nextButton = nextButton;
    this.refs.blockDots = this.createDots();
    this.refs.buttonsBlock.append(this.refs.blockDots, this.refs.prevButton, this.refs.nextButton);

    /* умова показу кнопок вправо-вліво */
    if (this.buttons && innerWidth >= 768) {
      const { blockDots, prevButton, nextButton } = this.refs;
      blockDots.style['display'] = 'none';
      prevButton.style['display'] = 'block';
      nextButton.style['display'] = 'block';
    }
    /* умова показу кнопок-точок під слайдером */
    if ((this.buttons && innerWidth < 768) || !this.buttons) {
      const { blockDots, prevButton, nextButton } = this.refs;
      blockDots.style['display'] = 'flex';
      prevButton.style['display'] = 'none';
      nextButton.style['display'] = 'none';
    }
    /* умова увімкнення автоскролу */
    if (this.autoScrolling) {
      this.intervalId = setInterval(this.slideRight, this.autoScrollTime);
    }
  };
  /* -------------------------------------------------- */

  slideRight = () => {
    this.position += 1;
    const maxPosition = this.slidesAmount - 1;
    if (this.position > maxPosition) {
      this.position = 0;
    }
    if (this.refs) {
      this.scrollOnNewPosition();
    }
    this.changeActiveDot();
    if (this.autoScrolling) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.slideRight, this.autoScrollTime);
    }
  };

  slideLeft = () => {
    this.position -= 1;
    const maxPosition = this.slidesAmount - 1;
    if (this.position < 0) {
      this.position = maxPosition;
    }
    // this.scrollOnNewPosition();
    if (this.refs) {
      this.scrollOnNewPosition();
    }
    this.changeActiveDot();
    if (this.autoScrolling) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.slideRight, this.autoScrollTime);
    }
  };

  /* ----створення кнопок вліво-вправо та кнопок-точок---- */
  createButtons() {
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');

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

    prevButton.classList.add('button-prev');
    nextButton.classList.add('button-next');
    nextButton.addEventListener('click', this.slideRight);
    prevButton.addEventListener('click', this.slideLeft);
    return { prevButton, nextButton };
  }

  createDots() {
    const dotsArray = [];
    for (let i = 0; i < this.slidesAmount; i += 1) {
      /* створюємо кнопку-точку і додаємо їй клас та атрибути */
      const newDotBtn = document.createElement('button');
      newDotBtn.classList.add('slider-dotBtn');
      newDotBtn.style['background-image'] = `radial-gradient(
          circle at center,
          ${this.dotBtnColor} 0,
          ${this.dotBtnColor} 50%,
          transparent 50%
        )`;
      newDotBtn.setAttribute('data-id', i);
      newDotBtn.setAttribute('aria-label', `slide to card number ${i}`);
      /* створюємо елемент списку і додаємо йому клас та вкладаємо до нього кнопку-точку */
      const newDotItem = document.createElement('li');
      newDotItem.classList.add('slider-dotItem');
      newDotItem.append(newDotBtn);
      /* якщо це перша кнопка, робимо її активною. Додаємо елемент списку з кнопкою в масив */
      if (i == 0) {
        newDotBtn.style['background-image'] = `radial-gradient(
          circle at center,
          ${this.dotBtnActiveColor} 0,
          ${this.dotBtnActiveColor} 50%,
          transparent 50%
        )`;
      }
      dotsArray.push(newDotItem);
    }
    const blockDots = document.createElement('ul');
    blockDots.addEventListener('click', this.toTargetSlide);
    blockDots.classList.add('slider-dots-block');
    blockDots.style['bottom'] = `${this.dotsPosition}px`;
    blockDots.append(...dotsArray);
    return blockDots;
  }
/* ------------------------------------- */
/* перемотка на певний елемент при кліку на кнопку-точку */
  toTargetSlide = event => {
    if (event.target === event.currentTarget) {
      return;
    }
    this.position = Number(event.target.dataset.id);
    this.scrollOnNewPosition();
    this.changeActiveDot();
    if (this.autoScrolling) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.slideRight, this.autoScrollTime);
    }
  };

  changeActiveDot() {
    if (!this.refs || !this.refs.blockDots) {
      return;
    }
    const allDots = this.refs?.blockDots?.children;
    if (allDots?.length === 0) {//доробити до толку. Це коли видаляємо розмітку героя вилазять помилки
      clearInterval(this.intervalId);
    }
    allDots?.forEach(dotItem => dotItem.children[0].style['background-image'] = `radial-gradient(
          circle at center,
          ${this.dotBtnColor} 0,
          ${this.dotBtnColor} 50%,
          transparent 50%
        )`);
    const activeDot = allDots[this.position];
    if (!activeDot) {
      return;
    }
    activeDot.children[0].style['background-image'] = `radial-gradient(
          circle at center,
          ${this.dotBtnActiveColor} 0,
          ${this.dotBtnActiveColor} 50%,
          transparent 50%
        )`;
  }
/* ------------------------------------- */
  scrollOnNewPosition() {
    const activeScrollLength = this.position * this.lengthToScroll;
    this.refs.sliderList.style[ 'transform' ] = `translateX(calc(-${activeScrollLength}px))`;
  }
/* ререндер при зміні ширини екрану*/
  setTypeOfScreen = () => {
    const currentScreenWidth = window.innerWidth;
    let screenType = null;
    if (currentScreenWidth < 768) {
      return (screenType = MOBILE);
    }
    if (currentScreenWidth >= 768 && currentScreenWidth <1280) {
        return screenType  = TABLET;
    }
    if (currentScreenWidth >= 1280) {
        return screenType  = DESKTOP;
    }
  };

  checkScreenWidth = () => {
    if (this.autoScrolling) {
      return true;
    }
    const currentScreenType = this.setTypeOfScreen();
    if (currentScreenType === this.prevScreenType) {
      return false;
    }
    this.prevScreenType = currentScreenType;
    return true;
  };

  refresh = () => {
    if (!this.refs) {
      return;
    }
    clearInterval(this.intervalId);
    this.refs.blockDots.style['display'] = `none`;
    this.refs.prevButton.style['display'] = `none`;
    this.refs.nextButton.style['display'] = `none`;
  };

  resizeWindowRerender = () => {
    const mustRerender = this.checkScreenWidth();
    if (!mustRerender) {
      return;
    }
    this.refresh();
    this.renderSliderComponents();
    this.position = this.slidesAmount;
    this.slideRight();
  };
/* ------------------------------------- */
  onTouchMoveSlider = () => {
    if (!this.refs) {
      return;
    }
    if ('ontouchmove' in this.refs.sliderList) {
      this.refs.sliderList.addEventListener("touchstart", (event) => this.touchStartEvent = event);
      this.refs.sliderList.addEventListener("touchend", (event) => {
        const touchMoveDelta = event.changedTouches[0].pageX - this.touchStartEvent.changedTouches[0].pageX;
        if (touchMoveDelta > 5) {
          this.slideLeft();
        }
        if (touchMoveDelta < -5) {
          this.slideRight();
        }
        this.touchStartEvent = null;
      });
    }
  }
/* ------------------------------------- */
}
