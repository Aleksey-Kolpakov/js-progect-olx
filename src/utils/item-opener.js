import { state } from './backend-services.js'
import {markupSales} from '../pages/main-page/main-section.js'
const itemOpener = function () {
    const containersArr = document.querySelectorAll('.js-item-container');
    containersArr.map(ul => {
        ul.addEventListener('click', openItemModal);
    })
}

function openItemModal(event) {
    event.preventDefault();
    const itemRef = event.target.closest("[data-id]");
    const clickedItemId = item.dataset.id;
    const itemData = state.find(item => {
        item._id === clickedItemId
    });
    /// здесь нужно вызы
}