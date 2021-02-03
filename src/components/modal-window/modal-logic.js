import './_modal-scss.scss';

export function modalBackDrop(template) {
  const modalRef = document.querySelector('.modal');

  modalRef.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onBtnPress);

  modalRef.innerHTML = createModalMarkup();
  modalRef.classList.add('is-open');

  function createModalMarkup() {
    return `${template}`;
  }

  function closeModal() {
    modalRef.classList.remove('is-open');
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

  return closeModal;
}
