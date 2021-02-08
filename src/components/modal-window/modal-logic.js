export function modalBackDrop(template) {
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');

  backDropRef.classList.add('is-open');

  modalRef.innerHTML = '';
  const addBtn = `<button class="exit-btn-escape">
            <svg class="exit-svg">
              <use href="./images/sprite/sprite.svg#icon-close"></use>
            </svg>
          </button>`;

  modalRef.insertAdjacentHTML('beforeend', addBtn);

  const exitBtnRef = document.querySelector('.exit-btn-escape');

  exitBtnRef.addEventListener('click', onBtnClose);
  backDropRef.addEventListener('click', onBackdrop);
  document.addEventListener('click', onBtnPress);

  modalRef.insertAdjacentHTML('beforeend', createModalMarkup());

  function createModalMarkup() {
    return `${template}`;
  }

  const hiddenModal = document.querySelector('body');
  hiddenModal.classList.add('hiddenModalStyle');

  function closeModal() {
    backDropRef.classList.remove('is-open');
    document.removeEventListener('click', onBtnPress);
    backDropRef.removeEventListener('click', onBackdrop);
    exitBtnRef.removeEventListener('click', onBtnClose);
    hiddenModal.classList.remove('hiddenModalStyle');
  }

  function onBackdrop(event) {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  }

  function onBtnClose() {
    closeModal();
  }

  function onBtnPress(event) {
    if (event.code === 'Escape') {
      closeModal();
    }
  }
}
