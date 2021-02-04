import './_modal-scss.scss';

export function modalBackDrop(template) {
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');

  backDropRef.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onBtnPress);

  const exitBtnRef = document.querySelector('.exit-btn-escape');
  exitBtnRef.addEventListener('click', onBtnClose);

  backDropRef.classList.add('is-open');
  modalRef.innerHTML = createModalMarkup();

  function createModalMarkup() {
    return `${template}`;
  }

  function closeModal() {
    backDropRef.classList.remove('is-open');
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
