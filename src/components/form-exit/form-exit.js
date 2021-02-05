import { modalBackDrop } from '../modal-window/modal-logic.js';

const exit = `
    <div class="exit-modal">

    <h2 class="exit-text">Вы точно хотите выйти из аккаунта?<h2>
    <div class="exit-btn-group">
    <button class="exit-btn confirm">Выйти</button>
    <button class="exit-btn cancel">Отмена</button>
    </div>
</div>`;

// const open = modalBackDrop(exit);
const exitRef = document.querySelector('.exit');
exitRef.addEventListener('click', formExit);

// const a = modalBackDrop(yourmarkup);
// const closeBtn = document.querySelector(‘.yourbtn’);
// closeBtn.addEventListener(‘click’, a);

function formExit() {
  modalBackDrop(exit);

  const cancelBtnRef = document.querySelector('.cancel');
  cancelBtnRef.addEventListener('click', cancel);

  function cancel() {
    createModalMarkup();
  }
  // const closeModal = () => {
  //   backDropRef.classList.remove('is-open');
  // };

  // const backDropRef = document.querySelector('.back-drop');

  // const exitBtnRef = document.querySelector('.exit-btn-escape');
  // exitBtnRef.addEventListener('click', closeModal);

  // const cancelBtnRef = document.querySelector('.cancel');
  // cancelBtnRef.addEventListener('click', closeModal);
}
