import itemsMarkup from './tamplates/category-items-markup.hbs';

let pageNumber = 1;

const galleryRef = document.querySelector('.section-gallery');
const sectionGalleryRef = document.querySelector('.section-gallery-upload');
const loadmoreBtn = document.querySelector('.loadmore-btn');

loadmoreBtn.addEventListener('click', loadmoreMarkup);

const getAllCategoriesWithItemsByPages = function (pageNumber) {
  return fetch(
    `https://callboard-backend.goit.global/call?page=${pageNumber}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
};

function loadmoreMarkup() {
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
      return;
    }
    const values = Object.values(data);

    const categoryName = values.map(item => item[0].category);
    createMarkup(categoryName, data);
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
    <a href="" class="section-link">
      Смотреть все
    </a>
    <p class="section-text">
      Товары домашнего обихода, видео, аудио, наушники, камеры, аксессуары и
      многое другое.
    </p>
    <ul class="section-gallery">
    ${values[indx]
      .map(item => ({
        ...item,
        imageUrls: item.imageUrls[0],
      }))
      .map(item => {
        return `<li class="section-gallery-item">
        <img
          class="section-gallery-item-image"
          src="${item.imageUrls}"
          alt="${item.title}"
        />
        <h3 class="section-gallery-item-title">${item.title}</h3>
        <div class="price-container">
          <p class="section-gallery-item-newprice">${item.price} €</p>
        </div>
      </li>`;
      })
      .join('')}
    </ul>
  </div>
</section>`;
    })
    .join('');
  sectionGalleryRef.insertAdjacentHTML('beforebegin', createMarkup);
}

function markupSales() {
  getAllCategoriesWithItemsByPages(pageNumber).then(resp => {
    const sales = resp.sales;
    const mapSales = sales.map(element => ({
      ...element,
      imageUrls: element.imageUrls[0],
    }));
    const markupSales = itemsMarkup(mapSales);
    galleryRef.insertAdjacentHTML('beforeend', markupSales);
  });
  markupSections();
}

markupSales();
