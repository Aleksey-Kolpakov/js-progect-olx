import { modalBackDrop } from '../modal-window/modal-logic.js';
import { logoutFetch } from '../../utils/backend-services.js';

const exit = `
    <div class="exit-modal">

    <h2 class="exit-text">Вы точно хотите выйти из аккаунта?<h2>
    <div class="exit-btn-group">
    <button class="exit-btn confirm">Выйти</button>
    <button class="exit-btn cancel">Отмена</button>
    </div>
</div>`;

const exitRef = document.querySelector('.logout-button');
exitRef.addEventListener('click', formExit);

function formExit() {
  modalBackDrop(exit);

  function closeModal() {
    backDropRef.classList.remove('is-open');
    document.removeEventListener('keydown', onBtnPress);
    backDropRef.removeEventListener('click', onBackdrop);
    const addBtn = `<button class="exit-btn-escape">
            <svg class="exit-svg">
              <use href="./images/sprite/sprite.svg#icon-close"></use>
            </svg>
          </button>`;
    modalRef.innerHTML = '';
    modalRef.insertAdjacentHTML('beforeend', addBtn);
  }

  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');

  const cancelBtnRef = document.querySelector('.cancel');
  cancelBtnRef.addEventListener('click', cancelBtn);

  function cancelBtn() {
    closeModal();
  }
  function onBackdrop(event) {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  }

  function onBtnPress(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }

  const confirmRef = document.querySelector('.confirm');
  confirmRef.addEventListener('click', exitConfirm);

  function exitConfirm() {
    const authorizationBlock = document.querySelector('.authorization-block');
    const myCabinetBlock = document.querySelector('.my-cabinet-block');

    authorizationBlock.classList.remove('is-hidden');
    myCabinetBlock.classList.add('is-hidden');
    closeModal();
    logoutFetch();
  }
}
