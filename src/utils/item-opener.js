import { jsDataBase } from './backend-services.js'
import { markupSales } from '../pages/main-page/main-section.js'
import createItemModal from '../components/item-card/item-card.js'

export const itemOpener = function () {
    const containers = document.querySelectorAll('.js-item-container');
    const containersArr=Array.from(containers)
    console.dir(containersArr);
    containersArr.map(ul => {
        ul.addEventListener('click', openItemModal);
    })
}

function openItemModal(event) {
    event.preventDefault();
    const itemRef = event.target.closest("[data-id]");
    const clickedItemId = itemRef.dataset.id;
    const itemData = jsDataBase.find(item => item._id === clickedItemId);
 
    createItemModal(itemData)
}
