import Slider from '../../components/Slider/Slider';
import itemsMarkup from './templates/category-items-markup.hbs';
import categoryMarkup from './templates/categories-markup.hbs';
import throttle from 'lodash.throttle';
import { getAllCategoriesWithItemsByPages } from '../../utils/backend-services.js';
let pageNumber = 1;
import { itemOpener } from '../../utils/item-opener.js';

import { makeFilterButtonActive } from '../../components/header-section/js/service'; // kozubskyi

const galleryRef = document.querySelector('.section-gallery');
const sectionGalleryRef = document.querySelector('.section-gallery-upload');
const loadmoreBtn = document.querySelector('.loadmore-btn');
const sectionLinkRef = document.querySelector('.section-link');
const mainSectionRef = document.querySelector('.main-section');
const arrowUpRef = document.querySelector('.arrow-up');

loadmoreBtn.addEventListener('click', loadmoreMarkup);
window.addEventListener('scroll', throttle(listArrowBtn, 200));
arrowUpRef.addEventListener('click', scrollToHeader);

// const getAllCategoriesWithItemsByPages = function (pageNumber) {
//   return fetch(
//     `https://callboard-backend.goit.global/call?page=${pageNumber}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//       },
//     },
//   )
//     .then(response => response.json())
//     .catch(error => console.log(error));
// };
function getItemsInCategory(category) {
  return fetch(
    `https://callboard-backend.goit.global/call/specific/${category}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
}

function loadmoreMarkup(event) {
  event.preventDefault();
  pageNumber += 1;
  if (pageNumber < 3) {
    markupSections();

    return;
  }
  markupSections();
  loadmoreBtn.classList.add('is-hidden');
  pageNumber = '';
}

function markupSections() {
  getAllCategoriesWithItemsByPages(pageNumber).then(data => {
    if (data.sales) {
      const { sales, ...otherEl } = data;
      const values = Object.values(otherEl);

      const categoryName = values.map(item => item[0].category);
      createMarkup(categoryName, otherEl);
      const sectionTittleRef = document.querySelectorAll('.section-title');
      sectionTittleRef.forEach(item => {
        if (item.textContent === 'recreation and sport') {
          item.textContent = 'Отдых и спорт';
          return;
        }
        if (item.textContent === 'business and services') {
          item.textContent = 'Бизнес и услуги';
          return;
        }
        if (item.textContent === 'free') {
          item.textContent = 'Отдам бесплатно';
          return;
        }
      });
      itemOpener();
      return;
    }
    const values = Object.values(data);

    const categoryName = values.map(item => item[0].category);
    createMarkup(categoryName, data);
    itemOpener();

    const sectionTittleRef = document.querySelectorAll('.section-title');
    sectionTittleRef.forEach(item => {
      if (item.textContent === 'property') {
        item.textContent = 'Недвижимость';
        return;
      }
      if (item.textContent === 'transport') {
        item.textContent = 'Транспорт';
        return;
      }
      if (item.textContent === 'work') {
        item.textContent = 'Работа';
        return;
      }
      if (item.textContent === 'electronics') {
        item.textContent = 'Электроника';
        return;
      }
      if (item.textContent === 'business and services') {
        item.textContent = 'Бизнес и услуги';
        return;
      }
      if (item.textContent === 'free') {
        item.textContent = 'Отдам бесплатно';
        return;
      }
      if (item.textContent === 'trade') {
        item.textContent = 'Обмен';
        return;
      }
    });
  });
}

function createMarkup(categoriesList, otherEl) {
  const values = Object.values(otherEl);
  const createMarkup = categoriesList
    .map((title, indx) => {
      return `<section class="section-category">
  <div class="container">
    <h2 class="section-title">${title}</h2>
    <a href="" class="section-link" data-title="${title.trim()}">
      Смотреть все
    </a>
    <p class="section-text">
      Товары домашнего обихода, видео, аудио, наушники, камеры, аксессуары и
      многое другое.
    </p>
    <ul class="section-gallery js-item-container">
    ${values[indx]
      .map(item => ({
        ...item,
        imageUrls: item.imageUrls[0],
      }))
      .map((item, indx) => {
        if (indx <= 15) {
          return `<li class="section-gallery-item slider-item">
          <a href="" class=" section-gallery-goods-link" data-id="${item._id}">
        <div class="image-container">
        <img
          class="section-gallery-item-image"
          src="${item.imageUrls}"
          alt="${item.title}"
          loading="lazy"
        />
        </div>
        <h3 class="section-gallery-item-title" title="${item.title}">${item.title}</h3>
        <div class="price-container">
          <p class="section-gallery-item-newprice">${item.price} €</p>
        </div>
        <svg class="icon-fullscreen" width="20" height="24">
            <use href="./images/sprite/sprite.svg#icon-fullscreen"></use>
        </svg>
        <svg class="icon-add-favorite" width="17" height="20">
            <use href="./images/sprite/sprite.svg#icon-heart-add-favorite"></use>
        </svg>
        </a>
      </li>`;
        }
      })
      .join('')}
    </ul>
  </div>
</section>`;
    })
    .join('');
  sectionGalleryRef.insertAdjacentHTML('beforebegin', createMarkup);
  const ArraySectionGallery = document.querySelectorAll('.section-gallery');
  ArraySectionGallery.forEach((section, indx) => {
    // if (indx === 0) {
    //   return;
    // }
    new Slider({
      listUlSelector: section,
      buttons: true,
      parentPadding: '5px 2px',
      dotButtonColor: '#CDCDCD',
      dotButtonActiveColor: '#FF6B09',
    });
  });

  const sectionLinksRef = document
    .querySelectorAll('.section-link')
    .forEach(link => {
      link.addEventListener('click', onClick);
    });
}

export function markupSales() {
  getAllCategoriesWithItemsByPages(pageNumber).then(resp => {
    const sales = resp.sales;
    const mapSales = sales.map(element => ({
      ...element,
      imageUrls: element.imageUrls[0],
    }));
    const markupSales = itemsMarkup(mapSales);
    galleryRef.insertAdjacentHTML('beforeend', markupSales);
    new Slider({
      listUlSelector: '.section-gallery',
      buttons: true,
      parentPadding: '5px 2px',
      dotButtonColor: '#CDCDCD',
      dotButtonActiveColor: '#FF6B09',
    });
  });
  markupSections();
}

function onClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    const currentSection = event.target.dataset.title;

    makeFilterButtonActive(currentSection); // kozubskyi

    history.pushState(null, null, currentSection.replace(/ /g, '-'));
    getItemsInCategory(currentSection).then(resp => {
      const mapImg = resp.map((item, indx) => ({
        ...item,
        imageUrls: item.imageUrls[0],
      }));
      const markup = categoryMarkup(mapImg);
      mainSectionRef.innerHTML = '';
      mainSectionRef.insertAdjacentHTML('beforeend', markup);

      const sectionTittleRef = document.querySelector('.section-title');
      const activeSectionValueRef = document.querySelector(
        '.header-filter-item.is-active',
      );
      sectionTittleRef.textContent = activeSectionValueRef.textContent;
      itemOpener();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

function scrollToHeader() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function listArrowBtn() {
  if (pageYOffset > 400) {
    arrowUpRef.classList.add('is-active');
  } else {
    arrowUpRef.classList.remove('is-active');
  }
}

markupSales();

// .then(
//   items => console.log(items),
//   // items.reduce(
//   //   (accObj, item, index) => {
//   //     if (index > 0 && index <= 5) {
//   //       item.id = index + 1;
//   //       accObj.notslider.push(item);
//   //       return accObj;
//   //     }
//   //     accObj.slider.push(item);
//   //     return accObj;
//   //   },
//   //   { slider: [], notslider: [] },
//   // ),
// )
// .then(ObjWithArrays => {
//   const markUpSlider = itemsMarkup(ObjWithArrays.slider);
//   galleryRef.insertAdjacentHTML('beforeend', markUpSlider);
//   new Slider({ listUlSelector: '.section-gallery', buttons: false });
// });
