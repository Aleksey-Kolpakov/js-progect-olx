import itemCardMarkup from '../../pages/main-page/templates/item-card-markup.hbs'
import {addItemToFavourite, deleteItemFromFavourite, getUsersInfoByID} from '../../utils/backend-services.js'
import salesmaInfoMarkup from '../item-card/salesman-info-btn.hbs'
import Slider from '../Slider/Slider.js'
import { modalBackDrop } from '../../components/modal-window/modal-logic.js'
import { openForm } from '../form-registration/form-registration.js'
import refsHeader from '../header-section/js/refs.js'
import {noticeToReg} from '../../utils/pnotify.js'

import { userFavourites } from '../../utils/initial-load.js'
// ================RENDER MARKUP=================
function renderMarkup(item) {
    item.imageUrl = item.imageUrls[0];
    const markup = itemCardMarkup(item);

    modalBackDrop(markup);
    addAndRemoveFavorites(item);
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

function addAndRemoveFavorites(item) {
    console.log(userFavourites);
    console.log(item);
    const isItemInFavourites = userFavourites.find(favourite => favourite._id === item._id);

    const favoritesIcon = document.querySelector('.favorites-div');
    const favIcon = favoritesIcon.querySelector('.advertisement-card-favorites-svg')
    if (isItemInFavourites) { favIcon.classList.add('js-mark-favorites-svg') }

    favoritesIcon.addEventListener('click', event => {
        if (!refsHeader.authorizationBlock.classList.contains('is-hidden')) {
            noticeToReg('Для начала зарегистрируйтесь!');
            openForm();
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
