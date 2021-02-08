const registerData = {
    email: "mark@test.com",
    password: "123321",
};

const testUser = async function () {
    const regData = await registerUserApi(registerData);
    const loginData = await loginFetch(registerData);
    //addItemToFavourite(itemId)
    // getUsersFavouritesByToken
    // const data = await getAllCategoriesWithItemsByPages();
    const additem1 = await addItemToFavourite("5fd367626da6ab0017dbf38b");
    const additem2 = await addItemToFavourite("5fd38f116da6ab0017dbf588");
    const additem3 = await addItemToFavourite("5fda618af548230017d87c35");
    // console.log(additem3);
    // const userFavourites = await getUsersFavouritesByToken();
    // console.log(userFavourites);
    const deleteitem3 = await deleteItemFromFavourite('5fda618af548230017d87c35');
    // console.log(deleteitem3);
    // const newuserFavourites = await getUsersFavouritesByToken();
    // console.log(newuserFavourites);
}

// testUser();


// BACK

// phone	string
// example: +380000000000


import itemCardMarkup from '../../pages/main-page/templates/item-card-markup.hbs'
import {addItemToFavourite, deleteItemFromFavourite, getUsersInfoByID, getAllCategoriesWithItemsByPages, getItembyTitle, registerUserApi, loginFetch } from '../../utils/backend-services.js'
import salesmaInfoMarkup from '../item-card/salesman-info-btn.hbs'
import Slider from '../Slider/Slider.js'
import {modalBackDrop} from '../../components/modal-window/modal-logic.js'

// const sectionContainer = document.querySelector('.advertisement-card-container');
// const exitBtn = document.querySelector('.advertisement-card-button-exit');



// ================RENDER MARKUP=================
function renderMarkup(item) {
    item.imageUrl = item.imageUrls[0];
            // dataMarkup.imageUrls.shift();
            // sectionContainer.innerHTML = '';
            const markup = itemCardMarkup(item);

            modalBackDrop(markup);
            addAndRemoveFavorites();
            changeSmallToBigImg();
            getSalesmanInfo();
            
            // const screenWidth = Number(window.innerWidth)
            // if (screenWidth < 768) {
            //  new Slider({ listUlSelector: '.advertisement-card-slider-list', buttons: false , dots:true});
            // }

            const screenWidth = Number(window.innerWidth)
            if (screenWidth < 768) {
                new Slider({
                    listUlSelector: ".advertisement-card-slider-list",
                    dotsVerticalPosition: -30, //положення кнопок-точок по вертикалі відносно нижнього краю блоку слайдера
                    dotButtonColor: "#CDCDCD",//колір неактивних кнопок
                    dotButtonActiveColor: "#FF6B09",//колір активної
                });
    
            }
    // new Slider({
    //   listUlSelector: ".advertisement-card-slider-list",
    //   dotsVerticalPosition: -30, //положення кнопок-точок по вертикалі відносно нижнього краю блоку слайдера
    //   dotButtonColor: "#CDCDCD",//колір неактивних кнопок
    //   dotButtonActiveColor: "#FF6B09",//колір активної
    // });
    
    

};
export default renderMarkup;
// renderMarkup();
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
      if (!favIcon.classList.contains('js-mark-favorites-svg')) {
        favIcon.classList.toggle('js-mark-favorites-svg');
        return addItemToFavourite(event.currentTarget.dataset.id);
      }
        favIcon.classList.toggle('js-mark-favorites-svg');
        return deleteItemFromFavourite(event.currentTarget.dataset.id);
    });
}
//   ==============================


 //==============INFO ABOUT SALESMAN===========
function getSalesmanInfo() {
   const salesmanInfoBtn = document.querySelector('.advertisement-card-button-salesman-info');

    salesmanInfoBtn.addEventListener('click', event => {
        event.preventDefault();
        getUsersInfoByID("5fd26f640031930017e916a2")
            .then((data) => {
                const salesmanMarkup = salesmaInfoMarkup(data);
                salesmanInfoBtn.textContent = '';
                salesmanInfoBtn.insertAdjacentHTML('beforeend', salesmanMarkup);
                salesmanInfoBtn.setAttribute('style', 'background-color: #f5f6fb');
            });
    });
};
