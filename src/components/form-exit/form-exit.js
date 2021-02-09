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

  const hiddenModal = document.querySelector('body');
  const modalRef = document.querySelector('.modal');

  function closeModal() {
    backDropRef.classList.remove('is-open');
    hiddenModal.classList.remove('hiddenModalStyle');
    modalRef.innerHTML = '';
  }

  const backDropRef = document.querySelector('.back-drop');

  const cancelBtnRef = document.querySelector('.cancel');
  cancelBtnRef.addEventListener('click', cancelBtn);

  function cancelBtn() {
    closeModal();
  }

  const confirmRef = document.querySelector('.confirm');
  confirmRef.addEventListener('click', exitConfirm);

  function exitConfirm() {
    const authorizationBlock = document.querySelector('.authorization-block');
    const myCabinetBlock = document.querySelector('.my-cabinet-block');

    authorizationBlock.classList.remove('is-hidden');
    myCabinetBlock.classList.add('is-hidden');
    closeModal();
    logoutFetch().then(() => location.reload());
  }
}
