import { getUsersFavouritesByToken, deleteItemFromFavourite, addItemToFavourite } from './backend-services';

// const fetchGetPromiseFavourites = getUsersFavouritesByToken();

const addItemToFavouriteCallback = (itemId) => (event) => {
    console.log('addCallback');
    event.stopPropagation();
    addItemToFavourite(itemId).then(() => {
        // if (event.target.tagName === 'use') {
        //     console.log('use');
        //     const tagUse = event.target;
        //     tagUse.parent.style['fill'] = `orange`;
        //     tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-favorite-heart");
        //     tagUse.parent.style['opacity'] = '1';
        //     tagUse.parent.removeEventListener('click', addItemToFavouriteCallback);
        //     tagUse.parent.addEventListener('click', deleteItemFromFavouriteCallback(itemId));
        // }
        if (event.target.tagName === 'svg') {
            console.log('svg');
            const tagSVG = event.target;
            tagSVG.style['fill'] = `orange`;
            const tagUse = tagSVG.querySelector('use');
            tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-favorite-heart");
            tagSVG.style['opacity'] = '1';
            tagSVG.addEventListener('click', deleteItemFromFavouriteCallback(itemId), { once: true });
        }
    })
};

const deleteItemFromFavouriteCallback = (itemId) => (event) => {
    console.log('deleteCallback');
    event.stopPropagation();
    deleteItemFromFavourite(itemId).then(() => {
        if (event.target.tagName === 'use') {
            const tagUse = event.target;
            tagUse.parentNode.style['fill'] = `white`;
            tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-heart-add-favorite");
            tagUse.parentNode.addEventListener('click', addItemToFavouriteCallback(itemId), { once: true });
        }
        // if (event.target.tagName === 'svg') {
        //     console.log('svg');
        //     const tagSVG = event.target;
        //     tagSVG.style['fill'] = `white`;
        //     const tagUse = tagSVG.querySelector('use');
        //     tagUse.setAttribute("href", "./images/sprite/sprite.svg#icon-heart-add-favorite");
        //     tagSVG.style['opacity'] = '0';
        //     tagSVG.removeEventListener('click', deleteItemFromFavouriteCallback);
        //     tagSVG.addEventListener('click', addItemToFavouriteCallback(item.dataset.id));
        // }
    })
};

function addAllCardsHeartsOnClickFetchAddItemToFaviurites() {
    const itemsArray = document.querySelectorAll('.section-gallery-goods-link');
    itemsArray.forEach(item => {
        const favItemBtnHeart = item.querySelector('.icon-add-favorite');
        favItemBtnHeart.addEventListener('click', addItemToFavouriteCallback(item.dataset.id), { once: true })
    })
}

export function colorInOrangeHeartsOfFavourites() {
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
            favItemBtnHeart.addEventListener('click', deleteItemFromFavouriteCallback(item._id),{ once: true });
        })
    })
}

setTimeout(colorInOrangeHeartsOfFavourites, 1000)
setTimeout(addAllCardsHeartsOnClickFetchAddItemToFaviurites, 2000)