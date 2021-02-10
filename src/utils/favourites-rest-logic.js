import { getUsersFavouritesByToken, deleteItemFromFavourite, addItemToFavourite } from './backend-services';

const addItemToFavouriteCallback = (itemId) => (event) => {
    event.stopPropagation();
    event.preventDefault();
    addItemToFavourite(itemId).then(() => {
        if (event.target.tagName === 'use') {
            const tagUse = event.target;
            tagUse.parentNode.style['fill'] = `orange`;
            tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-favorite-heart");
            tagUse.parentNode.style['opacity'] = '1';
            tagUse.parentNode.addEventListener('click', deleteItemFromFavouriteCallback(itemId), { once: true });
            return;
        }
        if (event.target.tagName === 'svg') {
            const tagSVG = event.target;
            tagSVG.style['fill'] = `orange`;
            const tagUse = tagSVG.querySelector('use');
            tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-favorite-heart");
            tagSVG.style['opacity'] = '1';
            tagSVG.addEventListener('click', deleteItemFromFavouriteCallback(itemId), { once: true });
            return;
        }
    })
};

const deleteItemFromFavouriteCallback = (itemId, inMyCabinet) => (event) => {
    event.stopPropagation();
    event.preventDefault();
    deleteItemFromFavourite(itemId).then(() => {
        if (inMyCabinet) {
            const targetRef = document.querySelector(`[data-id="${itemId}"]`);
            targetRef.parentNode.remove();
            return;
        }
        if (event.target.tagName === 'use') {
            const tagUse = event.target;
            tagUse.parentNode.style['fill'] = `white`;
            tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-heart-add-favorite");
            tagUse.parentNode.addEventListener('click', addItemToFavouriteCallback(itemId), { once: true });
            return;
        }
        if (event.target.tagName === 'svg') {
            // console.log('svg');
            const tagSVG = event.target;
            tagSVG.style['fill'] = `white`;
            const tagUse = tagSVG.querySelector('use');
            tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-heart-add-favorite");
            tagSVG.addEventListener('click', addItemToFavouriteCallback(itemId), { once: true });
            return;
        }
    })
};

function addOnClickHeartsFetchAddItemToFavourites(favourArray) {
    const favourIdArray = favourArray.map(favItem => favItem._id);
    const itemsArray = document.querySelectorAll('.section-gallery-goods-link');
    itemsArray.forEach(item => {
        if (favourIdArray.includes(item.dataset.id)) {
            return;
        }
        const favItemBtnHeart = item.querySelector('.icon-add-favorite');
        favItemBtnHeart.addEventListener('click', addItemToFavouriteCallback(item.dataset.id), { once: true })
    })
}

export function colorInOrangeHeartsOfFavourites(inMyCabinet=false) {
    getUsersFavouritesByToken().then(favArray => {
        if (!favArray) {
            return;
        }
        favArray.map(item => {
            const favItem = document.querySelector(`[data-id="${item._id}"]`);
            if (!favItem) {
                return;
            }
            const favItemBtnHeart = favItem.querySelector(`.icon-add-favorite`);
            favItemBtnHeart.style['fill'] = `orange`;
            favItemBtnHeart.style['opacity'] = `1`;
            const favItemBtnHeartUseTag = favItemBtnHeart.querySelector('use');
            favItemBtnHeartUseTag.setAttribute("href", "./images/sprite/sprite.svg#icon-favorite-heart");
            favItemBtnHeart?.addEventListener('click', deleteItemFromFavouriteCallback(item._id, inMyCabinet),{ once: true });
        })
        addOnClickHeartsFetchAddItemToFavourites(favArray)
    })
}

setTimeout(colorInOrangeHeartsOfFavourites, 1000);