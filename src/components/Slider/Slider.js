import './_slider.scss';

export default class Slider {
  constructor({ listUlSelector, buttons = false }) {
    this.refs = this.getRefs(listUlSelector, buttons);
  }

    getRefs(listSelectorCSS, buttons) {
      const refs = {};
      refs.sliderList = typeof listSelectorCSS === 'object'
        ? listSelectorCSS
        : document.querySelector(listSelectorCSS);
      refs.sliderList.classList.add('slider-wrap');

      refs.sliderBlock = document.createElement('div');
      refs.sliderBlock.classList.add('slider');
      refs.sliderList.parentNode.insertBefore(refs.sliderBlock, refs.sliderList);
      refs.sliderBlock.append(refs.sliderList);

      const itemCollection = refs.sliderList.children;
      itemCollection.forEach(item => item.classList.add('slider-item'));

      // const resizeWindow = () => {
      /* -------- */
      const parentWidth = refs.sliderList.offsetWidth;
      const itemWidth = itemCollection[0]?.offsetWidth;
      const itemStyles = window.getComputedStyle(itemCollection[0]);
      const itemMarginLeft = Number.parseInt(itemStyles.marginLeft);
      const itemMarginRight = Number.parseInt(itemStyles.marginRight);
      const itemMarginSum = itemMarginRight + itemMarginLeft;
      const lengthToScroll = parentWidth + itemMarginSum;//довжина, на яку треба прокрутити слайд
      const itemOnScreen = lengthToScroll / (itemWidth + itemMarginSum);
      const itemAllAmount = itemCollection.length;
      const slidesAmount = Math.ceil(itemAllAmount / itemOnScreen);//к-сть прокруток слайду.
      /* -------- */

        const screenWidth = window.innerWidth;
        const slideRightCallback = () => (this.slideRight(slidesAmount, lengthToScroll));
        const slideLeftCallback = () => (this.slideLeft(slidesAmount, lengthToScroll));
        if (buttons && screenWidth >= 768) {
          const { prevButton, nextButton } = this.createButtons(refs.sliderBlock);
          nextButton.addEventListener('click', slideRightCallback);
          prevButton.addEventListener('click', slideLeftCallback);
        }
        if (buttons && screenWidth < 768 || !buttons) {
          refs.blockDots = this.createDots(slidesAmount,lengthToScroll,refs.sliderList);
          refs.sliderBlock.append(refs.blockDots);
          // refs.sliderBlock.addEventListener('click', slideRightCallback);
        }
      // }
      // resizeWindow();
      // window.addEventListener('resize', resizeWindow);

        return refs;
  }
/* -------------------------------------------------- */
  position = 0;

  slideRight(maxPos, scrollLength) {
    this.position += 1;
    const maxPosition = maxPos - 1;
    if (this.position > maxPosition) {
        this.position = 0;
    };
    const activeScrollLength = this.position * scrollLength;
    this.refs.sliderList.style["transform"] = `translateX(calc(-${activeScrollLength}px))`;
    this.changeActiveDot(this.refs.blockDots, this.position);
  }

  slideLeft(maxPos, scrollLength) {
    this.position -= 1;
    const maxPosition = maxPos - 1;
    if (this.position < 0) {
        this.position = maxPosition;
    };
    const activeScrollLength = this.position * scrollLength;
    this.refs.sliderList.style["transform"] = `translateX(calc(-${activeScrollLength}px))`;
    this.changeActiveDot(this.refs.blockDots, this.position);
  }

  createButtons(sliderBlock) {
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

    const buttonsBlock = document.createElement('div');
    buttonsBlock.classList.add('slider-buttons-block');
    sliderBlock.parentNode.insertBefore( buttonsBlock, sliderBlock );
    buttonsBlock.append(sliderBlock);

    prevButton.classList.add('button-prev');
    nextButton.classList.add('button-next');
    buttonsBlock.append(...[prevButton, nextButton]);
    return {prevButton, nextButton};
  }

  createDots(amountOfSlides, scrollLength, sliderBlock){
    const dotsArray = [];
    for (let i = 0; i < amountOfSlides; i += 1){
      const newDot = document.createElement('li');
      newDot.setAttribute('data-id', i);
      newDot.classList.add('slider-dot');
      if (i == 0) {
          newDot.classList.add('dot-active');
      };
      dotsArray.push(newDot);
    }
    const blockDots = document.createElement('ul');
    blockDots.addEventListener('click', this.toTargetSlide(scrollLength,sliderBlock));
    blockDots.classList.add('slider-dots-block');
    blockDots.append(...dotsArray);
    return blockDots;
  }

  toTargetSlide=(scrollLength, sliderBlock)=>(event)=> {
    if (event.target === event.currentTarget) {
      return;
    }
      this.position = event.target.dataset.id;
      const activeScrollLength = this.position * scrollLength;
    sliderBlock.style["transform"] = `translateX(calc(-${activeScrollLength}px))`;
    this.changeActiveDot(this.refs.blockDots, this.position);
  }

  changeActiveDot(blockDots, currentPosition) {
    if (blockDots) {
      const allDots = blockDots.children;
      allDots.forEach(dot => dot.classList.remove('dot-active'));
      console.log(currentPosition);
      const activeDot = allDots[currentPosition];
      activeDot.classList.add('dot-active');
    }
  }
}









   // function createDots(amountOfSlides, parentNode){
        // const dotsArray = [];
        // for (let i = 0; i < amountOfSlides; i += 1){
        //     const newDot = document.createElement('li');
        //     newDot.classList.add('slider-dot');
        //     if (i == 0) {
        //         newDot.classList.add('dot-active');
        //     };
        //     dotsArray.push(newDot);
        // }
        // refs.blockDots = document.createElement('ul');
        // refs.blockDots.classList.add('slider-dots-block');
        // refs.blockDots.append(...dotsArray);
        // parentNode.append(refs.blockDots);
        // }

    // function createButtons() {
    //     refs.prevButton = document.createElement('div');
    //     refs.nextButton = document.createElement('div');

    //     refs.prevButton.insertAdjacentHTML(
    //       'beforeend',
    //       `<svg class="arrow-icon">
    //                   <use href="../images/sprite/sprite.svg#icon-chevron_left" />
    //                 </svg>`,
    //     );
    //     refs.nextButton.insertAdjacentHTML(
    //       'beforeend',
    //       `<svg class="arrow-icon">
    //                   <use href="../images/sprite/sprite.svg#icon-chevron_right" />
    //                 </svg>`,
    //     );

    //     refs.buttonsBlock = document.createElement('div');
    //     refs.buttonsBlock.classList.add('slider-buttons-block');
    //     refs.sliderBlock.parentNode.insertBefore( refs.buttonsBlock, refs.sliderBlock );
    //     refs.buttonsBlock.append(refs.sliderBlock);

    //     refs.prevButton.classList.add('button-prev');
    //     refs.nextButton.classList.add('button-next');
    //     refs.buttonsBlock.append(...[refs.prevButton, refs.nextButton]);
    // }