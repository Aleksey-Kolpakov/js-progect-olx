import refs from './refs';

function showAuthorizationBlock() {
  refs.myCabinetBlock.classList.add('is-hidden');
  refs.authorizationBlock.classList.remove('is-hidden');
}

function showMyCabinetBlock() {
  refs.authorizationBlock.classList.add('is-hidden');
  refs.myCabinetBlock.classList.remove('is-hidden');
}

export { showAuthorizationBlock, showMyCabinetBlock };
