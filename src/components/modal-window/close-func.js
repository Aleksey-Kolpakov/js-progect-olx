export function closeModalTest() {
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');
  const exitBtnRef = document.querySelector('.exit-btn-escape');
  exitBtnRef.addEventListener('click', onBtnClose);
  backDropRef.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onBtnPress);

  const confirmBtnRef = document.querySelector('.exit-btn.confirm');
  confirmBtnRef.addEventListener('click', onBtnClose);
  const cancelBtnRef = document.querySelector('.exit-btn.cancel');
  cancelBtnRef.addEventListener('click', onBtnClose);

  function closeModal() {
    backDropRef.classList.remove('is-open');
    document.removeEventListener('keydown', onBtnPress);
    backDropRef.removeEventListener('click', onBackdrop);
    exitBtnRef.removeEventListener('click', onBtnClose);
    modalRef.innerHTML = '';
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
