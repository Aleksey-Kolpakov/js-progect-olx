export function closeModalFunc() {
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');
  const exitBtnRef = document.querySelector('.exit-btn-escape');
  exitBtnRef.addEventListener('click', onBtnClose);
  backDropRef.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onBtnPress);

  // const confirmBtnRef = document.querySelector('.exit-btn.confirm');
  // confirmBtnRef.addEventListener('click', onBtnClose);

  // const cancelBtnRef = document.querySelector('.exit-btn.cancel');
  // cancelBtnRef.addEventListener('click', onBtnClose);

  // const cancelAnyBtn = modalRef.querySelector('button');
  // console.log(cancelAnyBtn);
  // modalRef.addEventListener('click', closeBtn);

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
    // if (event.target.nodeName === 'BUTTON') {
    //   console.log('1', event.target);
    //   event.target.classList.add('closeBtn');
    //   const closeBtnRef = modalRef.querySelector('.closeBtn');
    //   console.log('2', closeBtnRef);

    //   closeBtnRef.addEventListener('click', closeModal());

    //   // function closeBtnFunc() {
    //   //   console.log('sdfwe');
    //   //   closeModal();
    //   // }
    // }
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
