export function closeModalFuncTest() {
  console.log('1');
  const backDropRef = document.querySelector('.back-drop');
  const modalRef = document.querySelector('.modal');
  const exitBtnRef = document.querySelector('.exit-btn-escape');
  closeModal();
  exitBtnRef.addEventListener('click', onBtnClose);
  // backDropRef.addEventListener('click', setTimeout(onBackdrop, 1000));
  backDropRef.addEventListener('click', onBackdrop);
  document.addEventListener('keydown', onBtnPress);

  // modalRef.addEventListener('click', onAnyBtnPress);
  console.log('2');

  // const timeTest = setTimeout(onBackdrop, 1000);

  function closeModal() {
    console.log('3');
    backDropRef.classList.remove('is-open');
    document.removeEventListener('keydown', onBtnPress);
    backDropRef.removeEventListener('click', onBackdrop);
    exitBtnRef.removeEventListener('click', onBtnClose);
    modalRef.innerHTML = '';
  }

  // function onAnyBtnPress(event) {
  //   if (event.target.nodeName === 'BUTTON') {
  //     closeModal();
  //     // console.log('1', event.target);
  //     // event.target.classList.add('closeBtn');
  //     // const closeBtnRef = modalRef.querySelector('.closeBtn');
  //     // console.log('2', closeBtnRef);
  //     // closeBtnRef.addEventListener('click', closeModal());
  //   }
  // }
  function onBackdrop(event) {
    console.log('4');
    console.log(event);
    closeModal();
    // if (event.currentTarget === event.target) {
    //   closeModal();
    // }
    // if (event.target.nodeName === 'BUTTON') {
    //   closeModal();
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
