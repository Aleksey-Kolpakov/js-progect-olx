import { jsDataBase } from './backend-services.js';
import { markupSales } from '../pages/main-page/main-section.js';
import createItemModal from '../components/item-card/item-card.js';
import {
  MarkUpFormChange,
  DynamicMarkUp,
} from '../components/form-change-item/form-item-image-markup.js';
import { colorInOrangeHeartsOfFavourites } from '../utils/favourites-rest-logic.js'
export const itemOpener = function (
  inMyCabinet = false,
  myOwnItems = false,
  selector = '[data-items="item"]',
  openRightModal = openItemModal,
) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(ul => {
    ul.addEventListener('click', openRightModal);
  });
  // colorInOrangeHeartsOfFavourites();

};

function openItemModal(event) {
  const itemData = findItemData(event);
  createItemModal(itemData);
}

export function openChangeOwnItemModal(event) {
  // console.log(event.currentTarget);
  const itemData = findItemData(event);
  // ownItemChange(itemData);
  MarkUpFormChange(itemData._id).then(data => {
    DynamicMarkUp(itemData);
  });
}

function findItemData(event) {
  event.preventDefault();
  const itemRef = event.target.closest('[data-id]');
  const clickedItemId = itemRef.dataset.id;
  return jsDataBase.find(item => item._id === clickedItemId);
}
