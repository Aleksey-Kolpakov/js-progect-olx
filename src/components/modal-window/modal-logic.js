export function modalBackDrop(template) {
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');

  backDropRef.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onBtnPress);

  const exitBtnRef = document.querySelector('.exit-btn-escape');
  exitBtnRef.addEventListener('click', onBtnClose);

  backDropRef.classList.add('is-open');

  modalRef.insertAdjacentHTML('beforeend', createModalMarkup());

  function createModalMarkup() {
    return `${template}`;
  }

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

  return closeModal;
}
