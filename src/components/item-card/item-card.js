import itemCardMarkup from '../../pages/main-page/templates/item-card-markup.hbs'
import {addItemToFavourite, deleteItemFromFavourite, getUsersInfoByID, getAllCategoriesWithItemsByPages, registerUserApi, loginFetch } from '../../utils/backend-services.js'
import salesmaInfoMarkup from '../item-card/salesman-info-btn.hbs'
import Slider from '../Slider/Slider.js'
import { modalBackDrop } from '../../components/modal-window/modal-logic.js'
import { openForm } from '../form-registration/form-registration.js'
import refsHeader from '../header-section/js/refs.js'

// ================RENDER MARKUP=================
function renderMarkup(item) {
    item.imageUrl = item.imageUrls[0];
    const markup = itemCardMarkup(item);

    modalBackDrop(markup);
    addAndRemoveFavorites();
    changeSmallToBigImg();
    getSalesmanInfo(item);

    const screenWidth = Number(window.innerWidth)
    if (screenWidth < 768) {
        new Slider({
            listUlSelector: ".advertisement-card-slider-list",
            dotsVerticalPosition: -30, //положення кнопок-точок по вертикалі відносно нижнього краю блоку слайдера
            dotButtonColor: "#CDCDCD",//колір неактивних кнопок
            dotButtonActiveColor: "#FF6B09",//колір активної
        });

    }

};
export default renderMarkup;
// =======================

// =======CHANGE SMALL IMG TO BIG========
function changeSmallToBigImg() {
    const bigImg = document.querySelector('.big-photo');
    const smallImgsList = document.querySelector('.advertisement-card-slider-list');

    smallImgsList.addEventListener('click', rewriteSrcOnImg);

    function rewriteSrcOnImg(event) {
        if (event.target.nodeName === 'IMG') {
            bigImg.src = event.target.src;
            // bigImg.setAttribute('src', event.target.src);
        };
    };
};
// =======================================

//   ============ADD & REMOVE FAVORITES==========

function addAndRemoveFavorites() {
    const favoritesIcon = document.querySelector('.favorites-div');
    const favIcon = favoritesIcon.querySelector('.advertisement-card-favorites-svg')

    favoritesIcon.addEventListener('click', event => {
        
    if (!refsHeader.authorizationBlock.classList.contains('is-hidden')) {
    openForm()
    } else {
        if (!favIcon.classList.contains('js-mark-favorites-svg')) {
            favIcon.classList.toggle('js-mark-favorites-svg');
            return addItemToFavourite(event.currentTarget.dataset.id);
        }
        favIcon.classList.toggle('js-mark-favorites-svg');
        return deleteItemFromFavourite(event.currentTarget.dataset.id);
}
    });
}
//   ==============================

 //==============INFO ABOUT SALESMAN===========
function getSalesmanInfo(item) {
   const salesmanInfoBtn = document.querySelector('.advertisement-card-button-salesman-info');

    salesmanInfoBtn.addEventListener('click', event => {
        event.preventDefault();
        const userId = item.userId;
        const userPhone = item.phone;
        
        getUsersInfoByID(userId)
            .then((userInfo) => {
                userInfo.phone = userPhone;
                const salesmanMarkup = salesmaInfoMarkup(userInfo);
                salesmanInfoBtn.textContent = '';
                salesmanInfoBtn.insertAdjacentHTML('beforeend', salesmanMarkup);
                salesmanInfoBtn.setAttribute('style', 'background-color: #f5f6fb');
            });
    });
};
