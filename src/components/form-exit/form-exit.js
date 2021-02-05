import { modalBackDrop } from '../modal-window/modal-logic.js';

const exit = `
    <div class="exit-modal">

    <h2 class="exit-text">Вы точно хотите выйти из аккаунта?<h2>
    <div class="exit-btn-group">
    <button class="exit-btn confirm">Выйти</button>
    <button class="exit-btn cancel">Отмена</button>
    </div>
</div>`;

const exitRef = document.querySelector('.exit');
exitRef.addEventListener('click', formExit);

function formExit() {
  modalBackDrop(exit);

  // const closeModal = () => {
  //   backDropRef.classList.remove('is-open');
  // };

  // const backDropRef = document.querySelector('.back-drop');

  // // const exitBtnRef = document.querySelector('.exit-btn-escape');
  // // exitBtnRef.addEventListener('click', closeModal);

  // const cancelBtnRef = document.querySelector('.cancel');
  // cancelBtnRef.addEventListener('click', closeModal);
}
