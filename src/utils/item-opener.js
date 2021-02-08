import { jsDataBase } from './backend-services.js';
import { markupSales } from '../pages/main-page/main-section.js';
import createItemModal from '../components/item-card/item-card.js';
import { MarkUpFormChange, DynamicMarkUp } from '../components/form-change-item/form-item-image-markup.js';

export const itemOpener = function (
  selector = '.js-item-container',
  openRightModal = openItemModal,
) {
  const containers = document.querySelectorAll(`${selector}`);
  const containersArr = Array.from(containers);
  console.dir(containersArr);
  containersArr.map(ul => {
    ul.addEventListener('click', openRightModal);
  });
};

function openItemModal(event) {
  const itemData = findItemData(event);
  createItemModal(itemData);
}

export function openChangeOwnItemModal(event) {
  const itemData = findItemData(event);
  // ownItemChange(itemData);
  MarkUpFormChange();
  DynamicMarkUp(itemData)
}

function findItemData(event) {
  event.preventDefault(event);
  const itemRef = event.target.closest('[data-id]');
  const clickedItemId = itemRef.dataset.id;
  return jsDataBase.find(item => item._id === clickedItemId);
}
